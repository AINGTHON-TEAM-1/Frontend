"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ApiError } from "@/lib/api/client";
import { authApi } from "@/lib/api/endpoints";
import type { UserResponse } from "@/lib/api/types";
import { useAuth } from "@/lib/auth/AuthContext";

function RoleBadge({ role }: { role: UserResponse["role"] }) {
  const isGiver = role === "giver";
  return (
    <span
      className={`rounded-full px-3 py-1 text-[11px] leading-[14px] font-medium ${
        isGiver
          ? "bg-[#165a28] text-[#34a853]"
          : "bg-[#1e1e1e] text-[#f0f0f0]"
      }`}
    >
      {isGiver ? "기버" : "테이커"}
    </span>
  );
}

export function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    authApi
      .listSeedUsers(controller.signal)
      .then((data) => {
        setUsers(data);
        setError(null);
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("시드 유저를 불러오지 못했습니다.");
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  function handlePick(user: UserResponse) {
    setPendingUserId(user.id);
    setError(null);
    try {
      signIn(user.id);
      const target =
        user.role === "giver" ? "/mainpage_home_giver" : "/mainpage_home_taker";
      router.push(target);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.detail);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("로그인에 실패했습니다.");
      }
      setPendingUserId(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#f0f0f0] font-sans text-[#1e1e1e] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <section className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col items-center px-5 pt-[clamp(96px,18vh,160px)] pb-20">
        <Image
          src="/figma/service-logo.svg"
          alt="서비스 로고"
          width={96}
          height={96}
          className="size-[96px] shrink-0"
          priority
        />

        <h1 className="mt-[18px] text-center text-[20px] leading-[28px] font-extrabold tracking-normal">
          데모 계정으로 로그인
        </h1>
        <p className="mt-3 text-center text-[14px] leading-[20px] font-medium text-[#525252]">
          해커톤 MVP — 시드 유저 중 하나를 선택해 주세요.
        </p>

        <div className="mt-12 w-full max-w-[550px]">
          {loading ? (
            <div className="flex h-[200px] items-center justify-center text-[14px] font-medium text-[#525252]">
              계정 목록을 불러오는 중…
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-3 rounded-[12px] bg-[#f0f0f0] p-6 text-center shadow-[0_0_8px_rgba(0,0,0,0.18)]">
              <p className="text-[14px] leading-[22px] font-medium text-[#1e1e1e]">
                {error}
              </p>
              <p className="text-[12px] leading-[18px] font-medium text-[#525252]">
                백엔드 서버가 켜져 있는지 확인하고 다시 시도해 주세요.
              </p>
              <button
                type="button"
                onClick={() => location.reload()}
                className="mt-2 h-10 rounded-full bg-[#1e1e1e] px-5 text-[13px] leading-[18px] font-bold text-[#f0f0f0]"
              >
                다시 시도
              </button>
            </div>
          ) : users.length === 0 ? (
            <p className="text-center text-[14px] font-medium text-[#525252]">
              등록된 시드 유저가 없습니다.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {users.map((user) => {
                const isPending = pendingUserId === user.id;
                return (
                  <li key={user.id}>
                    <button
                      type="button"
                      onClick={() => handlePick(user)}
                      disabled={isPending}
                      className="flex w-full items-center gap-3 rounded-[12px] bg-[#f0f0f0] px-4 py-3 text-left shadow-[0_0_8px_rgba(0,0,0,0.18)] transition-transform hover:brightness-[0.98] active:translate-y-px disabled:opacity-60"
                    >
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#ccc] p-2">
                        <Image
                          src="/figma/my-icon.svg"
                          alt=""
                          width={28}
                          height={28}
                          className="size-7"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-[16px] leading-[24px] font-bold text-[#1e1e1e]">
                            {user.nickname}
                          </span>
                          <RoleBadge role={user.role} />
                        </div>
                        {user.email && (
                          <span className="truncate text-[12px] leading-[18px] font-medium text-[#525252]">
                            {user.email}
                          </span>
                        )}
                      </div>
                      <span className="text-[13px] leading-[20px] font-bold text-[#1e1e1e]">
                        {isPending ? "이동 중…" : "선택"}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
