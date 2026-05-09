"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const menuItems = [
  { label: "홈", href: "/mainpage_home_giver" },
  { label: "탐색", href: "/Search_giver" },
  { label: "마이페이지", href: "/mypage_giver" },
];

const communitySizeOptions = [
  { value: "small", label: "소규모 (16명 이하)" },
  { value: "medium", label: "중규모 (16~00명)" },
  { value: "large", label: "대규모 (000명 이상)" },
] as const;
type CommunitySize = (typeof communitySizeOptions)[number]["value"];

const weekDays = ["월", "화", "수", "목", "금", "토", "일"] as const;
type WeekDay = (typeof weekDays)[number];

const aiSuggestedTags = [
  "리더십",
  "팀빌딩",
  "기획",
  "운영",
  "커뮤니티 활성화",
  "마케팅",
];

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

const serviceOptions = [
  { id: "free", label: "프리챗", hint: "가볍게 메시지로 도움을 줄 수 있는 형태예요." },
  { id: "coffee", label: "커피챗", hint: "1:1 음료 미팅으로 가까이서 도와주는 형태예요." },
  { id: "meal", label: "밀챗", hint: "식사를 함께하며 깊이 있게 나누는 형태예요." },
] as const;
type ServiceId = (typeof serviceOptions)[number]["id"];

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

