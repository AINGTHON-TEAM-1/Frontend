"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Purpose = "giver" | "taker";

const options: Array<{
  id: Purpose;
  icon: string;
  alt: string;
  lines: [string, string];
  contentWidth: string;
}> = [
  {
    id: "giver",
    icon: "/figma/giver-icon.png",
    alt: "정보 공유",
    lines: ["내가 알고 있는 정보를", "공유하고 싶어요"],
    contentWidth: "w-[160px]",
  },
  {
    id: "taker",
    icon: "/figma/taker-icon.png",
    alt: "커뮤니티 운영 관리",
    lines: ["커뮤니티 운영을 관리받고", "정보를 얻고 싶어요"],
    contentWidth: "w-[180px]",
  },
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

export default function OnboardingPurposePage() {
  const [selectedPurpose, setSelectedPurpose] = useState<Purpose | null>(null);

  const continueHref =
    selectedPurpose === "giver" ? "/onboarding_giver_question02" : "#";

  return (
    <main
      className="min-h-screen bg-[#f0f0f0] font-sans text-[#1e1e1e] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      data-node-id="18:245"
    >
      <section className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col px-5 pt-[106px]">
        <div className="mx-auto w-full max-w-[550px]">
          <div className="flex items-center justify-between">
            <StepTag active>질문 01</StepTag>
            <ProgressLine />
            <StepTag>질문 02</StepTag>
            <ProgressLine />
            <StepTag>질문 03</StepTag>
            <ProgressLine />
            <StepTag>설문 완료</StepTag>
          </div>

          <h1 className="mt-[28px] text-[36px] leading-[48px] font-extrabold tracking-normal">
            해당 서비스를 사용하는
            <br />
            주 목적이 무엇인가요?
          </h1>

          <p className="mt-[28px] text-[20px] leading-[30px] font-bold">
            선택한 답변은 추후 나의 활동 및 관심사에 반영돼요
          </p>

          <div className="mt-[42px] grid grid-cols-2 gap-[21px] max-sm:grid-cols-1">
            {options.map((option) => {
              const isSelected = selectedPurpose === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={isSelected}
                  className={`flex h-[244px] w-full items-start justify-center rounded-[16px] pt-[32px] pb-[39px] shadow-[0_4px_8px_rgba(0,0,0,0.25)] transition-colors ${
                    isSelected ? "bg-[#b2b2b2]" : "bg-[#f0f0f0]"
                  }`}
                  onClick={() => setSelectedPurpose(option.id)}
                >
                  <div
                    className={`flex ${option.contentWidth} flex-col items-center gap-2`}
                  >
                    <Image
                      src={option.icon}
                      alt={option.alt}
                      width={120}
                      height={120}
                      className="size-[120px] object-cover"
                      priority
                    />
                    <span className="text-center text-[18px] leading-[28px] font-medium">
                      {option.lines[0]}
                      <br />
                      {option.lines[1]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <Link
            href={continueHref}
            aria-disabled={selectedPurpose !== "giver"}
            className={`mt-[64px] flex h-[52px] w-full items-center justify-center rounded-full px-12 py-[14px] text-center text-[16px] leading-[24px] font-bold text-[#f0f0f0] ${
              selectedPurpose === "giver" ? "bg-[#1e1e1e]" : "bg-[#b2b2b2]"
            }`}
          >
            계속하기
          </Link>
        </div>
      </section>
    </main>
  );
}
