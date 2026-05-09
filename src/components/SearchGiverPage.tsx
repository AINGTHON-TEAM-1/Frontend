"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { MatchSuccessModal } from "@/components/MatchSuccessModal";
import { SearchControls } from "@/components/SearchControls";
import { SiteHeader } from "@/components/SiteHeader";
import { discoverApi } from "@/lib/api/endpoints";
import type { DiscoverPostItem, Format } from "@/lib/api/types";

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

function ModeSwitch() {
  return (
    <div className="flex h-8 overflow-hidden rounded-full" aria-label="탐색 대상 선택">
      <Link
        href="/Search_giver"
        aria-current="page"
        className="flex h-8 w-[72px] items-center justify-center rounded-l-full bg-[#333] pr-[10px] pl-[18px] text-[12px] leading-[18px] font-medium text-[#f0f0f0]"
      >
        기버
      </Link>
      <Link
        href="/searchtaker"
        className="flex h-8 w-[72px] items-center justify-center rounded-r-full border border-[#333] bg-[#f0f0f0] pr-[18px] pl-[10px] text-[12px] leading-[18px] font-medium text-[#333]"
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

function formatBudget(item: DiscoverPostItem): string {
  if (item.budget_min == null && item.budget_max == null) return "예산 미정";
  if (item.budget_min != null && item.budget_max != null) {
    if (item.budget_min === 0 && item.budget_max === 0) return "무료 매칭";
    return `${item.budget_min.toLocaleString()}~${item.budget_max.toLocaleString()}원`;
  }
  if (item.budget_max != null) return `~${item.budget_max.toLocaleString()}원`;
  return `${item.budget_min!.toLocaleString()}원~`;
}

function JobCard({
  item,
  index,
  onSelect,
}: {
  item: DiscoverPostItem;
  index: number;
  onSelect: (item: DiscoverPostItem) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      style={{ animationDelay: `${Math.min(index * 50, 400)}ms` }}
      className="block w-full animate-card-rise text-left transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
    >
      <article className="flex h-[247px] flex-col overflow-hidden rounded-2xl bg-[#f0f0f0] shadow-[0_0_8px_rgba(0,0,0,0.25)]">
        <div className="flex h-10 items-center gap-1 px-4 pt-3 pb-2.5 shadow-[0_0_4px_rgba(0,0,0,0.25)]">
          <ProfileIcon />
          <span className="text-[12px] leading-[18px] font-medium text-[#1e1e1e]">
            {item.author_nickname}
          </span>
        </div>
        <div className="flex-1 px-4 pt-3 pb-2 text-[12px] leading-[18px] font-medium text-[#525252]">
          <p className="line-clamp-4">{item.body_preview}</p>
        </div>
        <div className="px-4 pt-2 pb-[18px] shadow-[0_0_4px_rgba(0,0,0,0.25)]">
          <h2 className="line-clamp-2 text-[16px] leading-6 font-bold text-[#1e1e1e]">
            {item.title}
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            <MiniTag>{formatBudget(item)}</MiniTag>
            <MiniTag>신청 {item.application_count}건</MiniTag>
            {item.preferred_format && (
              <MiniTag>{formatLabel(item.preferred_format)}</MiniTag>
            )}
          </div>
        </div>
      </article>
    </button>
  );
}

function statusLabel(status: DiscoverPostItem["status"]): string {
  switch (status) {
    case "open":
      return "● 모집 중";
    case "matched":
      return "● 매칭 완료";
    case "closed":
      return "● 모집 마감";
  }
}

function statusBadgeClass(status: DiscoverPostItem["status"]): string {
  switch (status) {
    case "open":
      return "bg-[#34a853]/20 text-[#7be29c]";
    case "matched":
      return "bg-[#5b8def]/20 text-[#a4c4f7]";
    case "closed":
      return "bg-white/10 text-[#bdbdbd]";
  }
}

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[16px] bg-[#f7f7f7] px-4 py-3.5">
      <p className="text-[10px] leading-[14px] font-bold tracking-[0.12em] text-[#979797] uppercase">
        {label}
      </p>
      <p className="mt-1.5 text-[15px] leading-[22px] font-extrabold text-[#1e1e1e]">
        {value}
      </p>
    </div>
  );
}

function PostDetailModal({
  item,
  onClose,
  onApply,
  applying,
  applyError,
}: {
  item: DiscoverPostItem;
  onClose: () => void;
  onApply: (format: Format) => void;
  applying: boolean;
  applyError: string | null;
}) {
  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const defaultFormat: Format = item.preferred_format ?? "freechat";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="구인글 상세"
      className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex max-h-[88vh] w-full max-w-[640px] animate-modal-pop flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
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

          <div className="flex flex-wrap items-center gap-2 pr-12">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] leading-[14px] font-bold ${statusBadgeClass(item.status)}`}
            >
              {statusLabel(item.status)}
            </span>
            {item.category && (
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[11px] leading-[14px] font-medium text-[#e8e8e8]">
                {item.category}
              </span>
            )}
          </div>

          <h3 className="mt-3 pr-8 text-[24px] leading-[32px] font-extrabold">
            {item.title}
          </h3>

          <div className="mt-4 flex items-center gap-2 text-[13px] leading-[18px] font-medium text-[#bdbdbd]">
            <span className="flex size-7 items-center justify-center rounded-full bg-white/10">
              <ProfileIcon className="size-4" />
            </span>
            <span className="text-white">{item.author_nickname}</span>
            <span className="text-[#7a7a7a]">·</span>
            <span>
              {new Date(item.created_at).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-7">
          <div className="grid grid-cols-3 gap-3">
            <StatBlock label="예산" value={formatBudget(item)} />
            <StatBlock
              label="신청자"
              value={`${item.application_count}명`}
            />
            <StatBlock
              label="형태"
              value={
                item.preferred_format
                  ? formatLabel(item.preferred_format)
                  : "미정"
              }
            />
          </div>

          <div className="mt-7">
            <h4 className="text-[11px] leading-[14px] font-bold tracking-[0.15em] text-[#525252] uppercase">
              상세 내용
            </h4>
            <p className="mt-3 text-[14px] leading-[24px] font-medium whitespace-pre-line text-[#1e1e1e]">
              {item.body_preview}
            </p>
          </div>

          {item.tags.length > 0 && (
            <div className="mt-7">
              <h4 className="text-[11px] leading-[14px] font-bold tracking-[0.15em] text-[#525252] uppercase">
                태그
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#f0f0f0] px-3.5 py-1.5 text-[12px] leading-[16px] font-medium text-[#1e1e1e]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {applyError && (
          <p className="border-t border-[#e8e8e8] bg-[#fff5f5] px-8 py-3 text-[13px] leading-[20px] font-medium text-[#a23a3a]">
            {applyError}
          </p>
        )}

        <div className="flex gap-3 border-t border-[#e8e8e8] bg-[#fafafa] px-8 py-5">
          <button
            type="button"
            onClick={onClose}
            disabled={applying}
            className="h-11 flex-1 rounded-full border border-[#1e1e1e] bg-transparent text-[14px] leading-[44px] font-bold text-[#1e1e1e] transition hover:bg-[#1e1e1e] hover:text-[#f0f0f0] disabled:opacity-60"
          >
            닫기
          </button>
          <button
            type="button"
            onClick={() => onApply(defaultFormat)}
            disabled={applying || item.status !== "open"}
            className="h-11 flex-[2] rounded-full bg-[#1e1e1e] text-[14px] leading-[44px] font-bold text-[#f0f0f0] shadow-[0_4px_16px_rgba(30,30,30,0.3)] transition hover:bg-[#333] disabled:opacity-60"
          >
            {applying
              ? "신청 중…"
              : item.status === "open"
                ? "지원하기"
                : "모집 마감"}
          </button>
        </div>
      </div>
    </div>
  );
}

function formatLabel(format: NonNullable<DiscoverPostItem["preferred_format"]>) {
  switch (format) {
    case "freechat":
      return "프리챗";
    case "coffeechat":
      return "커피챗";
    case "mealchat":
      return "밀챗";
  }
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
    <nav className="mt-[54px] flex justify-center" aria-label="페이지">
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

export default function SearchGiverPage() {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<DiscoverPostItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<DiscoverPostItem | null>(null);
  const [applying, setApplying] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    discoverApi
      .posts({ page, size: PAGE_SIZE, sort: "latest" }, controller.signal)
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
          setError("구인글을 불러오지 못했습니다.");
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

  function openDetail(item: DiscoverPostItem) {
    setApplyError(null);
    setSelected(item);
  }

  function closeDetail() {
    if (applying) return;
    setSelected(null);
    setApplyError(null);
  }

  async function handleApply(_format: Format) {
    if (!selected) return;
    setApplying(true);
    setApplyError(null);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setApplying(false);
    setSelected(null);
    setSuccessOpen(true);
  }

  return (
    <main
      className="min-h-screen bg-[#f0f0f0] font-sans text-[#1e1e1e] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      data-node-id="36:665"
    >
      <SiteHeader role="giver" active="search" />

      <section className="mx-auto min-h-[1008px] w-full max-w-[1280px] bg-[#f0f0f0]">
        <div className="px-20 pt-12 pb-16">
          <div className="flex items-start justify-between">
            <h1 className="text-[24px] leading-[34px] font-extrabold">
              현재 이런 테이커들이 기버를 모집하고 있어요
            </h1>
            <div className="pt-[13px]">
              <ModeSwitch />
            </div>
          </div>

          <SearchControls />

          {loading ? (
            <div className="mt-12 flex h-[300px] items-center justify-center text-[14px] font-medium text-[#525252]">
              구인글을 불러오는 중…
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
              아직 등록된 구인글이 없어요.
            </div>
          ) : (
            <>
              <div className="mt-12 grid grid-cols-4 gap-x-5 gap-y-8">
                {items.map((item, index) => (
                  <JobCard
                    key={item.id}
                    item={item}
                    index={index}
                    onSelect={openDetail}
                  />
                ))}
              </div>
              <Pagination page={page} total={total} onPage={handlePageChange} />
            </>
          )}
        </div>
      </section>

      {selected && (
        <PostDetailModal
          item={selected}
          onClose={closeDetail}
          onApply={handleApply}
          applying={applying}
          applyError={applyError}
        />
      )}

      {successOpen && (
        <MatchSuccessModal onClose={() => setSuccessOpen(false)} />
      )}
    </main>
  );
}
