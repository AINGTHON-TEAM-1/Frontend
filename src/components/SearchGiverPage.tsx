import Image from "next/image";
import Link from "next/link";

import { SearchControls } from "@/components/SearchControls";

const menuItems = [
  { label: "홈", href: "/mainpage_home_giver" },
  { label: "탐색", href: "/Search_giver", active: true },
  { label: "마이페이지", href: "/mypage_giver" },
];

const jobCards = [
  {
    author: "홍길동",
    title: "OO대학교 동아리 운영진 구인",
    image: "/figma/search-giver/card-1.png",
  },
  {
    author: "김지수",
    title: "OO모임 초기 운영 멘토",
    image: "/figma/search-giver/card-2.png",
  },
  {
    author: "박민준",
    title: "OO대-OO대 연합 행사 멘토 모집",
    image: "/figma/search-giver/card-3.png",
  },
  {
    author: "이서연",
    title: "디스코드 서버 활성화 도와주실 분",
    image: "/figma/search-giver/card-4.png",
  },
  {
    author: "김경한",
    title: "스터디 그룹 참여율 향상시키기",
    image: "/figma/search-giver/card-5.png",
  },
  {
    author: "김도윤",
    title: "OO대 프로젝트 그룹 관리자 모집",
    image: "/figma/search-giver/card-6.png",
  },
  {
    author: "오수민",
    title: "미술 전시회 홍보 멘토 구합니다",
    image: "/figma/search-giver/card-7.png",
  },
  {
    author: "최상미",
    title: "OO동아리 인원들이 참여를 잘 안 해요",
    image: "/figma/search-giver/card-8.png",
  },
];

function ProfileIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 12.3a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Zm-7.5 6.63c0-3.05 3.18-4.98 7.5-4.98s7.5 1.93 7.5 4.98c0 .64-.52 1.17-1.17 1.17H5.67a1.17 1.17 0 0 1-1.17-1.17Z"
        fill="#1e1e1e"
      />
    </svg>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between bg-[#f0f0f0] px-[45px] shadow-[0_0_4px_rgba(0,0,0,0.25)]">
      <nav className="mx-auto flex items-center gap-10">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`text-[16px] leading-[24px] ${
              item.active ? "font-bold" : "font-medium"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="absolute right-[45px] flex items-center gap-4">
        <Link
          href="/mypage_giver"
          className="flex size-9 items-center justify-center"
          aria-label="마이페이지"
        >
          <Image
            src="/figma/my-icon.svg"
            alt=""
            width={24}
            height={24}
            className="size-6"
          />
        </Link>
        <Link
          href="/login"
          className="flex size-9 items-center justify-center"
          aria-label="로그아웃"
        >
          <Image
            src="/figma/logout-icon.svg"
            alt=""
            width={24}
            height={24}
            className="size-6"
          />
        </Link>
      </div>
    </header>
  );
}

function ModeSwitch() {
  return (
    <div className="flex h-8 overflow-hidden rounded-full" aria-label="탐색 대상 선택">
      <Link
        href="/Search_giver"
        aria-current="page"
        className="flex h-8 w-[72px] items-center justify-center rounded-l-full bg-[#333] pr-[10px] pl-[18px] text-[12px] leading-[18px] font-medium text-[#f0f0f0]"
      >
        기버
      </Link>
      <Link
        href="/searchtaker"
        className="flex h-8 w-[72px] items-center justify-center rounded-r-full border border-[#333] bg-[#f0f0f0] pr-[18px] pl-[10px] text-[12px] leading-[18px] font-medium text-[#333]"
      >
        테이커
      </Link>
    </div>
  );
}

function MiniTag({ children }: { children: string }) {
  return (
    <span className="rounded-full bg-[#333] px-3 py-1 text-[11px] leading-[14px] font-medium whitespace-nowrap text-[#f0f0f0]">
      {children}
    </span>
  );
}

function JobCard({
  author,
  title,
  image,
}: {
  author: string;
  title: string;
  image: string;
}) {
  return (
    <article className="h-[247px] overflow-hidden rounded-2xl bg-[#f0f0f0] shadow-[0_0_8px_rgba(0,0,0,0.25)]">
      <div className="flex h-10 items-center gap-1 px-4 pt-3 pb-2.5 shadow-[0_0_4px_rgba(0,0,0,0.25)]">
        <ProfileIcon />
        <span className="text-[12px] leading-[18px] font-medium text-[#1e1e1e]">
          {author}
        </span>
      </div>
      <div className="relative h-[119px] w-full">
        <Image src={image} alt="" fill sizes="265px" className="object-cover" />
      </div>
      <div className="h-[88px] px-4 pt-4 pb-[18px] shadow-[0_0_4px_rgba(0,0,0,0.25)]">
        <h2 className="w-[221px] text-[16px] leading-6 font-bold text-[#1e1e1e]">
          {title}
        </h2>
        <div className="mt-2 flex gap-2">
          <MiniTag>~2026.00.00</MiniTag>
          <MiniTag>000명 모집</MiniTag>
        </div>
      </div>
    </article>
  );
}

function Pagination() {
  const pages = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <nav className="mt-[54px] flex justify-center" aria-label="페이지">
      <div className="flex items-center justify-center">
        {["<<", "<"].map((label) => (
          <button
            key={label}
            type="button"
            className="flex size-12 items-center justify-center rounded-lg text-[14px] leading-[22px] text-[#525252]"
          >
            {label}
          </button>
        ))}
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            className={`flex size-12 items-center justify-center rounded-lg text-[14px] leading-[22px] ${
              page === 1
                ? "font-bold text-[#1e1e1e]"
                : "font-normal text-[#525252]"
            }`}
          >
            {page}
          </button>
        ))}
        {[">", ">>"].map((label) => (
          <button
            key={label}
            type="button"
            className="flex size-12 items-center justify-center rounded-lg text-[14px] leading-[22px] text-[#525252]"
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default function SearchGiverPage() {
  return (
    <main
      className="min-h-screen bg-[#f0f0f0] font-sans text-[#1e1e1e] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      data-node-id="36:665"
    >
      <section className="mx-auto min-h-[1008px] w-full max-w-[1280px] bg-[#f0f0f0]">
        <Header />
        <div className="px-20 pt-12 pb-16">
          <div className="flex items-start justify-between">
            <h1 className="text-[24px] leading-[34px] font-extrabold">
              현재 이런 테이커들이 기버를 모집하고 있어요
            </h1>
            <div className="pt-[13px]">
              <ModeSwitch />
            </div>
          </div>

          <SearchControls />

          <div className="mt-12 grid grid-cols-4 gap-x-5 gap-y-8">
            {jobCards.map((card) => (
              <JobCard key={`${card.author}-${card.title}`} {...card} />
            ))}
          </div>

          <Pagination />
        </div>
      </section>
    </main>
  );
}
