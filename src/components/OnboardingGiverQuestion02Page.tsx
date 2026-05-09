"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const suggestionOptions = [
  "대학 연합 동아리",
  "취미 모임",
  "과제팟",
  "스터디원 모집",
  "대학생 해커톤 개최 및 운영",
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

export default function OnboardingGiverQuestion02Page() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [customTopic, setCustomTopic] = useState("");

  const continueEnabled =
    selectedTopic !== null || customTopic.trim().length > 0;

  return (
    <main
      className="min-h-screen bg-[#f0f0f0] font-sans text-[#1e1e1e] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      data-node-id="18:272"
    >
      <section className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col px-5 pt-[106px]">
        <div className="mx-auto w-full max-w-[550px]">
          <div className="flex items-center justify-between">
            <StepTag>질문 01</StepTag>
            <ProgressLine />
            <StepTag active>질문 02</StepTag>
            <ProgressLine />
            <StepTag>질문 03</StepTag>
            <ProgressLine />
            <StepTag>설문 완료</StepTag>
          </div>

          <h1 className="mt-[28px] text-[36px] leading-[48px] font-extrabold tracking-normal">
            다른 사람들에게 어떤 분야의
            <br />
            정보를 나눠 주고 싶나요?
          </h1>

          <p className="mt-[28px] text-[20px] leading-[30px] font-bold">
            선택한 답변은 추후 나의 활동 및 관심사에 반영돼요
          </p>

          <div className="mt-[74px] flex flex-wrap gap-x-[15px] gap-y-8">
            {suggestionOptions.map((topic) => {
              const isSelected = selectedTopic === topic;
              const isWide =
                topic === "대학 연합 동아리" ||
                topic === "대학생 해커톤 개최 및 운영";
              const widthClass = isWide ? "w-[265px]" : "w-[122px]";

              return (
                <button
                  key={topic}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedTopic(topic)}
                  className={`${widthClass} h-[44px] rounded-full px-4 text-center text-[16px] leading-[24px] font-medium shadow-[0_0_8px_rgba(0,0,0,0.25)] transition-colors ${
                    isSelected
                      ? "bg-[#b2b2b2] text-[#1e1e1e]"
                      : "bg-[#f0f0f0] text-[#1e1e1e]"
                  }`}
                >
                  {topic}
                </button>
              );
            })}
          </div>

          <div className="mt-5">
            <label className="sr-only" htmlFor="custom-topic">
              주제 직접 제안하기
            </label>
            <input
              id="custom-topic"
              type="text"
              value={customTopic}
              onChange={(event) => setCustomTopic(event.target.value)}
              placeholder="주제 직접 제안하기:"
              className="h-[44px] w-full rounded-[8px] bg-[#f0f0f0] px-4 text-[16px] leading-[24px] font-medium text-[#1e1e1e] shadow-[0_0_8px_rgba(0,0,0,0.25)] outline-none placeholder:text-[#1e1e1e]"
            />
          </div>

          <Link
            href={continueEnabled ? "/onboarding_giver_question03" : "#"}
            aria-disabled={!continueEnabled}
            className={`mt-[133px] flex h-[52px] w-full items-center justify-center rounded-full px-12 py-[14px] text-center text-[16px] leading-[24px] font-bold text-[#f0f0f0] ${
              continueEnabled ? "bg-[#1e1e1e]" : "bg-[#b2b2b2]"
            }`}
          >
            계속하기
          </Link>
        </div>
      </section>
    </main>
  );
}
