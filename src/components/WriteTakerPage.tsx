"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { MatchSuccessModal } from "@/components/MatchSuccessModal";
import { SiteHeader } from "@/components/SiteHeader";
import { ApiError } from "@/lib/api/client";
import { postsApi } from "@/lib/api/endpoints";
import { useAuth } from "@/lib/auth/AuthContext";

const communitySizeOptions = [
  { value: "small", label: "소규모 (16명 이하)" },
  { value: "medium", label: "중규모 (16~00명)" },
  { value: "large", label: "대규모 (000명 이상)" },
] as const;
type CommunitySize = (typeof communitySizeOptions)[number]["value"];

const themeOptions = [
  { id: "it", label: "IT" },
  { id: "sport", label: "운동" },
  { id: "game", label: "게임" },
  { id: "music", label: "음악" },
  { id: "collect", label: "수집" },
] as const;
type ThemeId = (typeof themeOptions)[number]["id"];

const DRAFT_STORAGE_KEY = "write_taker_draft_v1";

const regionOptions = [
  "서울 전체",
  "강남구",
  "서초구",
  "마포구",
  "용산구",
  "성동구",
  "송파구",
  "관악구",
  "인천 전체",
  "인하대 부근",
  "경기 수원",
  "경기 성남",
];

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`size-3 transition-transform ${open ? "rotate-180" : ""}`}
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="M2 4.25 6 8l4-3.75"
        stroke="#1e1e1e"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex size-5 items-center justify-center rounded-[4px] border transition-colors ${
        checked
          ? "border-[#1e1e1e] bg-[#1e1e1e]"
          : "border-[#979797] bg-[#f0f0f0]"
      }`}
    >
      {checked && (
        <svg viewBox="0 0 16 16" className="size-3" fill="none">
          <path
            d="m3 8.5 3.2 3L13 5"
            stroke="#f0f0f0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[18px] leading-[26px] font-bold text-[#1e1e1e]">
      {children}
    </h2>
  );
}

function CommunitySizeDropdown({
  value,
  onChange,
}: {
  value: CommunitySize | null;
  onChange: (next: CommunitySize) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
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

  const selected = communitySizeOptions.find((option) => option.value === value);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-[360px]">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex h-[44px] w-full items-center justify-between rounded-[8px] bg-[#f0f0f0] px-4 text-left text-[16px] leading-[24px] font-medium shadow-[0_0_8px_rgba(0,0,0,0.25)] ${
          selected ? "text-[#1e1e1e]" : "text-[#979797]"
        }`}
      >
        {selected ? selected.label : "커뮤니티 규모를 선택해 주세요"}
        <ChevronDown open={open} />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="커뮤니티 규모"
          className="absolute top-[52px] left-0 z-10 w-full overflow-hidden rounded-[8px] bg-[#f0f0f0] py-1 shadow-[0_0_8px_rgba(0,0,0,0.25)]"
        >
          {communitySizeOptions.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`flex h-10 w-full items-center px-4 text-left text-[16px] leading-6 font-medium hover:bg-[#e3e3e3] ${
                    isSelected ? "text-[#1e1e1e]" : "text-[#525252]"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function DateRangeBox({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  startLabel,
  endLabel,
}: {
  startDate: string;
  endDate: string;
  onStartChange: (next: string) => void;
  onEndChange: (next: string) => void;
  startLabel: string;
  endLabel: string;
}) {
  const startId = `${startLabel}-start`;
  const endId = `${endLabel}-end`;
  return (
    <div className="rounded-[12px] bg-[#f0f0f0] p-5 shadow-[0_0_8px_rgba(0,0,0,0.25)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
        <div className="flex-1">
          <label
            htmlFor={startId}
            className="text-[14px] leading-[20px] font-bold text-[#1e1e1e]"
          >
            {startLabel}
          </label>
          <input
            id={startId}
            type="date"
            value={startDate}
            onChange={(event) => onStartChange(event.target.value)}
            className="mt-2 h-[44px] w-full rounded-[8px] bg-[#f0f0f0] px-4 text-[15px] leading-[22px] font-medium text-[#1e1e1e] shadow-[inset_0_0_4px_rgba(0,0,0,0.18)] outline-none"
          />
        </div>
        <span className="hidden pb-3 text-[18px] font-bold text-[#1e1e1e] sm:block">
          ~
        </span>
        <div className="flex-1">
          <label
            htmlFor={endId}
            className="text-[14px] leading-[20px] font-bold text-[#1e1e1e]"
          >
            {endLabel}
          </label>
          <input
            id={endId}
            type="date"
            value={endDate}
            min={startDate || undefined}
            onChange={(event) => onEndChange(event.target.value)}
            className="mt-2 h-[44px] w-full rounded-[8px] bg-[#f0f0f0] px-4 text-[15px] leading-[22px] font-medium text-[#1e1e1e] shadow-[inset_0_0_4px_rgba(0,0,0,0.18)] outline-none"
          />
        </div>
      </div>
    </div>
  );
}

function CheckRow({
  checked,
  onToggle,
  label,
  description,
}: {
  checked: boolean;
  onToggle: () => void;
  label: string;
  description?: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onToggle}
      className="flex w-full items-start gap-3 rounded-[12px] bg-[#f0f0f0] px-4 py-3 text-left shadow-[0_0_8px_rgba(0,0,0,0.18)]"
    >
      <span className="mt-[2px]">
        <CheckIcon checked={checked} />
      </span>
      <span className="flex flex-col">
        <span className="text-[16px] leading-[24px] font-bold text-[#1e1e1e]">
          {label}
        </span>
        {description && (
          <span className="mt-1 text-[13px] leading-[20px] font-medium text-[#525252]">
            {description}
          </span>
        )}
      </span>
    </button>
  );
}

function ThemeChip({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onClick}
      className={`flex h-11 items-center gap-2 rounded-full px-5 text-[15px] leading-[22px] font-medium transition-colors shadow-[0_0_8px_rgba(0,0,0,0.18)] ${
        checked
          ? "bg-[#1e1e1e] text-[#f0f0f0]"
          : "bg-[#f0f0f0] text-[#1e1e1e]"
      }`}
    >
      <CheckIcon checked={checked} />
      {label}
    </button>
  );
}

function RegionModal({
  onClose,
  selected,
  onSelect,
}: {
  onClose: () => void;
  selected: string[];
  onSelect: (regions: string[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState<string[]>(() => selected);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const filtered = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return regionOptions;
    return regionOptions.filter((region) => region.includes(trimmed));
  }, [query]);

  function toggle(region: string) {
    setDraft((prev) =>
      prev.includes(region)
        ? prev.filter((item) => item !== region)
        : [...prev, region],
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="지역 선택"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[460px] rounded-[16px] bg-[#f0f0f0] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-[20px] leading-[28px] font-extrabold text-[#1e1e1e]">
            오프라인 활동 지역 선택
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex size-8 items-center justify-center rounded-full text-[18px] text-[#525252] hover:bg-[#e3e3e3]"
          >
            ×
          </button>
        </div>

        <label className="mt-4 flex h-11 items-center justify-between rounded-full border border-[#b2b2b2] bg-[#f0f0f0] px-4">
          <span className="sr-only">지역 검색</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="지역명을 검색하세요"
            className="min-w-0 flex-1 bg-transparent text-[14px] leading-5 font-medium text-[#1e1e1e] outline-none placeholder:text-[#8c8c8c]"
          />
          <svg className="size-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="m14.2 14.2 3 3M8.8 15.4a6.6 6.6 0 1 1 0-13.2 6.6 6.6 0 0 1 0 13.2Z"
              stroke="#8c8c8c"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </label>

        <ul className="mt-4 max-h-[260px] overflow-y-auto rounded-[8px] bg-[#f0f0f0] shadow-[inset_0_0_4px_rgba(0,0,0,0.12)]">
          {filtered.length === 0 ? (
            <li className="px-4 py-6 text-center text-[14px] text-[#525252]">
              일치하는 지역이 없어요
            </li>
          ) : (
            filtered.map((region) => {
              const checked = draft.includes(region);
              return (
                <li key={region}>
                  <button
                    type="button"
                    onClick={() => toggle(region)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-[#e3e3e3]"
                  >
                    <span className="text-[15px] leading-[22px] font-medium text-[#1e1e1e]">
                      {region}
                    </span>
                    <CheckIcon checked={checked} />
                  </button>
                </li>
              );
            })
          )}
        </ul>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-11 flex-1 rounded-full border border-[#1e1e1e] bg-[#f0f0f0] text-[15px] leading-[22px] font-bold text-[#1e1e1e]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={() => {
              onSelect(draft);
              onClose();
            }}
            className="h-11 flex-1 rounded-full bg-[#1e1e1e] text-[15px] leading-[22px] font-bold text-[#f0f0f0]"
          >
            선택 완료
          </button>
        </div>
      </div>
    </div>
  );
}

export default function WriteTakerPage() {
  const router = useRouter();
  const { userId } = useAuth();

  const [title, setTitle] = useState("");

  const [communitySize, setCommunitySize] = useState<CommunitySize | null>(null);

  const [operationStart, setOperationStart] = useState("");
  const [operationEnd, setOperationEnd] = useState("");

  const [recruitStart, setRecruitStart] = useState("");
  const [recruitEnd, setRecruitEnd] = useState("");

  const [selectedThemes, setSelectedThemes] = useState<ThemeId[]>([]);
  const [customThemeOpen, setCustomThemeOpen] = useState(false);
  const [customThemes, setCustomThemes] = useState<string[]>([]);
  const [customThemeDraft, setCustomThemeDraft] = useState("");

  const [giverCount, setGiverCount] = useState("");
  const [giverCountUndecided, setGiverCountUndecided] = useState(false);

  const [online, setOnline] = useState(false);
  const [offline, setOffline] = useState(false);
  const [regions, setRegions] = useState<string[]>([]);
  const [regionModalOpen, setRegionModalOpen] = useState(false);

  const [introduction, setIntroduction] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);

  function toggleTheme(id: ThemeId) {
    setSelectedThemes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }

  function addCustomTheme() {
    const cleaned = customThemeDraft.trim();
    if (!cleaned) return;
    setCustomThemes((prev) =>
      prev.includes(cleaned) ? prev : [...prev, cleaned],
    );
    setCustomThemeDraft("");
  }

  function handleCustomThemeKey(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      addCustomTheme();
    }
  }

  function toggleOffline(next: boolean) {
    setOffline(next);
    if (next) {
      setRegionModalOpen(true);
    } else {
      setRegions([]);
    }
  }

  function handleGiverCountChange(value: string) {
    const digitsOnly = value.replace(/[^\d]/g, "");
    setGiverCount(digitsOnly);
  }

  function toggleGiverCountUndecided() {
    setGiverCountUndecided((prev) => {
      const next = !prev;
      if (next) setGiverCount("");
      return next;
    });
  }

  function buildBody(): string {
    const sizeLabel = communitySizeOptions.find(
      (option) => option.value === communitySize,
    )?.label;
    const themeLabels = [
      ...selectedThemes.map(
        (id) => themeOptions.find((option) => option.id === id)?.label,
      ),
      ...customThemes,
    ].filter((value): value is string => Boolean(value));
    const formats = [online ? "온라인" : null, offline ? "오프라인" : null]
      .filter((value): value is string => Boolean(value))
      .join(" / ");
    const giverCountLabel = giverCountUndecided
      ? "미정/무관"
      : giverCount
        ? `${giverCount}명`
        : "미정";

    const meta: string[] = [];
    if (sizeLabel) meta.push(`커뮤니티 규모: ${sizeLabel}`);
    if (operationStart && operationEnd) {
      meta.push(`운영 기간: ${operationStart} ~ ${operationEnd}`);
    }
    if (recruitStart && recruitEnd) {
      meta.push(`모집 기간: ${recruitStart} ~ ${recruitEnd}`);
    }
    if (themeLabels.length > 0) {
      meta.push(`테마: ${themeLabels.join(", ")}`);
    }
    meta.push(`원하는 기버 수: ${giverCountLabel}`);
    if (formats) meta.push(`진행 방식: ${formats}`);
    if (offline && regions.length > 0) {
      meta.push(`활동 지역: ${regions.join(", ")}`);
    }

    const header = meta.length > 0 ? `${meta.join("\n")}\n\n` : "";
    return `${header}${introduction.trim()}`.trim();
  }

  function handleSaveDraft() {
    setSubmitError(null);
    if (typeof window === "undefined") return;
    const draft = {
      title,
      communitySize,
      operationStart,
      operationEnd,
      recruitStart,
      recruitEnd,
      selectedThemes,
      customThemes,
      giverCount,
      giverCountUndecided,
      online,
      offline,
      regions,
      introduction,
    };
    try {
      window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
      setStatusMessage("임시저장 완료 (브라우저에 저장됨)");
    } catch {
      setStatusMessage("임시저장에 실패했어요. 브라우저 저장 공간을 확인해 주세요.");
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);
    setStatusMessage(null);

    if (!userId) {
      setSubmitError("로그인이 필요합니다.");
      return;
    }

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setSubmitError("제목을 입력해 주세요.");
      return;
    }
    if (trimmedTitle.length > 50) {
      setSubmitError("제목은 50자 이내로 입력해 주세요.");
      return;
    }
    if (!introduction.trim()) {
      setSubmitError("커뮤니티 소개글을 입력해 주세요.");
      return;
    }

    setSubmitting(true);
    try {
      const body = buildBody();
      await postsApi.create({
        title: trimmedTitle,
        body,
        category: null,
        preferred_format: null,
        budget_min: null,
        budget_max: null,
      });
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(DRAFT_STORAGE_KEY);
      }
      setSuccessOpen(true);
    } catch (err) {
      if (err instanceof ApiError) {
        setSubmitError(err.detail);
      } else if (err instanceof Error) {
        setSubmitError(err.message);
      } else {
        setSubmitError("등록에 실패했어요. 다시 시도해 주세요.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  // localStorage draft hydration: deferred until after mount to avoid SSR/CSR mismatch.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return;
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const draft = JSON.parse(raw) as Record<string, unknown>;
      if (typeof draft.title === "string") setTitle(draft.title);
      if (typeof draft.introduction === "string") setIntroduction(draft.introduction);
      if (typeof draft.operationStart === "string") setOperationStart(draft.operationStart);
      if (typeof draft.operationEnd === "string") setOperationEnd(draft.operationEnd);
      if (typeof draft.recruitStart === "string") setRecruitStart(draft.recruitStart);
      if (typeof draft.recruitEnd === "string") setRecruitEnd(draft.recruitEnd);
      if (typeof draft.giverCount === "string") setGiverCount(draft.giverCount);
      if (typeof draft.giverCountUndecided === "boolean") {
        setGiverCountUndecided(draft.giverCountUndecided);
      }
      if (typeof draft.online === "boolean") setOnline(draft.online);
      if (typeof draft.offline === "boolean") setOffline(draft.offline);
      if (Array.isArray(draft.regions)) {
        setRegions(draft.regions.filter((item): item is string => typeof item === "string"));
      }
      if (Array.isArray(draft.selectedThemes)) {
        setSelectedThemes(
          draft.selectedThemes.filter((id): id is ThemeId =>
            themeOptions.some((option) => option.id === id),
          ),
        );
      }
      if (Array.isArray(draft.customThemes)) {
        setCustomThemes(
          draft.customThemes.filter((item): item is string => typeof item === "string"),
        );
      }
      if (
        draft.communitySize === "small" ||
        draft.communitySize === "medium" ||
        draft.communitySize === "large"
      ) {
        setCommunitySize(draft.communitySize);
      }
      setStatusMessage("저장된 임시 글을 불러왔어요.");
    } catch {
      // ignore corrupted draft
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  return (
    <main
      className="min-h-screen bg-[#f0f0f0] font-sans text-[#1e1e1e] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      data-node-id="write-taker-root"
    >
      <SiteHeader role="taker" />

      <section className="mx-auto min-h-screen w-full max-w-[1280px] bg-[#f0f0f0]">

        <div className="px-20 pt-12 pb-20">
          <div className="mx-auto w-full max-w-[760px]">
            <h1 className="text-[28px] leading-[38px] font-extrabold">
              커뮤니티 모집 글 작성
            </h1>
            <p className="mt-3 text-[16px] leading-[24px] font-medium text-[#525252]">
              우리 커뮤니티의 운영 조건과 필요한 도움을 작성해 기버에게 알려보세요.
            </p>

            <form className="mt-12 flex flex-col gap-10" onSubmit={handleSubmit}>
              <div>
                <SectionLabel>제목</SectionLabel>
                <p className="mt-2 text-[14px] leading-[20px] font-medium text-[#525252]">
                  기버가 한눈에 알아볼 수 있도록 50자 이내로 작성해 주세요.
                </p>
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  maxLength={50}
                  placeholder="예) 신학기 동아리 신입 모집을 도와주실 분 찾아요"
                  className="mt-4 h-[44px] w-full rounded-[8px] bg-[#f0f0f0] px-4 text-[15px] leading-[22px] font-medium text-[#1e1e1e] shadow-[0_0_8px_rgba(0,0,0,0.25)] outline-none placeholder:text-[#979797]"
                />
                <p className="mt-1 text-right text-[12px] leading-[18px] font-medium text-[#979797]">
                  {title.length}/50
                </p>
              </div>

              <div>
                <SectionLabel>운영하고 싶은 커뮤니티 규모는?</SectionLabel>
                <p className="mt-2 text-[14px] leading-[20px] font-medium text-[#525252]">
                  앞에서 설정한 규모 기준으로 한 가지를 선택해 주세요.
                </p>
                <div className="mt-4">
                  <CommunitySizeDropdown
                    value={communitySize}
                    onChange={setCommunitySize}
                  />
                </div>
              </div>

              <div>
                <SectionLabel>운영기간</SectionLabel>
                <p className="mt-2 text-[14px] leading-[20px] font-medium text-[#525252]">
                  커뮤니티 활동을 진행할 기간을 선택해 주세요.
                </p>
                <div className="mt-4">
                  <DateRangeBox
                    startDate={operationStart}
                    endDate={operationEnd}
                    onStartChange={setOperationStart}
                    onEndChange={setOperationEnd}
                    startLabel="운영 시작일"
                    endLabel="운영 종료일"
                  />
                </div>
              </div>

              <div>
                <SectionLabel>모집 기간</SectionLabel>
                <p className="mt-2 text-[14px] leading-[20px] font-medium text-[#525252]">
                  기버를 모집할 기간을 선택해 주세요.
                </p>
                <div className="mt-4">
                  <DateRangeBox
                    startDate={recruitStart}
                    endDate={recruitEnd}
                    onStartChange={setRecruitStart}
                    onEndChange={setRecruitEnd}
                    startLabel="모집 시작일"
                    endLabel="모집 마감일"
                  />
                </div>
              </div>

              <div>
                <SectionLabel>커뮤니티 테마</SectionLabel>
                <p className="mt-2 text-[14px] leading-[20px] font-medium text-[#525252]">
                  해당하는 테마를 모두 선택해 주세요.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {themeOptions.map((theme) => (
                    <ThemeChip
                      key={theme.id}
                      label={theme.label}
                      checked={selectedThemes.includes(theme.id)}
                      onClick={() => toggleTheme(theme.id)}
                    />
                  ))}
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={customThemeOpen}
                    onClick={() => setCustomThemeOpen((prev) => !prev)}
                    className={`flex h-11 items-center gap-2 rounded-full px-5 text-[15px] leading-[22px] font-medium shadow-[0_0_8px_rgba(0,0,0,0.18)] transition-colors ${
                      customThemeOpen
                        ? "bg-[#1e1e1e] text-[#f0f0f0]"
                        : "bg-[#f0f0f0] text-[#1e1e1e]"
                    }`}
                  >
                    <CheckIcon checked={customThemeOpen} />
                    직접 입력
                  </button>
                </div>

                {customThemeOpen && (
                  <div className="mt-4 rounded-[12px] bg-[#f0f0f0] p-4 shadow-[inset_0_0_4px_rgba(0,0,0,0.12)]">
                    <div className="flex gap-2">
                      <input
                        value={customThemeDraft}
                        onChange={(event) =>
                          setCustomThemeDraft(event.target.value)
                        }
                        onKeyDown={handleCustomThemeKey}
                        placeholder="테마를 입력 후 Enter 또는 추가 버튼"
                        className="h-10 flex-1 rounded-full bg-[#f0f0f0] px-4 text-[14px] leading-[20px] font-medium text-[#1e1e1e] shadow-[0_0_4px_rgba(0,0,0,0.22)] outline-none placeholder:text-[#979797]"
                      />
                      <button
                        type="button"
                        onClick={addCustomTheme}
                        className="h-10 rounded-full bg-[#1e1e1e] px-4 text-[13px] leading-[18px] font-bold text-[#f0f0f0]"
                      >
                        추가
                      </button>
                    </div>

                    {customThemes.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {customThemes.map((theme) => (
                          <span
                            key={theme}
                            className="flex h-8 items-center gap-2 rounded-full bg-[#1e1e1e] px-3 text-[13px] leading-[18px] font-medium text-[#f0f0f0]"
                          >
                            #{theme}
                            <button
                              type="button"
                              onClick={() =>
                                setCustomThemes((prev) =>
                                  prev.filter((item) => item !== theme),
                                )
                              }
                              aria-label={`${theme} 삭제`}
                              className="text-[14px] leading-none text-[#f0f0f0]"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <SectionLabel>원하는 기버 수</SectionLabel>
                <p className="mt-2 text-[14px] leading-[20px] font-medium text-[#525252]">
                  필요한 기버 인원을 입력하거나, 미정/무관을 선택해 주세요.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="flex h-[44px] items-center rounded-[8px] bg-[#f0f0f0] px-4 shadow-[0_0_8px_rgba(0,0,0,0.25)]">
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={giverCount}
                      onChange={(event) =>
                        handleGiverCountChange(event.target.value)
                      }
                      disabled={giverCountUndecided}
                      placeholder="0"
                      className={`w-20 bg-transparent text-right text-[16px] leading-[24px] font-medium outline-none placeholder:text-[#979797] ${
                        giverCountUndecided ? "text-[#979797]" : "text-[#1e1e1e]"
                      }`}
                    />
                    <span className="ml-2 text-[14px] leading-[20px] font-medium text-[#525252]">
                      명
                    </span>
                  </div>
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={giverCountUndecided}
                    onClick={toggleGiverCountUndecided}
                    className="flex items-center gap-2 rounded-full bg-[#f0f0f0] px-4 py-2 shadow-[0_0_8px_rgba(0,0,0,0.18)]"
                  >
                    <CheckIcon checked={giverCountUndecided} />
                    <span className="text-[14px] leading-[20px] font-bold text-[#1e1e1e]">
                      미정 / 무관
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <SectionLabel>어떤 방식으로 도움을 받고 싶나요?</SectionLabel>
                <p className="mt-2 text-[14px] leading-[20px] font-medium text-[#525252]">
                  온라인과 오프라인 둘 다 선택할 수 있어요.
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <CheckRow
                    checked={online}
                    onToggle={() => setOnline((prev) => !prev)}
                    label="온라인"
                    description="화상/메시지로 어디서든 참여 가능"
                  />
                  <CheckRow
                    checked={offline}
                    onToggle={() => toggleOffline(!offline)}
                    label="오프라인"
                    description="선택한 지역에서 직접 만나 진행"
                  />
                </div>

                {offline && (
                  <div className="mt-3 flex flex-wrap items-center gap-2 rounded-[12px] bg-[#f0f0f0] px-4 py-3 shadow-[inset_0_0_4px_rgba(0,0,0,0.12)]">
                    <span className="text-[14px] leading-[20px] font-bold text-[#1e1e1e]">
                      활동 지역
                    </span>
                    {regions.length === 0 ? (
                      <span className="text-[14px] leading-[20px] font-medium text-[#979797]">
                        선택된 지역이 없어요
                      </span>
                    ) : (
                      regions.map((region) => (
                        <span
                          key={region}
                          className="flex h-7 items-center gap-1 rounded-full bg-[#1e1e1e] px-3 text-[12px] leading-[18px] font-medium text-[#f0f0f0]"
                        >
                          {region}
                          <button
                            type="button"
                            onClick={() =>
                              setRegions((prev) =>
                                prev.filter((item) => item !== region),
                              )
                            }
                            aria-label={`${region} 삭제`}
                            className="text-[14px] leading-none text-[#f0f0f0]"
                          >
                            ×
                          </button>
                        </span>
                      ))
                    )}
                    <button
                      type="button"
                      onClick={() => setRegionModalOpen(true)}
                      className="ml-auto h-8 rounded-full border border-[#1e1e1e] bg-[#f0f0f0] px-3 text-[13px] leading-[18px] font-bold text-[#1e1e1e]"
                    >
                      지역 선택
                    </button>
                  </div>
                )}
              </div>

              <div>
                <SectionLabel>커뮤니티 소개글</SectionLabel>
                <p className="mt-2 text-[14px] leading-[20px] font-medium text-[#525252]">
                  기버에게 우리 커뮤니티의 분위기와 필요한 도움을 알려주세요.
                </p>
                <textarea
                  value={introduction}
                  onChange={(event) => setIntroduction(event.target.value)}
                  placeholder={
                    "예) [커뮤니티 이름]\n[활동 분야 / 주요 활동 내용]\n[현재 상황 / 어떤 도움이 필요한지]\n[기버에게 바라는 점]"
                  }
                  className="mt-4 min-h-[200px] w-full rounded-[12px] bg-[#f0f0f0] p-4 text-[15px] leading-[24px] font-medium text-[#1e1e1e] shadow-[0_0_8px_rgba(0,0,0,0.25)] outline-none placeholder:whitespace-pre-line placeholder:text-[#979797]"
                />
              </div>

              {(submitError || statusMessage) && (
                <p
                  className={`rounded-[8px] px-4 py-3 text-[13px] leading-[20px] font-medium shadow-[inset_0_0_4px_rgba(0,0,0,0.18)] ${
                    submitError
                      ? "bg-[#f0f0f0] text-[#a23a3a]"
                      : "bg-[#f0f0f0] text-[#1e1e1e]"
                  }`}
                >
                  {submitError ?? statusMessage}
                </p>
              )}

              <div className="mt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  disabled={submitting}
                  className="flex h-12 items-center justify-center rounded-full border border-[#1e1e1e] bg-[#f0f0f0] px-6 text-[15px] leading-[22px] font-bold text-[#1e1e1e] disabled:opacity-60"
                >
                  임시저장
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex h-12 items-center justify-center rounded-full bg-[#1e1e1e] px-8 text-[15px] leading-[22px] font-bold text-[#f0f0f0] disabled:opacity-60"
                >
                  {submitting ? "게시 중…" : "게시"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {regionModalOpen && (
        <RegionModal
          onClose={() => setRegionModalOpen(false)}
          selected={regions}
          onSelect={setRegions}
        />
      )}

      {successOpen && (
        <MatchSuccessModal
          title="모집글 등록이 완료되었어요"
          description="기버가 글을 보고 신청하면 마이페이지에서 확인할 수 있어요."
          onClose={() => {
            setSuccessOpen(false);
            router.push("/searchtaker");
          }}
        />
      )}
    </main>
  );
}
