import Image from "next/image";
import Link from "next/link";

const menuItems = [
  { label: "홈", href: "/mainpage_home_giver" },
  { label: "탐색", href: "/Search_giver", active: true },
  { label: "마이페이지", href: "#" },
];

const jobCards = [
  {
    author: "홍길동",
    title: "OO대학교 해커톤 운영 팁 급구",
    image: "/figma/search-giver/card-1.png",
  },
  {
    author: "김지튀김",
    title: "OO소모임 장기 운영 멘토",
    image: "/figma/search-giver/card-2.png",
  },
  {
    author: "노규형",
    title: "OO대-OO대 연합 행사 멘토 모집",
    image: "/figma/search-giver/card-3.png",
  },
  {
    author: "오인겸",
    title: "디코 서버 활성화 팁 구합니다",
    image: "/figma/search-giver/card-4.png",
  },
  {
    author: "김경한",
    title: "스터디 그룹 참여율 향상시키기",
    image: "/figma/search-giver/card-5.png",
  },
  {
    author: "김정민",
    title: "OO대 프로젝트 그룹 관리자 모집",
    image: "/figma/search-giver/card-6.png",
  },
  {
    author: "윤지현",
    title: "미술 전시회 크루: 멘토 구합니다",
    image: "/figma/search-giver/card-7.png",
  },
  {
    author: "서상민",
    title: "OO동아리 인원들이 참여를 안 해요",
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

function ChevronDown() {
  return (
    <svg aria-hidden="true" className="size-3" viewBox="0 0 12 12" fill="none">
      <path
        d="M2 4.25 6 8l4-3.75"
        stroke="#979797"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="m14.2 14.2 3 3M8.8 15.4a6.6 6.6 0 1 1 0-13.2 6.6 6.6 0 0 1 0 13.2Z"
        stroke="#8c8c8c"
        strokeWidth="1.6"
        strokeLinecap="round"
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

function SearchControls() {
  return (
    <div className="relative mt-8 flex h-11 w-full items-center gap-4">
      <button
        type="button"
        className="flex h-11 w-[122px] shrink-0 items-center justify-between rounded-full border border-[#b2b2b2] px-4 text-[14px] leading-5 font-medium text-[#979797]"
      >
        제목 + 내용
        <ChevronDown />
      </button>
      <label className="flex h-11 min-w-0 flex-1 items-center justify-between rounded-full border border-[#b2b2b2] px-4 py-2.5">
        <span className="sr-only">검색어</span>
        <input
          className="min-w-0 flex-1 bg-transparent text-[14px] leading-5 font-medium text-[#1e1e1e] outline-none placeholder:text-[#8c8c8c]"
          placeholder="검색어를 입력하세요."
        />
        <SearchIcon />
      </label>

      <div className="absolute left-0 top-[52px] z-10 h-[172px] w-[122px] rounded-xl bg-[#f0f0f0] shadow-[0_0_4px_rgba(0,0,0,0.25)]">
        {["제목+내용", "제목", "작성자", "내용"].map((label, index) => (
          <button
            key={label}
            type="button"
            className={`flex h-10 w-full items-center px-4 text-left text-[16px] leading-6 font-medium text-[#1e1e1e] ${
              index === 0 ? "pt-1" : ""
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ModeSwitch() {
  return (
    <div className="flex h-8 overflow-hidden rounded-full" aria-label="탐색 대상 선택">
      <Link
        href="/Search_giver"
        aria-current="page"
        className="flex h-8 w-[72px] items-center justify-center rounded-l-full bg-[#333] pl-[18px] pr-[10px] text-[12px] leading-[18px] font-medium text-[#f0f0f0]"
      >
        기버
      </Link>
      <Link
        href="/searchtaker"
        className="flex h-8 w-[72px] items-center justify-center rounded-r-full border border-[#333] bg-[#f0f0f0] pl-[10px] pr-[18px] text-[12px] leading-[18px] font-medium text-[#333]"
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
