import Image from "next/image";
import Link from "next/link";

const menuItems = [
  { label: "홈", href: "/mainpage_home_giver" },
  { label: "탐색", href: "/Search_giver", active: true },
  { label: "마이페이지", href: "#" },
];

const cards = [
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

function ProfileIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4 shrink-0"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M8 8.2a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6Zm-5 4.42c0-2.03 2.12-3.32 5-3.32s5 1.29 5 3.32c0 .43-.35.78-.78.78H3.78A.78.78 0 0 1 3 12.62Z"
        fill="#1e1e1e"
      />
    </svg>
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
    <article className="overflow-hidden rounded-2xl bg-[#f0f0f0] shadow-[0_0_8px_rgba(0,0,0,0.25)]">
      <div className="flex h-10 items-center gap-1 px-4 pt-3 pb-[10px] shadow-[0_0_4px_rgba(0,0,0,0.25)]">
        <ProfileIcon />
        <span className="text-[12px] leading-[18px] font-medium text-[#1e1e1e]">
          {author}
        </span>
      </div>

      <div className="relative h-[119px] w-full">
        <Image src={image} alt="" fill sizes="265px" className="object-cover" />
      </div>

      <div className="min-h-[88px] px-4 pt-4 pb-[18px] shadow-[0_0_4px_rgba(0,0,0,0.25)]">
        <h2 className="text-[16px] leading-[24px] font-bold text-[#1e1e1e]">
          {title}
        </h2>
        <div className="mt-2 flex gap-2">
          <span className="rounded-full bg-[#333] px-3 py-1 text-[11px] leading-[14px] font-medium whitespace-nowrap text-[#f0f0f0]">
            ~2026.00.00
          </span>
          <span className="rounded-full bg-[#333] px-3 py-1 text-[11px] leading-[14px] font-medium whitespace-nowrap text-[#f0f0f0]">
            000명 모집
          </span>
        </div>
      </div>
    </article>
  );
}

export default function SearchGiverPage() {
  return (
    <main
      className="min-h-screen bg-[#f0f0f0] font-sans text-[#1e1e1e] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      data-node-id="36:665"
    >
      <section className="mx-auto min-h-screen w-full max-w-[1280px] bg-[#f0f0f0]">
        <header className="sticky top-0 z-10 flex h-20 items-center justify-between bg-[#f0f0f0] px-[45px] shadow-[0_0_4px_rgba(0,0,0,0.25)]">
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

        <div className="px-5 pt-12 pb-16 md:px-20">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <h1 className="text-[24px] leading-[34px] font-extrabold text-[#1e1e1e]">
              현재 이런 테이커들이 기버를 모집하고 있어요
            </h1>

            <div
              className="flex h-8 w-fit overflow-hidden rounded-full"
              aria-label="탐색 대상 선택"
            >
              <Link
                href="/Search_giver"
                aria-current="page"
                className="flex h-8 w-[72px] items-center justify-center rounded-l-full bg-[#333] pl-[18px] pr-[10px] text-center text-[12px] leading-[18px] font-medium whitespace-nowrap text-[#f0f0f0]"
              >
                기버
              </Link>
              <Link
                href="/searchtaker"
                className="flex h-8 w-[72px] items-center justify-center rounded-r-full border border-[#333] bg-[#f0f0f0] pl-[10px] pr-[18px] text-center text-[12px] leading-[18px] font-medium whitespace-nowrap text-[#333]"
              >
                테이커
              </Link>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-x-[20px] gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => (
              <JobCard key={`${card.author}-${card.title}`} {...card} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
