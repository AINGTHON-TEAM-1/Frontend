"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ApiError } from "@/lib/api/client";
import { authApi } from "@/lib/api/endpoints";
import type { UserResponse } from "@/lib/api/types";
import { useAuth } from "@/lib/auth/AuthContext";

function RoleBadge({ role }: { role: UserResponse["role"] }) {
  const isGiver = role === "giver";
  return (
    <span
      className={`rounded-full px-2 py-[2px] text-[10px] leading-[14px] font-medium ${
        isGiver
          ? "bg-[#165a28] text-[#34a853]"
          : "bg-[#1e1e1e] text-[#f0f0f0]"
      }`}
    >
      {isGiver ? "기버" : "테이커"}
    </span>
  );
}

interface SocialProvider {
  key: "google" | "kakao" | "naver";
  label: string;
  logo: string;
  bg: string;
  textColor: string;
  border?: string;
}

const socialProviders: SocialProvider[] = [
  {
    key: "google",
    label: "Google로 시작하기",
    logo: "/figma/google-logo.svg",
    bg: "bg-[#f0f0f0]",
    textColor: "text-[#1e1e1e]",
    border: "border border-[#b2b2b2]",
  },
  {
    key: "kakao",
    label: "카카오로 시작하기",
    logo: "/figma/kakao-logo.svg",
    bg: "bg-[#fee500]",
    textColor: "text-[#1e1e1e]",
  },
  {
    key: "naver",
    label: "네이버로 시작하기",
    logo: "/figma/naver-logo.svg",
    bg: "bg-[#03c75a]",
    textColor: "text-[#f0f0f0]",
  },
];

export function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const selectedUser = users.find((u) => u.id === selectedUserId) ?? null;

  function handleStart() {
    if (!selectedUser) return;
    setPending(true);
    setError(null);
    try {
      signIn(selectedUser.id);
      const target =
        selectedUser.role === "giver"
          ? "/mainpage_home_giver"
          : "/mainpage_home_taker";
      router.push(target);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.detail);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("로그인에 실패했습니다.");
      }
      setPending(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f0f0f0] font-sans text-[#1e1e1e] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <section className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col items-center px-5 pt-[clamp(96px,14vh,140px)] pb-20">
        <Image
          src="/figma/service-logo.svg"
          alt="서비스 로고"
          width={96}
          height={96}
          className="size-[96px] shrink-0"
          priority
        />

        <h1 className="mt-[18px] text-center text-[20px] leading-[28px] font-extrabold tracking-normal">
          로그인
        </h1>

        <div className="mt-10 flex w-full max-w-[420px] flex-col gap-3">
          {socialProviders.map((provider) => (
            <button
              key={provider.key}
              type="button"
              onClick={() =>
                setError(
                  `${provider.label.replace("로 시작하기", "")} 로그인은 준비 중입니다. 아래 시드 유저로 진입해 주세요.`,
                )
              }
              className={`flex h-[52px] w-full items-center justify-center gap-3 rounded-full px-4 text-[15px] leading-[22px] font-bold ${provider.bg} ${provider.textColor} ${
                provider.border ?? ""
              }`}
            >
              <Image
                src={provider.logo}
                alt=""
                width={20}
                height={20}
                className="size-5"
              />
              {provider.label}
            </button>
          ))}

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-[#b2b2b2]" />
            <span className="text-[12px] leading-[18px] font-medium text-[#525252]">
              또는 데모 시드 유저로 시작
            </span>
            <span className="h-px flex-1 bg-[#b2b2b2]" />
          </div>

          {loading ? (
            <div className="flex h-[52px] items-center justify-center text-[14px] font-medium text-[#525252]">
              계정 목록을 불러오는 중…
            </div>
          ) : (
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                disabled={users.length === 0}
                onClick={() => setOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={open}
                className="flex h-[52px] w-full items-center justify-between rounded-full border border-[#b2b2b2] bg-[#f0f0f0] px-5 text-left text-[15px] leading-[22px] font-medium text-[#1e1e1e] disabled:opacity-60"
              >
                {selectedUser ? (
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="truncate font-bold">
                      {selectedUser.nickname}
                    </span>
                    <RoleBadge role={selectedUser.role} />
                    {selectedUser.email && (
                      <span className="truncate text-[12px] leading-[18px] font-medium text-[#525252]">
                        {selectedUser.email}
                      </span>
                    )}
                  </span>
                ) : (
                  <span className="text-[#8c8c8c]">
                    {users.length === 0
                      ? "등록된 시드 유저가 없습니다"
                      : "시드 유저를 선택해 주세요"}
                  </span>
                )}
                <Image
                  src="/figma/chevron-down.svg"
                  alt=""
                  width={12}
                  height={6}
                  className={`ml-3 h-[6px] w-[12px] shrink-0 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open && users.length > 0 && (
                <ul
                  role="listbox"
                  aria-label="시드 유저"
                  className="absolute top-[60px] left-0 z-10 max-h-[280px] w-full overflow-y-auto rounded-[20px] border border-[#b2b2b2] bg-[#f0f0f0] py-2 shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
                >
                  {users.map((user) => {
                    const isSelected = selectedUserId === user.id;
                    return (
                      <li key={user.id} role="option" aria-selected={isSelected}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedUserId(user.id);
                            setOpen(false);
                            setError(null);
                          }}
                          className={`flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-[#e3e3e3] ${
                            isSelected ? "bg-[#e3e3e3]" : ""
                          }`}
                        >
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#ccc] p-2">
                            <Image
                              src="/figma/my-icon.svg"
                              alt=""
                              width={20}
                              height={20}
                              className="size-5"
                            />
                          </div>
                          <div className="flex min-w-0 flex-1 flex-col">
                            <span className="flex items-center gap-2">
                              <span className="truncate text-[14px] leading-[20px] font-bold text-[#1e1e1e]">
                                {user.nickname}
                              </span>
                              <RoleBadge role={user.role} />
                            </span>
                            {user.email && (
                              <span className="truncate text-[11px] leading-[16px] font-medium text-[#525252]">
                                {user.email}
                              </span>
                            )}
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}

          <button
            type="button"
            disabled={!selectedUser || pending}
            onClick={handleStart}
            className={`mt-3 flex h-[52px] w-full items-center justify-center rounded-full text-[15px] leading-[22px] font-bold text-[#f0f0f0] ${
              selectedUser && !pending ? "bg-[#1e1e1e]" : "bg-[#b2b2b2]"
            }`}
          >
            {pending ? "이동 중…" : "시작하기"}
          </button>

          {error && (
            <p className="mt-2 text-center text-[12px] leading-[18px] font-medium text-[#ea4335]">
              {error}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