function Header() {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between bg-[#f0f0f0] px-[45px] shadow-[0_0_4px_rgba(0,0,0,0.25)]">
      <nav className="mx-auto flex items-center gap-10">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-[16px] leading-[24px] font-medium"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="absolute right-[45px] flex items-center gap-4">
        <Link
          href="/mypage_giver"
          className="flex size-9 items-center justify-center"
          aria-label="마이페이지"
        >
          <Image
            src="/figma/my-icon.svg"
            alt=""
            width={24}
            height={24}
            className="size-6"
          />
        </Link>
        <Link
          href="/login"
          className="flex size-9 items-center justify-center"
          aria-label="로그아웃"
        >
          <Image
            src="/figma/logout-icon.svg"
            alt=""
            width={24}
            height={24}
            className="size-6"
          />
        </Link>
      </div>
    </header>
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

function RegionModal({
  open,
  onClose,
  selected,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  selected: string[];
  onSelect: (regions: string[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState<string[]>(selected);

  useEffect(() => {
    if (open) {
      setDraft(selected);
      setQuery("");
    }
  }, [open, selected]);

  useEffect(() => {
    if (!open) return;
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const filtered = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return regionOptions;
    return regionOptions.filter((region) => region.includes(trimmed));
  }, [query]);

  if (!open) return null;

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
      aria-label="지역 검색"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[460px] rounded-[16px] bg-[#f0f0f0] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-[20px] leading-[28px] font-extrabold text-[#1e1e1e]">
            활동 가능한 지역 선택
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

function DateBox({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
}: {
  startDate: string;
  endDate: string;
  onStartChange: (next: string) => void;
  onEndChange: (next: string) => void;
}) {
  return (
    <div className="rounded-[12px] bg-[#f0f0f0] p-5 shadow-[0_0_8px_rgba(0,0,0,0.25)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
        <div className="flex-1">
          <label
            htmlFor="period-start"
            className="text-[14px] leading-[20px] font-bold text-[#1e1e1e]"
          >
            시작일
          </label>
          <input
            id="period-start"
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
            htmlFor="period-end"
            className="text-[14px] leading-[20px] font-bold text-[#1e1e1e]"
          >
            종료일
          </label>
          <input
            id="period-end"
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

interface DaySchedule {
  enabled: boolean;
  start: string;
  end: string;
}

function ScheduleBox({
  schedule,
  onChange,
}: {
  schedule: Record<WeekDay, DaySchedule>;
  onChange: (day: WeekDay, next: DaySchedule) => void;
}) {
  return (
    <div className="rounded-[12px] bg-[#f0f0f0] p-5 shadow-[0_0_8px_rgba(0,0,0,0.25)]">
      <ul className="flex flex-col gap-3">
        {weekDays.map((day) => {
          const value = schedule[day];
          return (
            <li
              key={day}
              className="flex flex-col gap-3 rounded-[8px] bg-[#f0f0f0] px-3 py-3 shadow-[inset_0_0_4px_rgba(0,0,0,0.12)] sm:flex-row sm:items-center"
            >
              <button
                type="button"
                role="checkbox"
                aria-checked={value.enabled}
                onClick={() =>
                  onChange(day, { ...value, enabled: !value.enabled })
                }
                className="flex items-center gap-3 sm:w-[88px]"
              >
                <CheckIcon checked={value.enabled} />
                <span className="text-[16px] leading-[24px] font-bold text-[#1e1e1e]">
                  {day}
                </span>
              </button>

              <div className="flex flex-1 items-center gap-3">
                <input
                  type="time"
                  value={value.start}
                  disabled={!value.enabled}
                  onChange={(event) =>
                    onChange(day, { ...value, start: event.target.value })
                  }
                  className={`h-[40px] flex-1 rounded-[8px] bg-[#f0f0f0] px-3 text-[15px] leading-[22px] font-medium shadow-[0_0_4px_rgba(0,0,0,0.2)] outline-none ${
                    value.enabled ? "text-[#1e1e1e]" : "text-[#979797]"
                  }`}
                />
                <span className="text-[15px] font-bold text-[#1e1e1e]">~</span>
                <input
                  type="time"
                  value={value.end}
                  disabled={!value.enabled}
                  onChange={(event) =>
                    onChange(day, { ...value, end: event.target.value })
                  }
                  className={`h-[40px] flex-1 rounded-[8px] bg-[#f0f0f0] px-3 text-[15px] leading-[22px] font-medium shadow-[0_0_4px_rgba(0,0,0,0.2)] outline-none ${
                    value.enabled ? "text-[#1e1e1e]" : "text-[#979797]"
                  }`}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function TagChip({
  label,
  variant,
  onClick,
  onRemove,
}: {
  label: string;
  variant: "selected" | "suggestion";
  onClick?: () => void;
  onRemove?: () => void;
}) {
  if (variant === "selected") {
    return (
      <span className="flex h-8 items-center gap-2 rounded-full bg-[#1e1e1e] px-3 text-[13px] leading-[18px] font-medium text-[#f0f0f0]">
        #{label}
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`${label} 태그 삭제`}
            className="text-[14px] leading-none text-[#f0f0f0]"
          >
            ×
          </button>
        )}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-8 items-center rounded-full border border-[#979797] bg-[#f0f0f0] px-3 text-[13px] leading-[18px] font-medium text-[#525252] hover:border-[#1e1e1e] hover:text-[#1e1e1e]"
    >
      + #{label}
    </button>
  );
}

export default function WriteGiverPage() {
  const [communitySize, setCommunitySize] = useState<CommunitySize | null>(null);

  const [online, setOnline] = useState(false);
  const [offline, setOffline] = useState(false);
  const [regions, setRegions] = useState<string[]>([]);
  const [regionModalOpen, setRegionModalOpen] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [schedule, setSchedule] = useState<Record<WeekDay, DaySchedule>>(() =>
    weekDays.reduce(
      (acc, day) => {
        acc[day] = { enabled: false, start: "09:00", end: "18:00" };
        return acc;
      },
      {} as Record<WeekDay, DaySchedule>,
    ),
  );

  const [introduction, setIntroduction] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagDraft, setTagDraft] = useState("");

  const [selectedServices, setSelectedServices] = useState<ServiceId[]>([]);
  const [servicePlans, setServicePlans] = useState<Record<ServiceId, string>>({
    free: "",
    coffee: "",
    meal: "",
  });

  function toggleOffline(next: boolean) {
    setOffline(next);
    if (next) {
      setRegionModalOpen(true);
    } else {
      setRegions([]);
    }
  }

  function addTag(tag: string) {
    const cleaned = tag.replace(/^#/, "").trim();
    if (!cleaned) return;
    setTags((prev) => (prev.includes(cleaned) ? prev : [...prev, cleaned]));
  }

  function handleTagSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTag(tagDraft);
      setTagDraft("");
    }
  }

  function toggleService(id: ServiceId) {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }

  const remainingSuggestions = aiSuggestedTags.filter(
    (tag) => !tags.includes(tag),
  );

  return (
    <main
      className="min-h-screen bg-[#f0f0f0] font-sans text-[#1e1e1e] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      data-node-id="write-giver-root"
    >
      <section className="mx-auto min-h-screen w-full max-w-[1280px] bg-[#f0f0f0]">
        <Header />

        <div className="px-20 pt-12 pb-20">
          <div className="mx-auto w-full max-w-[760px]">
            <h1 className="text-[28px] leading-[38px] font-extrabold">
              기버 활동 글 작성
            </h1>
            <p className="mt-3 text-[16px] leading-[24px] font-medium text-[#525252]">
              나의 활동 가능 조건과 제공할 서비스를 작성해 테이커에게 소개해 보세요.
            </p>

            <form className="mt-12 flex flex-col gap-10">
              <div>
                <SectionLabel>담당하고 싶은 커뮤니티 규모는?</SectionLabel>
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
                <SectionLabel>어떤 방식으로 도움을 주고 싶나요?</SectionLabel>
                <p className="mt-2 text-[14px] leading-[20px] font-medium text-[#525252]">
                  온라인과 오프라인 둘 다 선택할 수 있어요.
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <CheckRow
                    checked={online}
                    onToggle={() => setOnline((prev) => !prev)}
                    label="온라인"
                    description="화상/메시지로 어디서든 활동 가능"
                  />
                  <CheckRow
                    checked={offline}
                    onToggle={() => toggleOffline(!offline)}
                    label="오프라인"
                    description="선택한 지역에서 직접 만나 활동"
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
                      지역 검색
                    </button>
                  </div>
                )}
              </div>

              <div>
                <SectionLabel>기간</SectionLabel>
                <p className="mt-2 text-[14px] leading-[20px] font-medium text-[#525252]">
                  활동 가능한 시작일과 종료일을 선택해 주세요.
                </p>
                <div className="mt-4">
                  <DateBox
                    startDate={startDate}
                    endDate={endDate}
                    onStartChange={setStartDate}
                    onEndChange={setEndDate}
                  />
                </div>
              </div>

              <div>
                <SectionLabel>시간</SectionLabel>
                <p className="mt-2 text-[14px] leading-[20px] font-medium text-[#525252]">
                  요일별로 활동 가능한 시간대를 설정해 주세요.
                </p>
                <div className="mt-4">
                  <ScheduleBox
                    schedule={schedule}
                    onChange={(day, next) =>
                      setSchedule((prev) => ({ ...prev, [day]: next }))
                    }
                  />
                </div>
              </div>

              <div>
                <SectionLabel>자기소개</SectionLabel>
                <p className="mt-2 text-[14px] leading-[20px] font-medium text-[#525252]">
                  나의 강점과 전달하고 싶은 가치를 자유롭게 적어주세요.
                </p>
                <textarea
                  value={introduction}
                  onChange={(event) => setIntroduction(event.target.value)}
                  placeholder={
                    "예) 5년 차 동아리 운영진으로 신규 동아리 세팅, 인원 모집, 회비 관리까지 한 번에 도와드려요.\n어떤 도움이 필요한지 알려주시면 일정에 맞춰 함께 그려볼게요!"
                  }
                  className="mt-4 min-h-[180px] w-full rounded-[12px] bg-[#f0f0f0] p-4 text-[15px] leading-[24px] font-medium text-[#1e1e1e] shadow-[0_0_8px_rgba(0,0,0,0.25)] outline-none placeholder:text-[#979797]"
                />

                <div className="mt-5 rounded-[12px] bg-[#f0f0f0] p-4 shadow-[inset_0_0_4px_rgba(0,0,0,0.12)]">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] leading-[20px] font-bold text-[#1e1e1e]">
                      AI 추천 태그
                    </span>
                    <span className="text-[12px] leading-[18px] font-medium text-[#525252]">
                      자기소개 내용을 바탕으로 추천드려요
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {remainingSuggestions.length === 0 ? (
                      <span className="text-[13px] leading-[18px] font-medium text-[#979797]">
                        모든 추천 태그를 추가했어요
                      </span>
                    ) : (
                      remainingSuggestions.map((tag) => (
                        <TagChip
                          key={tag}
                          label={tag}
                          variant="suggestion"
                          onClick={() => addTag(tag)}
                        />
                      ))
                    )}
                  </div>

                  <div className="mt-5">
                    <span className="text-[14px] leading-[20px] font-bold text-[#1e1e1e]">
                      내가 추가한 태그
                    </span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {tags.length === 0 ? (
                        <span className="text-[13px] leading-[18px] font-medium text-[#979797]">
                          아직 추가된 태그가 없어요
                        </span>
                      ) : (
                        tags.map((tag) => (
                          <TagChip
                            key={tag}
                            label={tag}
                            variant="selected"
                            onRemove={() =>
                              setTags((prev) =>
                                prev.filter((item) => item !== tag),
                              )
                            }
                          />
                        ))
                      )}
                    </div>

                    <div className="mt-3 flex gap-2">
                      <input
                        value={tagDraft}
                        onChange={(event) => setTagDraft(event.target.value)}
                        onKeyDown={handleTagSubmit}
                        placeholder="직접 태그 추가 (Enter로 등록)"
                        className="h-10 flex-1 rounded-full bg-[#f0f0f0] px-4 text-[14px] leading-[20px] font-medium text-[#1e1e1e] shadow-[0_0_4px_rgba(0,0,0,0.22)] outline-none placeholder:text-[#979797]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          addTag(tagDraft);
                          setTagDraft("");
                        }}
                        className="h-10 rounded-full bg-[#1e1e1e] px-4 text-[13px] leading-[18px] font-bold text-[#f0f0f0]"
                      >
                        추가
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <SectionLabel>제공하고 싶은 서비스 (중복 가능)</SectionLabel>
                <p className="mt-2 text-[14px] leading-[20px] font-medium text-[#525252]">
                  서비스의 가격은 등급에 따라 차등 설정됩니다.
                </p>

                <ul className="mt-4 flex flex-col gap-4">
                  {serviceOptions.map((service) => {
                    const checked = selectedServices.includes(service.id);
                    return (
                      <li
                        key={service.id}
                        className="rounded-[12px] bg-[#f0f0f0] p-4 shadow-[0_0_8px_rgba(0,0,0,0.25)]"
                      >
                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={checked}
                          onClick={() => toggleService(service.id)}
                          className="flex w-full items-start gap-3 text-left"
                        >
                          <span className="mt-[2px]">
                            <CheckIcon checked={checked} />
                          </span>
                          <span className="flex flex-col">
                            <span className="text-[16px] leading-[24px] font-bold text-[#1e1e1e]">
                              {service.label}
                            </span>
                            <span className="mt-1 text-[13px] leading-[20px] font-medium text-[#525252]">
                              {service.hint}
                            </span>
                          </span>
                        </button>

                        {checked && (
                          <textarea
                            value={servicePlans[service.id]}
                            onChange={(event) =>
                              setServicePlans((prev) => ({
                                ...prev,
                                [service.id]: event.target.value,
                              }))
                            }
                            placeholder={`${service.label} 제공 계획을 적어주세요`}
                            className="mt-3 min-h-[96px] w-full rounded-[8px] bg-[#f0f0f0] p-3 text-[14px] leading-[22px] font-medium text-[#1e1e1e] shadow-[inset_0_0_4px_rgba(0,0,0,0.18)] outline-none placeholder:text-[#979797]"
                          />
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <Link
                  href="/mainpage_home_giver"
                  className="flex h-12 items-center justify-center rounded-full border border-[#1e1e1e] bg-[#f0f0f0] px-6 text-[15px] leading-[22px] font-bold text-[#1e1e1e]"
                >
                  취소
                </Link>
                <button
                  type="submit"
                  className="flex h-12 items-center justify-center rounded-full bg-[#1e1e1e] px-8 text-[15px] leading-[22px] font-bold text-[#f0f0f0]"
                >
                  글 등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <RegionModal
        open={regionModalOpen}
        onClose={() => setRegionModalOpen(false)}
        selected={regions}
        onSelect={setRegions}
      />
    </main>
  );
}
