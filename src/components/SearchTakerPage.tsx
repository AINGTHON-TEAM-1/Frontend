import Image from "next/image";
import Link from "next/link";

import { SearchControls } from "@/components/SearchControls";

const menuItems = [
  { label: "홈", href: "/mainpage_home_giver" },
  { label: "탐색", href: "/Search_giver", active: true },
  { label: "마이페이지", href: "#" },
];

const giverProfiles = [
  {
    name: "홍길동",
    rating: "4.0",
    stars: 4,
    description: ["디스코드 OO서버 1.5년 운영 경험", "여러 온라인 서버 멘토 경험 다수"],
  },
  { name: "김정민", rating: "5.0" },
  { name: "윤지현", rating: "5.0" },
  { name: "김지현", rating: "5.0" },
  { name: "이태호", rating: "5.0" },
  { name: "서상민", rating: "5.0" },
  { name: "노규형", rating: "5.0" },
  { name: "오인겸", rating: "5.0" },
  {
    name: "차준호",
    rating: "5.0",
    description: ["디스코드 OO서버 1.5년 운영 경험", "여러 온라인 서버 멘토 경험 다수"],
  },
  { name: "김경한", rating: "5.0" },
  { name: "김와와", rating: "5.0" },
  { name: "박솨솨", rating: "5.0" },
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

function StarIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 16 16" fill="none">
      <path
        d="m8 1.6 1.85 3.75 4.14.6-3 2.93.71 4.12L8 11.05 4.3 13l.71-4.12-3-2.93 4.14-.6L8 1.6Z"
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
        <button
          type="button"
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
        </button>
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
        className="flex h-8 w-[72px] items-center justify-center rounded-l-full border border-[#333] bg-[#f0f0f0] pl-[18px] pr-[10px] text-[12px] leading-[18px] font-medium text-[#333]"
      >
        기버
      </Link>
      <Link
        href="/searchtaker"
        aria-current="page"
        className="flex h-8 w-[72px] items-center justify-center rounded-r-full bg-[#333] pl-[10px] pr-[18px] text-[12px] leading-[18px] font-medium text-[#f0f0f0]"
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

function Rating({ stars = 5, rating }: { stars?: number; rating: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center" aria-label={`별점 ${rating}`}>
        {Array.from({ length: stars }, (_, index) => (
          <StarIcon key={index} />
        ))}
      </div>
      <span className="text-[11px] leading-[14px] font-medium text-[#1e1e1e]">
        {rating}
      </span>
    </div>
  );
}

function GiverProfileCard({
  name,
  rating,
  stars,
  description = ["기버의 한 줄 소개를 입력해 주세요", "최대 두 줄까지 들어갑니다"],
}: {
  name: string;
  rating: string;
  stars?: number;
  description?: string[];
}) {
  return (
    <article className="h-[131px] rounded-2xl bg-[#f0f0f0] px-4 pt-[19px] pb-4 shadow-[0_0_8px_rgba(0,0,0,0.25)]">
      <div className="flex items-start gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#ccc] p-2">
          <ProfileIcon className="size-6" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-[14px] leading-5 font-bold whitespace-nowrap text-[#1e1e1e]">
              {name}
            </h2>
            <Rating stars={stars} rating={rating} />
          </div>
          <p className="mt-[6px] text-[11px] leading-[14px] font-medium text-[#1e1e1e]">
            {description.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <MiniTag>#중규모</MiniTag>
        <MiniTag>#장기간</MiniTag>
        <MiniTag>#오프라인</MiniTag>
      </div>
    </article>
  );
}

function Pagination() {
  const pages = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <nav className="mt-[102px] flex justify-center" aria-label="페이지">
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

export default function SearchTakerPage() {
  return (
    <main
      className="min-h-screen bg-[#f0f0f0] font-sans text-[#1e1e1e] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      data-node-id="45:394"
    >
      <section className="mx-auto min-h-[1008px] w-full max-w-[1280px] bg-[#f0f0f0]">
        <Header />
        <div className="px-20 pt-12 pb-16">
          <div className="flex items-start justify-between">
            <h1 className="text-[24px] leading-[34px] font-extrabold">
              나의 커뮤니티 운영에 도움이 될 만한 기버들이에요
            </h1>
            <div className="pt-[13px]">
              <ModeSwitch />
            </div>
          </div>

          <SearchControls placeholder="검색어를 입력하세요." />

          <div className="mt-12 grid grid-cols-4 gap-x-5 gap-y-10">
            {giverProfiles.map((profile) => (
              <GiverProfileCard key={profile.name} {...profile} />
            ))}
          </div>

          <Pagination />
        </div>
      </section>
    </main>
  );
}
