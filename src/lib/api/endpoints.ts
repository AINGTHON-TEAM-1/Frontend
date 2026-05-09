import { apiFetch, type QueryValue } from "./client";
import type {
  CommunityPostCreateRequest,
  CommunityPostResponse,
  DiscoverGiversResponse,
  DiscoverGiversSort,
  DiscoverPostsResponse,
  DiscoverPostsSort,
  Category,
  Format,
  GiverExperienceCreateRequest,
  GiverExperienceResponse,
  GiverProfileCreateRequest,
  GiverProfileResponse,
  GiverProfileUpdateRequest,
  MatchCreateRequest,
  MatchRejectRequest,
  MatchResponse,
  PaginatedResponse,
  PopularTagsResponse,
  TagSuggestRequest,
  TagSuggestResponse,
  TakerPostCreateRequest,
  TakerPostResponse,
  TakerPostUpdateRequest,
  UserResponse,
} from "./types";

export const authApi = {
  listSeedUsers: (signal?: AbortSignal) =>
    apiFetch<UserResponse[]>("/auth/users", { signal }),

  me: (signal?: AbortSignal) =>
    apiFetch<UserResponse>("/auth/me", { auth: true, signal }),
};

export const giversApi = {
  createProfile: (body: GiverProfileCreateRequest) =>
    apiFetch<GiverProfileResponse>("/givers/profile", {
      method: "POST",
      body,
      auth: true,
    }),

  getProfile: (userId: string, signal?: AbortSignal) =>
    apiFetch<GiverProfileResponse>(`/givers/${userId}`, { signal }),

  updateProfile: (body: GiverProfileUpdateRequest) =>
    apiFetch<GiverProfileResponse>("/givers/profile", {
      method: "PATCH",
      body,
      auth: true,
    }),

  createExperience: (body: GiverExperienceCreateRequest) =>
    apiFetch<GiverExperienceResponse>("/givers/experiences", {
      method: "POST",
      body,
      auth: true,
    }),
};

export const postsApi = {
  create: (body: TakerPostCreateRequest) =>
    apiFetch<TakerPostResponse>("/posts", {
      method: "POST",
      body,
      auth: true,
    }),

  getOne: (postId: string, signal?: AbortSignal) =>
    apiFetch<TakerPostResponse>(`/posts/${postId}`, { signal }),

  update: (postId: string, body: TakerPostUpdateRequest) =>
    apiFetch<TakerPostResponse>(`/posts/${postId}`, {
      method: "PATCH",
      body,
      auth: true,
    }),

  remove: (postId: string) =>
    apiFetch<void>(`/posts/${postId}`, { method: "DELETE", auth: true }),
};

export interface DiscoverGiversParams {
  q?: string;
  categories?: Category[];
  format?: Format[];
  price_min?: number;
  price_max?: number;
  rating_min?: number;
  tag?: string;
  sort?: DiscoverGiversSort;
  page?: number;
  size?: number;
}

export interface DiscoverPostsParams {
  q?: string;
  categories?: Category[];
  format?: Format[];
  budget_min?: number;
  budget_max?: number;
  active_only?: boolean;
  tag?: string;
  sort?: DiscoverPostsSort;
  page?: number;
  size?: number;
}

export const discoverApi = {
  givers: (params: DiscoverGiversParams = {}, signal?: AbortSignal) =>
    apiFetch<DiscoverGiversResponse>("/discover/givers", {
      query: params as Record<string, QueryValue>,
      signal,
    }),

  posts: (params: DiscoverPostsParams = {}, signal?: AbortSignal) =>
    apiFetch<DiscoverPostsResponse>("/discover/posts", {
      query: params as Record<string, QueryValue>,
      signal,
    }),

  popularTags: (signal?: AbortSignal) =>
    apiFetch<PopularTagsResponse>("/discover/popular-tags", { signal }),
};

export const aiApi = {
  suggestTags: (body: TagSuggestRequest) =>
    apiFetch<TagSuggestResponse>("/ai/suggest-tags", {
      method: "POST",
      body,
      auth: true,
    }),
};

export const matchesApi = {
  create: (body: MatchCreateRequest) =>
    apiFetch<MatchResponse>("/matches", {
      method: "POST",
      body,
      auth: true,
    }),

  mine: (
    type?: "sent" | "received" | "matched",
    signal?: AbortSignal,
  ) =>
    apiFetch<MatchResponse[]>("/matches/me", {
      query: type ? { type } : undefined,
      auth: true,
      signal,
    }),

  accept: (matchId: string) =>
    apiFetch<MatchResponse>(`/matches/${matchId}/accept`, {
      method: "PATCH",
      auth: true,
    }),

  reject: (matchId: string, body: MatchRejectRequest) =>
    apiFetch<MatchResponse>(`/matches/${matchId}/reject`, {
      method: "PATCH",
      body,
      auth: true,
    }),

  pay: (matchId: string) =>
    apiFetch<MatchResponse>(`/matches/${matchId}/pay`, {
      method: "POST",
      auth: true,
    }),
};

export const communityApi = {
  create: (body: CommunityPostCreateRequest) =>
    apiFetch<CommunityPostResponse>("/community/posts", {
      method: "POST",
      body,
      auth: true,
    }),

  list: (
    params: { category?: "giver" | "taker" | "both"; page?: number; size?: number } = {},
    signal?: AbortSignal,
  ) =>
    apiFetch<PaginatedResponse<CommunityPostResponse>>("/community/posts", {
      query: params,
      signal,
    }),

  getOne: (postId: string, signal?: AbortSignal) =>
    apiFetch<CommunityPostResponse>(`/community/posts/${postId}`, { signal }),

  remove: (postId: string) =>
    apiFetch<void>(`/community/posts/${postId}`, {
      method: "DELETE",
      auth: true,
    }),
};
