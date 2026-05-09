import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "./SiteHeader";

const giverBenefits = [
  {
    icon: "/figma/giver-icon.png",
    title: "내 전문성을 나눠요",
    description: "내가 쌓아온 경험과 노하우를 필요한 커뮤니티에 전달해요.",
  },
  {
    icon: "/figma/fire-icon.png",
    title: "성장하는 커뮤니티",
    description: "활발한 커뮤니티 구성원과 함께 새로운 시너지를 만들어요.",
  },
  {
    icon: "/figma/thumb-up.png",
    title: "신뢰받는 활동 이력",
    description: "프로필과 활동 기록으로 나만의 브랜드를 차곡차곡 쌓아요.",
  },
];

const giverSteps = [
  {
    step: "01",
    title: "기버 정보 등록",
    description: "내 강점과 활동 영역을 프로필에 정리해요.",
  },
  {
    step: "02",
    title: "커뮤니티 매칭",
    description: "내 강점과 어울리는 커뮤니티를 만나봐요.",
  },
  {
    step: "03",
    title: "활동 시작",
    description: "일정과 메시지로 커뮤니티와 가까워져요.",
  },
];

function HomeBackground({ nodeId }: { nodeId: string }) {
  return (
    <>
      <div
        className="absolute top-1/2 left-1/2 h-[808px] w-[1288px] -translate-x-1/2 -translate-y-1/2 blur-[2px]"
        data-node-id="71:465"
        aria-hidden="true"
      >
        <Image
          src="/figma/home-background.png"
          alt=""
          fill
          sizes="1288px"
          className="object-cover opacity-20"
          preload
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-[rgba(190,190,190,0.3)] to-[rgba(30,30,30,0.3)]"
        data-node-id={nodeId}
        aria-hidden="true"
      />
    </>
  );
}

export default function MainpageHomeGiverPage() {
  return (
    <main
      className="min-h-screen bg-[#f0f0f0] font-sans text-[#1e1e1e] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      data-node-id="71:467"
    >
      <SiteHeader role="giver" active="home" />

      <section className="relative mx-auto min-h-[calc(100vh-80px)] w-full max-w-[1280px] overflow-hidden bg-[#f0f0f0]">
        <HomeBackground nodeId="71:467" />

        <div className="relative z-[1] flex min-h-[720px] flex-col items-center px-5 pt-[177px] text-center">
          <h1 className="text-[48px] leading-[64px] font-extrabold tracking-normal">
            나의 경험과 노하우로
            <br />
            커뮤니티를 도와주세요
          </h1>
          <p className="mt-6 text-[24px] leading-[34px] font-extrabold">
            기버 정보를 업로드하고 도움이 필요한 커뮤니티를 만나보세요!
          </p>
          <Link
            href="/write_giver"
            className="mt-[86px] flex h-16 w-full max-w-[550px] items-center justify-center rounded-full bg-[#1e1e1e] px-4 text-center text-[20px] leading-[30px] font-bold text-[#f0f0f0]"
          >
            기버 정보 업로드하기
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1280px] bg-[#f0f0f0] px-[45px] py-[120px]">
        <div className="text-center">
          <span className="text-[16px] leading-[24px] font-bold tracking-[0.2em] text-[#7a7a7a] uppercase">
            Why Giver
          </span>
          <h2 className="mt-4 text-[40px] leading-[56px] font-extrabold">
            기버로 활동하면 좋은 점
          </h2>
          <p className="mt-4 text-[18px] leading-[28px] font-medium text-[#4a4a4a]">
            나의 경험을 가치 있게 사용할 수 있는 세 가지 이유를 만나보세요.
          </p>
        </div>

        <ul className="mt-[60px] grid gap-6 md:grid-cols-3">
          {giverBenefits.map((item) => (
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
            기버 활동, 이렇게 시작해요
          </h2>
          <p className="mt-4 text-[18px] leading-[28px] font-medium text-[#bdbdbd]">
            세 단계만 거치면 누구나 기버로 활동을 시작할 수 있어요.
          </p>
        </div>

        <ol className="mt-[60px] grid gap-6 md:grid-cols-3">
          {giverSteps.map((item) => (
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
            지금 바로 기버로 시작해보세요
          </h2>
          <p className="mt-4 text-[18px] leading-[28px] font-medium text-[#4a4a4a]">
            등록은 5분이면 충분해요. 나의 경험이 누군가에게는 큰 힘이 됩니다.
          </p>
          <Link
            href="/write_giver"
            className="mt-10 flex h-16 w-full max-w-[420px] items-center justify-center rounded-full bg-[#1e1e1e] px-4 text-[20px] leading-[30px] font-bold text-[#f0f0f0]"
          >
            기버 정보 업로드하기
          </Link>
        </div>
      </section>
    </main>
  );
}
