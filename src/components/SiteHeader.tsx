import Image from "next/image";
import Link from "next/link";

type Role = "giver" | "taker";
type Active = "home" | "search" | "mypage";

const NAV: Record<Role, { home: string; search: string; mypage: string }> = {
  giver: {
    home: "/mainpage_home_giver",
    search: "/Search_giver",
    mypage: "/mypage_giver",
  },
  taker: {
    home: "/mainpage_home_taker",
    search: "/searchtaker",
    mypage: "/mypagetaker",
  },
};

interface SiteHeaderProps {
  role: Role;
  active?: Active;
}

export function SiteHeader({ role, active }: SiteHeaderProps) {
  const links = NAV[role];
  const items: { key: Active; label: string; href: string }[] = [
    { key: "home", label: "홈", href: links.home },
    { key: "search", label: "탐색", href: links.search },
    { key: "mypage", label: "마이페이지", href: links.mypage },
  ];

  return (
    <header className="sticky top-0 z-20 flex h-20 w-full items-center justify-between bg-[#f0f0f0] px-[45px] shadow-[0_0_4px_rgba(0,0,0,0.25)]">
      <Link
        href={links.home}
        aria-label="Well:Com 홈으로"
        className="absolute left-[45px] flex items-center transition-opacity hover:opacity-80"
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
          href={links.mypage}
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
