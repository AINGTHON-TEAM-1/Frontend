const DEFAULT_BASE_URL = "http://localhost:8000";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? DEFAULT_BASE_URL;

export const API_PREFIX = "/api/v1";

const USER_ID_STORAGE_KEY = "give_run_user_id";

export function getStoredUserId(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(USER_ID_STORAGE_KEY);
}

export function setStoredUserId(userId: string | null) {
  if (typeof window === "undefined") return;
  if (userId) {
    window.localStorage.setItem(USER_ID_STORAGE_KEY, userId);
  } else {
    window.localStorage.removeItem(USER_ID_STORAGE_KEY);
  }
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public detail: string,
    public payload?: unknown,
  ) {
    super(detail);
    this.name = "ApiError";
  }
}

export type QueryValue =
  | string
  | number
  | boolean
  | string[]
  | undefined
  | null;

interface ApiRequestOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  query?: { [key: string]: QueryValue };
  auth?: boolean;
  signal?: AbortSignal;
}

function buildQueryString(
  query: ApiRequestOptions["query"],
): string {
  if (!query) return "";
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      for (const item of value) {
        params.append(key, String(item));
      }
    } else {
      params.append(key, String(value));
    }
  }
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

function extractDetail(payload: unknown, fallback: string): string {
  if (!payload || typeof payload !== "object") return fallback;
  const detail = (payload as { detail?: unknown }).detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail) && detail.length > 0) {
    const first = detail[0];
    if (first && typeof first === "object" && typeof (first as { msg?: unknown }).msg === "string") {
      return (first as { msg: string }).msg;
    }
  }
  return fallback;
}

export async function apiFetch<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { method = "GET", body, query, auth = false, signal } = options;

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (auth) {
    const userId = getStoredUserId();
    if (!userId) {
      throw new ApiError(401, "로그인이 필요합니다.");
    }
    headers["X-User-Id"] = userId;
  }

  const url = `${API_BASE_URL}${API_PREFIX}${path}${buildQueryString(query)}`;

  let response: Response;
  try {
    response = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }
    throw new ApiError(
      0,
      "서버에 연결할 수 없습니다. 네트워크 상태를 확인해 주세요.",
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  let payload: unknown = null;
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
  }

  if (!response.ok) {
    throw new ApiError(
      response.status,
      extractDetail(payload, `요청에 실패했습니다 (${response.status})`),
      payload,
    );
  }

  return payload as T;
}
