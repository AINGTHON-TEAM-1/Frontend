"use client";

import { useEffect } from "react";

interface MatchSuccessModalProps {
  title?: string;
  description?: string;
  onClose: () => void;
}

export function MatchSuccessModal({
  title = "신청이 완료되었습니다",
  description = "상대방이 수락하면 매칭이 성사돼요. 진행 상황은 마이페이지에서 확인할 수 있어요.",
  onClose,
}: MatchSuccessModalProps) {
  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="매칭 신청 완료"
      className="fixed inset-0 z-[60] flex animate-fade-in items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-[420px] animate-modal-pop flex-col items-center gap-4 rounded-[24px] bg-white px-8 py-9 text-center shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex size-16 items-center justify-center rounded-full bg-[#34a853]/15">
          <svg
            aria-hidden="true"
            viewBox="0 0 32 32"
            className="size-9"
            fill="none"
          >
            <path
              d="m9 16.5 5 5 9-11"
              stroke="#1f8a3d"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h3 className="text-[20px] leading-[28px] font-extrabold text-[#1e1e1e]">
          {title}
        </h3>
        <p className="max-w-[320px] text-[14px] leading-[22px] font-medium text-[#525252]">
          {description}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-2 h-12 w-full rounded-full bg-[#1e1e1e] text-[15px] leading-[22px] font-bold text-[#f0f0f0] shadow-[0_4px_16px_rgba(30,30,30,0.3)] transition hover:bg-[#333]"
        >
          확인
        </button>
      </div>
    </div>
  );
}
