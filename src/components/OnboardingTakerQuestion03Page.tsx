"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const difficultyOptions = [
  "운영 기획을 구체적으로 세우기가 어려워요",
  "사람들이 많이 모이지 않아요",
  "구성원들의 참여율이 저조해요",
  "커뮤니티를 계속해서 유지하기가 어려워요",
  "기타",
];

function StepTag({
  children,
  active = false,
}: {
  children: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center rounded-full px-3 py-[6px] ${
        active ? "bg-[#1e1e1e]" : "border border-[#979797]"
      }`}
    >
      <span
        className={`text-[14px] leading-[20px] font-medium whitespace-nowrap ${
          active ? "text-[#f0f0f0]" : "text-[#979797]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

function ProgressLine() {
  return (
    <div className="flex h-px w-[86px] items-center justify-center">
      <Image
        src="/figma/progress-line.svg"
        alt=""
        width={86}
        height={1}
        className="h-px w-[86px]"
      />
    </div>
  );
}

export default function OnboardingTakerQuestion03Page() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    setSelectedOptions((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option],
    );
  };

  const canSubmit = selectedOptions.length > 0;

  return (
    <main
      className="min-h-screen bg-[#f0f0f0] font-sans text-[#1e1e1e] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      data-node-id="16:349"
    >
      <section className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col px-5 pt-[106px]">
        <div className="mx-auto w-full max-w-[550px]">
          <div className="flex items-center justify-between">
            <StepTag>질문 01</StepTag>
            <ProgressLine />
            <StepTag>질문 02</StepTag>
            <ProgressLine />
            <StepTag active>질문 03</StepTag>
            <ProgressLine />
            <StepTag>설문 완료</StepTag>
          </div>

          <h1 className="mt-[28px] text-[36px] leading-[48px] font-extrabold tracking-normal">
            커뮤니티를 꾸려 나갈 때
            <br />
            가장 어려운 부분은 무엇인가요?
          </h1>

          <p className="mt-[28px] text-[20px] leading-[30px] font-bold">
            해당되는 항목을 모두 선택해 주세요!
          </p>

          <div className="mt-[44px] flex flex-col gap-3">
            {difficultyOptions.map((option) => {
              const isSelected = selectedOptions.includes(option);

              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => toggleOption(option)}
                  className={`h-[44px] w-full rounded-[8px] px-4 text-center text-[16px] leading-[24px] font-medium shadow-[0_0_8px_rgba(0,0,0,0.25)] transition-colors ${
                    isSelected
                      ? "bg-[#b2b2b2] text-[#1e1e1e]"
                      : "bg-[#f0f0f0] text-[#1e1e1e]"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          <Link
            href={canSubmit ? "/onboarding_giver_question_f" : "#"}
            aria-disabled={!canSubmit}
            className={`mt-[32px] flex h-[52px] w-full items-center justify-center rounded-full px-12 py-[14px] text-center text-[16px] leading-[24px] font-bold text-[#f0f0f0] ${
              canSubmit ? "bg-[#1e1e1e]" : "bg-[#b2b2b2]"
            }`}
          >
            답변 제출하기
          </Link>
        </div>
      </section>
    </main>
  );
}
