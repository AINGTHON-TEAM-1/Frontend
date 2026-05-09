import Image from "next/image";
import Link from "next/link";

const menuItems = [
  { label: "홈", href: "/mainpage_home_giver", active: true },
  { label: "탐색", href: "/Search_giver" },
  { label: "마이페이지", href: "#" },
];

export default function MainpageHomeGiverPage() {
  return (
    <main
      className="min-h-screen bg-[#f0f0f0] font-sans text-[#1e1e1e] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      data-node-id="10:816"
    >
      <section className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col">
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

        <div className="flex flex-1 items-end justify-center px-[45px] pb-[102px]">
          <button
            type="button"
            className="h-[44px] w-full max-w-[550px] rounded-full bg-[#1e1e1e] px-4 text-center text-[16px] leading-[24px] font-medium text-[#f0f0f0]"
          >
            글쓰기
          </button>
        </div>
      </section>
    </main>
  );
}
