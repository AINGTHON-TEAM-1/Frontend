"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";

const ageOptions = [
  "10대 (만 14~17세)",
  "20대 (만 18~28세)",
  "30대 (만 29~38세)",
  "40대 (만 39~48세)",
  "50대 이상",
];

const fieldBase =
  "h-[44px] rounded-full border bg-[#f0f0f0] px-4 text-[16px] leading-[24px] font-medium text-[#1e1e1e] outline-none placeholder:text-[#b2b2b2] focus:border-[#1e1e1e]";

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="pl-2 text-[16px] leading-[24px] font-bold text-[#1e1e1e]">
      {children}
    </label>
  );
}

function RequiredMessage({ children }: { children: ReactNode }) {
  return (
    <p className="pl-2 text-[11px] leading-[14px] font-medium text-[#ea4335]">
      ※ {children}
    </p>
  );
}

function segmentedClass(isSelected: boolean, side: "left" | "right") {
  const radius = side === "left" ? "rounded-l-full" : "rounded-r-full";
  const spacing = side === "left" ? "pl-5 pr-3" : "pl-3 pr-5";
  const border =
    side === "left"
      ? "border border-[#b2b2b2]"
      : "border-y border-r border-[#b2b2b2]";
  const colors = isSelected
    ? "bg-[#1e1e1e] text-[#b2b2b2]"
    : "bg-[#f0f0f0] text-[#b2b2b2]";

  return `h-full w-[61px] ${radius} ${border} ${spacing} text-center text-[16px] leading-[24px] font-medium ${colors}`;
}

function choiceClass(isSelected: boolean) {
  return `h-[44px] rounded-full px-4 text-center text-[16px] leading-[24px] font-medium ${
    isSelected
      ? "bg-[#1e1e1e] text-[#f0f0f0]"
      : "border border-[#b2b2b2] bg-[#f0f0f0] text-[#b2b2b2]"
  }`;
}

