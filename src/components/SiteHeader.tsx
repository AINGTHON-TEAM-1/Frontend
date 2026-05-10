import Image from "next/image";
import Link from "next/link";

type Role = "giver" | "taker";
type Active = "home" | "search" | "mypage";

const ROLE_CONFIG: Record<
  Role,
  {
    label: string;
    badgeClass: string;
    profileIcon: string;
    home: string;
    search: string;
    searchLabel: string;
    mypage: string;
  }
> = {
  giver: {
    label: "기버",
    badgeClass: "bg-[#1e1e1e] text-[#f0f0f0]",
    profileIcon: "/figma/giver-icon.png",
    home: "/mainpage_home_giver",
    search: "/Search_giver",
    searchLabel: "테이커 찾기",
    mypage: "/mypage_giver",
  },
  taker: {
    label: "테이커",
    badgeClass: "bg-[#34a853] text-[#f0f0f0]",
    profileIcon: "/figma/taker-icon.png",
    home: "/mainpage_home_taker",
    search: "/searchtaker",
    searchLabel: "기버 찾기",
    mypage: "/mypagetaker",
  },
};

interface SiteHeaderProps {
  role: Role;
  active?: Active;
}

export function SiteHeader({ role, active }: SiteHeaderProps) {
  const config = ROLE_CONFIG[role];
  const items: { key: Active; label: string; href: string }[] = [
    { key: "home", label: "홈", href: config.home },
    { key: "search", label: config.searchLabel, href: config.search },
    { key: "mypage", label: "마이페이지", href: config.mypage },
  ];

  return (
    <header className="sticky top-0 z-20 flex h-20 w-full items-center justify-between bg-[#f0f0f0] px-[45px] shadow-[0_0_4px_rgba(0,0,0,0.25)]">
      <div className="absolute left-[45px] flex items-center gap-3">
        <Link
          href={config.home}
          aria-label="Well:Com 홈으로"
          className="flex items-center transition-opacity hover:opacity-80"
        >
          <Image
            src="/figma/well-com-logo.png"
            alt="Well:Com"
            width={200}
            height={32}
            priority
            className="h-8 w-auto"
          />
        </Link>
        <span
          className={`rounded-full px-3 py-1 text-[12px] leading-[16px] font-bold ${config.badgeClass}`}
        >
          {config.label}
        </span>
      </div>

      <nav className="mx-auto flex items-center gap-20">
        {items.map((item) => {
          const isActive = item.key === active;
          return (
            <Link
              key={item.key}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`text-[16px] leading-[24px] ${
                isActive ? "font-bold" : "font-medium"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="absolute right-[45px] flex items-center gap-4">
        <Link
          href={config.mypage}
          className="flex size-9 items-center justify-center"
          aria-label="마이페이지"
        >
          <Image
            src={config.profileIcon}
            alt=""
            width={28}
            height={28}
            className="size-7 object-contain"
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
