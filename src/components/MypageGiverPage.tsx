"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { SiteHeader } from "./SiteHeader";
import { ApiError } from "@/lib/api/client";
import { giversApi } from "@/lib/api/endpoints";
import type { GiverProfileResponse } from "@/lib/api/types";
import { useAuth } from "@/lib/auth/AuthContext";

function StarRating({ rating }: { rating: string }) {
  const numeric = Number.parseFloat(rating);
  const safe = Number.isFinite(numeric) ? numeric : 0;
  const filled = Math.round(safe);
  const display = safe.toFixed(1);
  return (
    <div className="flex items-center gap-1" aria-label={`별점 ${display}점`}>
      <span className="text-[16px] leading-none tracking-normal text-[#1e1e1e]">
        {"★".repeat(Math.max(1, filled))}
      </span>
      <span className="text-[11px] leading-[14px] font-medium text-[#1e1e1e]">
        {display}
      </span>
    </div>
  );
}

export default function MypageGiverPage() {
  const { user, userId, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<GiverProfileResponse | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileMissing, setProfileMissing] = useState(false);

  useEffect(() => {
    if (!userId) return;
    const controller = new AbortController();
    giversApi
      .getProfile(userId, controller.signal)
      .then((data) => {
        setProfile(data);
        setProfileMissing(false);
        setProfileError(null);
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        if (err instanceof ApiError && err.status === 404) {
          setProfileMissing(true);
          setProfile(null);
          return;
        }
        if (err instanceof Error) {
          setProfileError(err.message);
        } else {
          setProfileError("프로필을 불러오지 못했습니다.");
        }
      })
      .finally(() => setProfileLoading(false));

    return () => controller.abort();
  }, [userId]);

  const dashboardItems = profile
    ? [
        { label: "받은 신청", value: `${profile.match_count}건` },
        { label: "평균 평점", value: profile.rating_avg },
        { label: "리뷰 수", value: `${profile.rating_count}건` },
      ]
    : [
        { label: "받은 신청", value: "—" },
        { label: "평균 평점", value: "—" },
        { label: "리뷰 수", value: "—" },
      ];

  return (
    <main
      className="min-h-screen bg-[#f0f0f0] font-sans text-[#1e1e1e] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      data-node-id="71:537"
    >
      <SiteHeader role="giver" active="mypage" />

      <section className="mx-auto min-h-[808px] w-full max-w-[1280px] bg-[#f0f0f0]">
        <div className="w-full px-[45px] pt-[66px]">
          <h1 className="text-[24px] leading-[34px] font-extrabold">
            나의 프로필
          </h1>

          {authLoading ? (
            <div className="mt-[18px] flex h-28 items-center justify-center rounded-2xl bg-[#f0f0f0] shadow-[0_0_4px_rgba(0,0,0,0.25)]">
              <p className="text-[14px] font-medium text-[#525252]">
                계정 정보를 불러오는 중…
              </p>
            </div>
          ) : !user ? (
            <div className="mt-[18px] flex flex-col items-center gap-3 rounded-2xl bg-[#f0f0f0] p-6 text-center shadow-[0_0_4px_rgba(0,0,0,0.25)]">
              <p className="text-[14px] font-medium text-[#1e1e1e]">
                로그인이 필요해요.
              </p>
              <Link
                href="/login"
                className="h-10 rounded-full bg-[#1e1e1e] px-5 text-[13px] leading-[40px] font-bold text-[#f0f0f0]"
              >
                로그인 화면으로 이동
              </Link>
            </div>
          ) : (
            <section className="mt-[18px] flex h-28 items-center gap-4 rounded-2xl bg-[#f0f0f0] px-[23px] py-6 shadow-[0_0_4px_rgba(0,0,0,0.25)]">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#ccc] p-2">
                {user.profile_image_url ? (
                  <Image
                    src={user.profile_image_url}
                    alt=""
                    width={48}
                    height={48}
                    className="size-12 rounded-full object-cover"
                  />
                ) : (
                  <Image
                    src="/figma/my-icon.svg"
                    alt=""
                    width={48}
                    height={48}
                    className="size-12"
                  />
                )}
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-2">
                    <p className="truncate text-[18px] leading-[26px] font-bold whitespace-nowrap">
                      {user.nickname}
                    </p>
                    <span className="rounded-full bg-[#165a28] px-3 py-1 text-[11px] leading-[14px] font-medium text-[#34a853]">
                      기버
                    </span>
                    {profile && <StarRating rating={profile.rating_avg} />}
                  </div>
                  <button
                    type="button"
                    className="shrink-0 rounded-full bg-[#424242] px-[14px] py-1 text-[11px] leading-[14px] font-medium text-[#b2b2b2]"
                  >
                    프로필 이미지 변경
                  </button>
                </div>
                <p className="truncate text-[14px] leading-5 font-medium">
                  {user.email ?? "이메일 미등록"}
                </p>
              </div>
            </section>
          )}

          {user && profileMissing && (
            <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl bg-[#f0f0f0] px-5 py-4 shadow-[0_0_4px_rgba(0,0,0,0.25)]">
              <p className="text-[14px] leading-[22px] font-medium text-[#1e1e1e]">
                아직 기버 프로필을 등록하지 않았어요. 글쓰기에서 정보를 입력해 주세요.
              </p>
              <Link
                href="/write_giver"
                className="shrink-0 rounded-full bg-[#1e1e1e] px-4 py-2 text-[13px] leading-[18px] font-bold text-[#f0f0f0]"
              >
                정보 등록하기
              </Link>
            </div>
          )}

          {profileError && (
            <p className="mt-4 rounded-[8px] bg-[#f0f0f0] px-4 py-3 text-[13px] leading-[20px] font-medium text-[#a23a3a] shadow-[inset_0_0_4px_rgba(162,58,58,0.3)]">
              {profileError}
            </p>
          )}

          <h2 className="mt-[64px] text-[24px] leading-[34px] font-extrabold">
            나의 대시보드
          </h2>

          <section className="mt-[23px] grid grid-cols-3 gap-[18px]">
            {dashboardItems.map((item) => (
              <article
                key={item.label}
                className="flex h-[138px] flex-col items-center justify-center rounded-2xl bg-[#f0f0f0] px-[37px] py-[25px] text-center shadow-[0_0_4px_rgba(0,0,0,0.25)]"
              >
                <p className="text-[20px] leading-[30px] font-bold">
                  {item.label}
                </p>
                <p className="mt-1 text-[36px] leading-[48px] font-extrabold">
                  {profileLoading ? "…" : item.value}
                </p>
              </article>
            ))}
          </section>

          {profile && (
            <section className="mt-10 rounded-2xl bg-[#f0f0f0] p-6 shadow-[0_0_4px_rgba(0,0,0,0.25)]">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-[18px] leading-[26px] font-bold">
                  제공 가능한 서비스
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.freechat_enabled && (
                    <span className="rounded-full bg-[#1e1e1e] px-3 py-1 text-[12px] leading-[18px] font-medium text-[#f0f0f0]">
                      프리챗
                    </span>
                  )}
                  {profile.coffeechat_enabled && (
                    <span className="rounded-full bg-[#1e1e1e] px-3 py-1 text-[12px] leading-[18px] font-medium text-[#f0f0f0]">
                      커피챗 {profile.coffeechat_price.toLocaleString()}원
                    </span>
                  )}
                  {profile.mealchat_enabled && (
                    <span className="rounded-full bg-[#1e1e1e] px-3 py-1 text-[12px] leading-[18px] font-medium text-[#f0f0f0]">
                      밀챗 {profile.mealchat_price.toLocaleString()}원
                    </span>
                  )}
                  {!profile.freechat_enabled &&
                    !profile.coffeechat_enabled &&
                    !profile.mealchat_enabled && (
                      <span className="text-[13px] font-medium text-[#525252]">
                        선택된 서비스가 없어요.
                      </span>
                    )}
                </div>
              </div>
              {profile.bio_long && (
                <p className="mt-4 text-[14px] leading-[22px] font-medium whitespace-pre-line text-[#1e1e1e]">
                  {profile.bio_long}
                </p>
              )}
            </section>
          )}
        </div>
      </section>
    </main>
  );
}