export function SignupPage() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [isAgeOpen, setIsAgeOpen] = useState(false);
  const [selectedAge, setSelectedAge] = useState("");
  const [school, setSchool] = useState("");
  const [enrollment, setEnrollment] = useState<"student" | "graduated" | null>(
    null,
  );

  const isComplete = useMemo(
    () =>
      name.trim() !== "" &&
      gender !== null &&
      selectedAge !== "" &&
      school.trim() !== "" &&
      enrollment !== null,
    [enrollment, gender, name, school, selectedAge],
  );

  return (
    <main className="min-h-screen bg-[#f0f0f0] font-sans text-[#1e1e1e] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <section className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col px-5 pt-[72px]">
        <form className="mx-auto w-full max-w-[550px]">
          <h1 className="text-[28px] leading-[38px] font-extrabold tracking-normal">
            회원가입
          </h1>

          <div className="mt-[36px] grid grid-cols-[minmax(0,408px)_122px] gap-x-5 gap-y-2 max-sm:grid-cols-1">
            <div className="flex flex-col gap-2">
              <FieldLabel>이름</FieldLabel>
              <input
                className={`${fieldBase} ${
                  name.trim() === "" ? "border-[#ea4335]" : "border-[#b2b2b2]"
                }`}
                type="text"
                value={name}
                placeholder="이름을 입력해 주세요"
                aria-label="이름"
                onChange={(event) => setName(event.target.value)}
              />
              {name.trim() === "" && (
                <RequiredMessage>필수 입력 사항입니다.</RequiredMessage>
              )}
            </div>

            <fieldset className="flex flex-col gap-2">
              <legend className="pl-2 text-[16px] leading-[24px] font-bold text-[#1e1e1e]">
                성별
              </legend>
              <div className="flex h-[44px]">
                <button
                  type="button"
                  className={segmentedClass(gender === "male", "left")}
                  aria-pressed={gender === "male"}
                  onClick={() => setGender("male")}
                >
                  남
                </button>
                <button
                  type="button"
                  className={segmentedClass(gender === "female", "right")}
                  aria-pressed={gender === "female"}
                  onClick={() => setGender("female")}
                >
                  여
                </button>
              </div>
              {gender === null && (
                <RequiredMessage>필수 선택 사항입니다.</RequiredMessage>
              )}
            </fieldset>
          </div>

          <div className="relative z-10 mt-[32px] flex flex-col gap-2">
            <FieldLabel>나이</FieldLabel>
            <button
              type="button"
              className={`${fieldBase} relative w-full pr-11 text-left ${
                selectedAge === "" ? "border-[#ea4335]" : "border-[#b2b2b2]"
              } ${selectedAge === "" ? "text-[#b2b2b2]" : "text-[#1e1e1e]"}`}
              aria-expanded={isAgeOpen}
              aria-haspopup="listbox"
              onClick={() => setIsAgeOpen((isOpen) => !isOpen)}
            >
              {selectedAge || "나이를 선택해 주세요"}
              <Image
                src="/figma/chevron-down.svg"
                alt=""
                width={10}
                height={5}
                className={`pointer-events-none absolute top-1/2 right-4 h-[5px] w-[10px] -translate-y-1/2 transition-transform ${
                  isAgeOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isAgeOpen && (
              <div
                className="absolute top-[76px] left-0 w-full overflow-hidden rounded-[22px] border border-[#b2b2b2] bg-[#f0f0f0] shadow-[0_4px_10px_rgba(0,0,0,0.08)]"
                role="listbox"
                aria-label="나이 선택"
              >
                <div className="py-2">
                  {ageOptions.map((age) => (
                    <button
                      key={age}
                      type="button"
                      role="option"
                      aria-selected={selectedAge === age}
                      className={`block h-[36px] w-full px-4 text-left text-[16px] leading-[24px] font-medium hover:bg-[#e4e4e4] ${
                        selectedAge === age
                          ? "text-[#1e1e1e]"
                          : "text-[#b2b2b2]"
                      }`}
                      onClick={() => {
                        setSelectedAge(age);
                        setIsAgeOpen(false);
                      }}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {selectedAge === "" && (
              <RequiredMessage>필수 선택 사항입니다.</RequiredMessage>
            )}
          </div>

          <div className="mt-[32px] flex flex-col gap-2">
            <FieldLabel>학교</FieldLabel>
            <input
              className={`${fieldBase} w-full ${
                school.trim() === "" ? "border-[#ea4335]" : "border-[#b2b2b2]"
              }`}
              type="text"
              value={school}
              placeholder="학교를 입력해 주세요"
              aria-label="학교"
              onChange={(event) => setSchool(event.target.value)}
            />
            {school.trim() === "" && (
              <RequiredMessage>필수 입력 사항입니다.</RequiredMessage>
            )}
          </div>

          <fieldset className="mt-[32px] flex flex-col gap-2">
            <legend className="pl-2 text-[16px] leading-[24px] font-bold text-[#1e1e1e]">
              재학 여부
            </legend>
            <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
              <button
                type="button"
                className={choiceClass(enrollment === "student")}
                aria-pressed={enrollment === "student"}
                onClick={() => setEnrollment("student")}
              >
                학생이에요
              </button>
              <button
                type="button"
                className={choiceClass(enrollment === "graduated")}
                aria-pressed={enrollment === "graduated"}
                onClick={() => setEnrollment("graduated")}
              >
                졸업했어요
              </button>
            </div>
            {enrollment === null && (
              <RequiredMessage>필수 선택 사항입니다.</RequiredMessage>
            )}
          </fieldset>

          <Link
            href={isComplete ? "/onboarding" : "#"}
            aria-disabled={!isComplete}
            className={`mt-[88px] flex h-[44px] w-full items-center justify-center rounded-full px-4 text-center text-[16px] leading-[24px] font-medium text-[#f0f0f0] ${
              isComplete ? "bg-[#1e1e1e]" : "bg-[#b2b2b2]"
            }`}
          >
            회원가입 완료하기
          </Link>
        </form>
      </section>
    </main>
  );
}
