"use client";

import { useEffect, useRef, useState } from "react";

const FILTER_OPTIONS = ["제목+내용", "제목", "작성자", "내용"] as const;
type FilterOption = (typeof FILTER_OPTIONS)[number];

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
        stroke="#979797"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="m14.2 14.2 3 3M8.8 15.4a6.6 6.6 0 1 1 0-13.2 6.6 6.6 0 0 1 0 13.2Z"
        stroke="#8c8c8c"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SearchControls({
  placeholder = "검색어를 입력하세요",
}: {
  placeholder?: string;
}) {
  const [filter, setFilter] = useState<FilterOption>("제목+내용");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
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

  return (
    <div className="relative mt-8 flex h-11 w-full items-center gap-4">
      <div ref={filterRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex h-11 w-[122px] shrink-0 items-center justify-between rounded-full border border-[#b2b2b2] px-4 text-[14px] leading-5 font-medium text-[#1e1e1e]"
        >
          {filter}
          <ChevronDown open={open} />
        </button>

        {open && (
          <ul
            role="listbox"
            aria-label="검색 범위"
            className="absolute top-[52px] left-0 z-10 w-[122px] overflow-hidden rounded-xl bg-[#f0f0f0] py-1 shadow-[0_0_4px_rgba(0,0,0,0.25)]"
          >
            {FILTER_OPTIONS.map((label) => {
              const selected = label === filter;
              return (
                <li key={label} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    onClick={() => {
                      setFilter(label);
                      setOpen(false);
                    }}
                    className={`flex h-10 w-full items-center px-4 text-left text-[16px] leading-6 font-medium hover:bg-[#e3e3e3] ${
                      selected ? "text-[#1e1e1e]" : "text-[#525252]"
                    }`}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <label className="flex h-11 min-w-0 flex-1 items-center justify-between rounded-full border border-[#b2b2b2] px-4 py-2.5">
        <span className="sr-only">검색어</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-[14px] leading-5 font-medium text-[#1e1e1e] outline-none placeholder:text-[#8c8c8c]"
          placeholder={placeholder}
        />
        <SearchIcon />
      </label>
    </div>
  );
}
