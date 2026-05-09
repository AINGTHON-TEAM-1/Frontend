import Image from "next/image";
import Link from "next/link";

const menuItems = [
  { label: "홈", href: "/mainpage_home_taker", active: true },
  { label: "탐색", href: "/searchtaker" },
  { label: "마이페이지", href: "#" },
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
      <section className="relative mx-auto min-h-screen w-full max-w-[1280px] overflow-hidden bg-[#f0f0f0]">
        <HomeBackground />

        <header className="relative z-10 flex h-20 items-center justify-between bg-[#f0f0f0] px-[45px] shadow-[0_0_4px_rgba(0,0,0,0.25)]">
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
            href="#"
            className="mt-[86px] flex h-16 w-full max-w-[550px] items-center justify-center rounded-full bg-[#1e1e1e] px-4 text-center text-[20px] leading-[30px] font-bold text-[#f0f0f0]"
          >
            내 커뮤니티 정보 업로드하기
          </Link>
        </div>
      </section>
    </main>
  );
}
