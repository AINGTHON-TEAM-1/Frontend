"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const groupSizeOptions = [
  "소규모 (16명 이하)",
  "중규모 (16~00명)",
  "대규모 (000명 이상)",
];

const durationOptions = [
  "단기간 (~3개월 미만)",
  "장기간 (3개월 이상)",
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

export default function OnboardingGiverQuestion03Page() {
  const [selectedGroupSize, setSelectedGroupSize] = useState<string | null>(
    null,
  );
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);

  const continueEnabled =
    selectedGroupSize !== null && selectedDuration !== null;

  return (
    <main
      className="min-h-screen bg-[#f0f0f0] font-sans text-[#1e1e1e] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      data-node-id="18:312"
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
            선호하는 그룹 운영
            <br />
            규모와 기간이 있나요?
          </h1>

          <p className="mt-[28px] text-[20px] leading-[30px] font-bold">
            선택한 답변은 추후 나의 활동 및 관심사에 반영돼요
          </p>

          <div className="mt-[74px]">
            <h2 className="text-[16px] leading-[24px] font-bold">
              선호하는 그룹 규모
            </h2>
            <div className="mt-4 flex gap-[10px]">
              {groupSizeOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={selectedGroupSize === option}
                  onClick={() => setSelectedGroupSize(option)}
                  className={`h-[44px] rounded-[8px] px-4 text-center text-[16px] leading-[24px] font-medium shadow-[0_0_8px_rgba(0,0,0,0.25)] transition-colors ${
                    selectedGroupSize === option
                      ? "bg-[#b2b2b2] text-[#1e1e1e]"
                      : "bg-[#f0f0f0] text-[#1e1e1e]"
                  } ${
                    option === "중규모 (16~00명)" ? "w-[172px]" : "w-[173px]"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-[16px] leading-[24px] font-bold">
              선호하는 운영 기간
            </h2>
            <div className="mt-4 flex flex-col gap-4">
              {durationOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={selectedDuration === option}
                  onClick={() => setSelectedDuration(option)}
                  className={`h-[44px] w-full rounded-[8px] px-4 text-center text-[16px] leading-[24px] font-medium shadow-[0_0_8px_rgba(0,0,0,0.25)] transition-colors ${
                    selectedDuration === option
                      ? "bg-[#b2b2b2] text-[#1e1e1e]"
                      : "bg-[#f0f0f0] text-[#1e1e1e]"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <Link
            href={continueEnabled ? "/onboardinggiverquestionfinish" : "#"}
            aria-disabled={!continueEnabled}
            className={`mt-[74px] flex h-[52px] w-full items-center justify-center rounded-full px-12 py-[14px] text-center text-[16px] leading-[24px] font-bold text-[#f0f0f0] ${
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
