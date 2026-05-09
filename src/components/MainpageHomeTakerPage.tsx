import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "./SiteHeader";

const takerBenefits = [
  {
    icon: "/figma/giver-icon.png",
    title: "검증된 기버를 만나요",
    description: "전문성과 활동 이력이 확인된 기버와 안전하게 연결돼요.",
  },
  {
    icon: "/figma/chat-bubble.png",
    title: "원활한 소통",
    description: "메시지로 빠르게 협업하고 필요한 도움을 바로 받아요.",
  },
  {
    icon: "/figma/calendar-icon.png",
    title: "체계적인 일정 관리",
    description: "예정된 활동을 한눈에 확인하고 진행 상황을 추적해요.",
  },
];

const takerSteps = [
  {
    step: "01",
    title: "커뮤니티 등록",
    description: "우리 커뮤니티의 성격과 필요한 도움을 정리해요.",
  },
  {
    step: "02",
    title: "기버 탐색",
    description: "프로필을 보고 우리에게 어울리는 기버를 찾아요.",
  },
  {
    step: "03",
    title: "활동 시작",
    description: "기버와 일정을 맞추고 함께 커뮤니티를 키워요.",
  },
];

function HomeBackground() {
  return (
    <>
      <div
        className="absolute top-1/2 left-1/2 h-[808px] w-[1288px] -translate-x-1/2 -translate-y-1/2 blur-[2px]"
        data-node-id="71:478"
        aria-hidden="true"
      >
        <Image
          src="/figma/home-background.png"
          alt=""
          fill
          sizes="1288px"
          className="object-cover opacity-20"
          priority
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-[rgba(190,190,190,0.3)] to-[rgba(30,30,30,0.3)]"
        data-node-id="71:479"
        aria-hidden="true"
      />
    </>
  );
}

export default function MainpageHomeTakerPage() {
  return (
    <main
      className="min-h-screen bg-[#f0f0f0] font-sans text-[#1e1e1e] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      data-node-id="71:477"
    >
      <SiteHeader role="taker" active="home" />

      <section className="relative mx-auto min-h-[calc(100vh-80px)] w-full max-w-[1280px] overflow-hidden bg-[#f0f0f0]">
        <HomeBackground />

        <div className="relative z-[1] flex min-h-[720px] flex-col items-center px-5 pt-[177px] text-center">
          <h1 className="text-[48px] leading-[64px] font-extrabold tracking-normal">
            커뮤니티 운영과 관리가 어렵다면
            <br />
            기버와 함께하세요
          </h1>
          <p className="mt-6 text-[24px] leading-[34px] font-extrabold">
            커뮤니티 정보를 업로드하고 그룹 성격에 맞는 기버를 찾아보세요!
          </p>
          <Link
            href="/write_taker"
            className="mt-[86px] flex h-16 w-full max-w-[550px] items-center justify-center rounded-full bg-[#1e1e1e] px-4 text-center text-[20px] leading-[30px] font-bold text-[#f0f0f0]"
          >
            내 커뮤니티 정보 업로드하기
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1280px] bg-[#f0f0f0] px-[45px] py-[120px]">
        <div className="text-center">
          <span className="text-[16px] leading-[24px] font-bold tracking-[0.2em] text-[#7a7a7a] uppercase">
            Why Taker
          </span>
          <h2 className="mt-4 text-[40px] leading-[56px] font-extrabold">
            기버와 함께하면 좋은 점
          </h2>
          <p className="mt-4 text-[18px] leading-[28px] font-medium text-[#4a4a4a]">
            커뮤니티가 더 단단해지는 세 가지 이유를 만나보세요.
          </p>
        </div>

        <ul className="mt-[60px] grid gap-6 md:grid-cols-3">
          {takerBenefits.map((item) => (
            <li
              key={item.title}
              className="flex flex-col items-start rounded-[24px] bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
            >
              <div className="flex size-14 items-center justify-center rounded-full bg-[#f0f0f0]">
                <Image
                  src={item.icon}
                  alt=""
                  width={32}
                  height={32}
                  className="size-8 object-contain"
                />
              </div>
              <h3 className="mt-6 text-[22px] leading-[32px] font-extrabold">
                {item.title}
              </h3>
              <p className="mt-3 text-[16px] leading-[26px] font-medium text-[#4a4a4a]">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto w-full max-w-[1280px] bg-[#1e1e1e] px-[45px] py-[120px] text-[#f0f0f0]">
        <div className="text-center">
          <span className="text-[16px] leading-[24px] font-bold tracking-[0.2em] text-[#bdbdbd] uppercase">
            How it works
          </span>
          <h2 className="mt-4 text-[40px] leading-[56px] font-extrabold">
            이렇게 시작해요
          </h2>
          <p className="mt-4 text-[18px] leading-[28px] font-medium text-[#bdbdbd]">
            세 단계만 거치면 우리 커뮤니티에 맞는 기버를 만날 수 있어요.
          </p>
        </div>

        <ol className="mt-[60px] grid gap-6 md:grid-cols-3">
          {takerSteps.map((item) => (
            <li
              key={item.step}
              className="flex flex-col rounded-[24px] border border-[rgba(240,240,240,0.15)] bg-[#2a2a2a] p-8"
            >
              <span className="text-[18px] leading-[26px] font-bold tracking-[0.2em] text-[#bdbdbd]">
                STEP {item.step}
              </span>
              <h3 className="mt-4 text-[24px] leading-[34px] font-extrabold">
                {item.title}
              </h3>
              <p className="mt-3 text-[16px] leading-[26px] font-medium text-[#d6d6d6]">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto w-full max-w-[1280px] bg-[#f0f0f0] px-[45px] py-[120px]">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-[40px] leading-[56px] font-extrabold">
            지금 바로 기버를 만나보세요
          </h2>
          <p className="mt-4 text-[18px] leading-[28px] font-medium text-[#4a4a4a]">
            커뮤니티 정보를 등록하면 어울리는 기버를 빠르게 찾아드려요.
          </p>
          <Link
            href="/write_taker"
            className="mt-10 flex h-16 w-full max-w-[460px] items-center justify-center rounded-full bg-[#1e1e1e] px-4 text-[20px] leading-[30px] font-bold text-[#f0f0f0]"
          >
            내 커뮤니티 정보 업로드하기
          </Link>
        </div>
      </section>
    </main>
  );
}
