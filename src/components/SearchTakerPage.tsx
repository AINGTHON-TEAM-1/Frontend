"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { SearchControls } from "@/components/SearchControls";
import { SiteHeader } from "@/components/SiteHeader";
import { discoverApi } from "@/lib/api/endpoints";
import type { DiscoverGiverItem } from "@/lib/api/types";

const PAGE_SIZE = 12;

function ProfileIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 12.3a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Zm-7.5 6.63c0-3.05 3.18-4.98 7.5-4.98s7.5 1.93 7.5 4.98c0 .64-.52 1.17-1.17 1.17H5.67a1.17 1.17 0 0 1-1.17-1.17Z"
        fill="#1e1e1e"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 16 16" fill="none">
      <path
        d="m8 1.6 1.85 3.75 4.14.6-3 2.93.71 4.12L8 11.05 4.3 13l.71-4.12-3-2.93 4.14-.6L8 1.6Z"
        fill="#1e1e1e"
      />
    </svg>
  );
}

function ModeSwitch() {
  return (
    <div className="flex h-8 overflow-hidden rounded-full" aria-label="탐색 대상 선택">
      <Link
        href="/Search_giver"
        className="flex h-8 w-[72px] items-center justify-center rounded-l-full border border-[#333] bg-[#f0f0f0] pl-[18px] pr-[10px] text-[12px] leading-[18px] font-medium text-[#333]"
      >
        기버
      </Link>
      <Link
        href="/searchtaker"
        aria-current="page"
        className="flex h-8 w-[72px] items-center justify-center rounded-r-full bg-[#333] pl-[10px] pr-[18px] text-[12px] leading-[18px] font-medium text-[#f0f0f0]"
      >
        테이커
      </Link>
    </div>
  );
}

function MiniTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[#333] px-3 py-1 text-[11px] leading-[14px] font-medium whitespace-nowrap text-[#f0f0f0]">
      {children}
    </span>
  );
}

function Rating({ rating }: { rating: string }) {
  const numeric = Number.parseFloat(rating);
  const stars = Number.isFinite(numeric) ? Math.round(numeric) : 0;
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex items-center"
        aria-label={`별점 ${rating}`}
      >
        {Array.from({ length: Math.max(1, stars) }, (_, index) => (
          <StarIcon key={index} />
        ))}
      </div>
      <span className="text-[11px] leading-[14px] font-medium text-[#1e1e1e]">
        {rating}
      </span>
    </div>
  );
}

function GiverProfileCard({
  item,
  onSelect,
}: {
  item: DiscoverGiverItem;
  onSelect: (item: DiscoverGiverItem) => void;
}) {
  const tags = item.tags.slice(0, 3);
  const fallbackTags =
    tags.length === 0
      ? [
          item.freechat_enabled ? "프리챗" : null,
          item.coffeechat_price > 0
            ? `커피챗 ${item.coffeechat_price.toLocaleString()}원`
            : null,
        ].filter((value): value is string => Boolean(value))
      : tags;

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="block w-full text-left transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
    >
      <article className="h-[131px] rounded-2xl bg-[#f0f0f0] px-4 pt-[19px] pb-4 shadow-[0_0_8px_rgba(0,0,0,0.25)]">
        <div className="flex items-start gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#ccc] p-2">
            <ProfileIcon className="size-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-[14px] leading-5 font-bold text-[#1e1e1e]">
                {item.nickname}
              </h2>
              <Rating rating={item.rating_avg} />
            </div>
            <p className="mt-[6px] line-clamp-2 text-[11px] leading-[14px] font-medium text-[#1e1e1e]">
              {item.bio_short ?? "기버의 한 줄 소개를 입력해 주세요"}
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          {fallbackTags.length === 0 ? (
            <MiniTag>매칭 {item.match_count}회</MiniTag>
          ) : (
            fallbackTags.map((tag) => <MiniTag key={tag}>#{tag}</MiniTag>)
          )}
        </div>
      </article>
    </button>
  );
}

