import Image from "next/image";
import Link from "next/link";

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

export default function OnboardingGiverQuestionFinishPage() {
  return (
    <main
      className="min-h-screen bg-[#f0f0f0] font-sans text-[#1e1e1e] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      data-node-id="36:457"
    >
      <section className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col px-5 pt-[106px]">
        <div className="mx-auto w-full max-w-[550px]">
          <div className="flex items-center justify-between">
            <StepTag>질문 01</StepTag>
            <ProgressLine />
            <StepTag>질문 02</StepTag>
            <ProgressLine />
            <StepTag>질문 03</StepTag>
            <ProgressLine />
            <StepTag active>설문 완료</StepTag>
          </div>

          <h1 className="mt-[64px] text-[36px] leading-[48px] font-extrabold tracking-normal">
            답변이 성공적으로 제출되었어요
          </h1>

          <p className="mt-4 text-[20px] leading-[30px] font-bold">
            이제 로그인해서 서비스를 체험해 보세요!
          </p>

          <div className="mt-[70px] flex items-start">
            <Image
              src="/figma/thumb-up.png"
              alt="좋아요 일러스트"
              width={300}
              height={300}
              className="size-[300px] object-cover"
              preload
            />
            <Image
              src="/figma/chat-bubble.png"
              alt="채팅 말풍선 일러스트"
              width={100}
              height={100}
              className="mt-[14px] size-[100px] object-cover"
              preload
            />
          </div>

          <Link
            href="/mainpagehomegiver"
            className="mt-[64px] flex h-[52px] w-full items-center justify-center rounded-full bg-[#1e1e1e] px-12 py-[14px] text-center text-[16px] leading-[24px] font-bold text-[#f0f0f0]"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </section>
    </main>
  );
}