function GiverDetailModal({
  item,
  onClose,
}: {
  item: DiscoverGiverItem;
  onClose: () => void;
}) {
  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const services: { label: string; available: boolean; price?: number }[] = [
    { label: "프리챗", available: item.freechat_enabled },
    {
      label: "커피챗",
      available: item.coffeechat_price > 0,
      price: item.coffeechat_price,
    },
    {
      label: "밀챗",
      available: item.mealchat_price > 0,
      price: item.mealchat_price,
    },
  ];

  const numericRating = Number.parseFloat(item.rating_avg);
  const ratingDisplay = Number.isFinite(numericRating)
    ? numericRating.toFixed(1)
    : item.rating_avg;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="기버 상세"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex max-h-[88vh] w-full max-w-[520px] flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a] px-8 pt-7 pb-8 text-[#f0f0f0]">
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="absolute top-5 right-5 flex size-9 items-center justify-center rounded-full bg-white/10 text-[18px] text-white transition hover:bg-white/20"
          >
            ×
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-white/10 ring-2 ring-white/20">
              <ProfileIcon className="size-10" />
            </div>

            <h3 className="mt-4 text-[24px] leading-[32px] font-extrabold">
              {item.nickname}
            </h3>

            <div className="mt-2 flex items-center gap-2 text-[13px] leading-[18px] font-medium text-[#e8e8e8]">
              <div className="flex items-center gap-0.5">
                <span className="text-[14px] text-[#ffd166]">★</span>
                <span className="font-bold text-white">{ratingDisplay}</span>
              </div>
              <span className="text-[#7a7a7a]">·</span>
              <span>리뷰 {item.rating_count}건</span>
              <span className="text-[#7a7a7a]">·</span>
              <span>매칭 {item.match_count}회</span>
            </div>

            {item.bio_short && (
              <p className="mt-5 max-w-[360px] text-[13px] leading-[20px] font-medium text-[#d6d6d6]">
                &ldquo;{item.bio_short}&rdquo;
              </p>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-7">
          <h4 className="text-[11px] leading-[14px] font-bold tracking-[0.15em] text-[#525252] uppercase">
            제공 서비스
          </h4>
          <ul className="mt-3 flex flex-col gap-2">
            {services.map((service) => (
              <li
                key={service.label}
                className={`flex items-center justify-between rounded-[14px] px-4 py-3 transition ${
                  service.available
                    ? "bg-[#f7f7f7]"
                    : "bg-[#fafafa] opacity-60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex size-7 items-center justify-center rounded-full text-[12px] font-bold ${
                      service.available
                        ? "bg-[#1e1e1e] text-white"
                        : "bg-[#e3e3e3] text-[#979797]"
                    }`}
                  >
                    {service.available ? "✓" : "×"}
                  </span>
                  <span className="text-[14px] leading-[20px] font-bold text-[#1e1e1e]">
                    {service.label}
                  </span>
                </div>
                <span
                  className={`text-[14px] leading-[20px] font-bold ${
                    service.available ? "text-[#1e1e1e]" : "text-[#979797]"
                  }`}
                >
                  {service.available
                    ? service.price && service.price > 0
                      ? `${service.price.toLocaleString()}원`
                      : "이용 가능"
                    : "미제공"}
                </span>
              </li>
            ))}
          </ul>

          {item.tags.length > 0 && (
            <div className="mt-7">
              <h4 className="text-[11px] leading-[14px] font-bold tracking-[0.15em] text-[#525252] uppercase">
                전문 분야
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#1e1e1e] px-3.5 py-1.5 text-[12px] leading-[16px] font-medium text-[#f0f0f0]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {item.categories.length > 0 && (
            <div className="mt-6">
              <h4 className="text-[11px] leading-[14px] font-bold tracking-[0.15em] text-[#525252] uppercase">
                활동 카테고리
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.categories.map((category) => (
                  <span
                    key={category}
                    className="rounded-full border border-[#1e1e1e] bg-white px-3.5 py-1.5 text-[12px] leading-[16px] font-medium text-[#1e1e1e]"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 border-t border-[#e8e8e8] bg-[#fafafa] px-8 py-5">
          <button
            type="button"
            onClick={onClose}
            className="h-11 flex-1 rounded-full border border-[#1e1e1e] bg-transparent text-[14px] leading-[44px] font-bold text-[#1e1e1e] transition hover:bg-[#1e1e1e] hover:text-[#f0f0f0]"
          >
            닫기
          </button>
          <button
            type="button"
            className="h-11 flex-[2] rounded-full bg-[#1e1e1e] text-[14px] leading-[44px] font-bold text-[#f0f0f0] shadow-[0_4px_16px_rgba(30,30,30,0.3)] transition hover:bg-[#333]"
          >
            매칭 신청하기
          </button>
        </div>
      </div>
    </div>
  );
}

function Pagination({
  page,
  total,
  onPage,
}: {
  page: number;
  total: number;
  onPage: (next: number) => void;
}) {
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <nav className="mt-[102px] flex justify-center" aria-label="페이지">
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={() => onPage(1)}
          disabled={page === 1}
          className="flex size-12 items-center justify-center rounded-lg text-[14px] leading-[22px] text-[#525252] disabled:opacity-40"
        >
          {"<<"}
        </button>
        <button
          type="button"
          onClick={() => onPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="flex size-12 items-center justify-center rounded-lg text-[14px] leading-[22px] text-[#525252] disabled:opacity-40"
        >
          {"<"}
        </button>
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPage(p)}
            className={`flex size-12 items-center justify-center rounded-lg text-[14px] leading-[22px] ${
              p === page ? "font-bold text-[#1e1e1e]" : "font-normal text-[#525252]"
            }`}
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onPage(Math.min(pageCount, page + 1))}
          disabled={page === pageCount}
          className="flex size-12 items-center justify-center rounded-lg text-[14px] leading-[22px] text-[#525252] disabled:opacity-40"
        >
          {">"}
        </button>
        <button
          type="button"
          onClick={() => onPage(pageCount)}
          disabled={page === pageCount}
          className="flex size-12 items-center justify-center rounded-lg text-[14px] leading-[22px] text-[#525252] disabled:opacity-40"
        >
          {">>"}
        </button>
      </div>
    </nav>
  );
}

export default function SearchTakerPage() {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<DiscoverGiverItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<DiscoverGiverItem | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    discoverApi
      .givers({ page, size: PAGE_SIZE, sort: "latest" }, controller.signal)
      .then((data) => {
        setItems(data.items);
        setTotal(data.total);
        setError(null);
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("기버 목록을 불러오지 못했습니다.");
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [page]);

  function handlePageChange(next: number) {
    if (next === page) return;
    setLoading(true);
    setPage(next);
  }

  return (
    <main
      className="min-h-screen bg-[#f0f0f0] font-sans text-[#1e1e1e] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      data-node-id="45:394"
    >
      <SiteHeader role="taker" active="search" />

      <section className="mx-auto min-h-[1008px] w-full max-w-[1280px] bg-[#f0f0f0]">
        <div className="px-20 pt-12 pb-16">
          <div className="flex items-start justify-between">
            <h1 className="text-[24px] leading-[34px] font-extrabold">
              나의 커뮤니티 운영에 도움이 될 만한 기버들이에요
            </h1>
            <div className="pt-[13px]">
              <ModeSwitch />
            </div>
          </div>

          <SearchControls placeholder="검색어를 입력하세요." />

          {loading ? (
            <div className="mt-12 flex h-[300px] items-center justify-center text-[14px] font-medium text-[#525252]">
              기버 목록을 불러오는 중…
            </div>
          ) : error ? (
            <div className="mt-12 flex flex-col items-center gap-2 rounded-[12px] bg-[#f0f0f0] p-8 text-center shadow-[0_0_8px_rgba(0,0,0,0.18)]">
              <p className="text-[14px] font-medium text-[#1e1e1e]">{error}</p>
              <p className="text-[12px] font-medium text-[#525252]">
                백엔드 서버 연결 상태를 확인해 주세요.
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="mt-12 flex h-[200px] items-center justify-center text-[14px] font-medium text-[#525252]">
              아직 등록된 기버가 없어요.
            </div>
          ) : (
            <>
              <div className="mt-12 grid grid-cols-4 gap-x-5 gap-y-10">
                {items.map((item) => (
                  <GiverProfileCard
                    key={item.id}
                    item={item}
                    onSelect={setSelected}
                  />
                ))}
              </div>
              <Pagination page={page} total={total} onPage={handlePageChange} />
            </>
          )}
        </div>
      </section>

      {selected && (
        <GiverDetailModal item={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  );
}
