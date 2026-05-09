import Image from "next/image";
import Link from "next/link";

const loginOptions = [
  {
    label: "Google 계정으로 로그인",
    icon: "/figma/google-logo.svg",
    iconAlt: "Google",
    iconSize: 20,
    className: "border-[#f7f7f7] bg-white text-[#121212]",
  },
  {
    label: "네이버 계정으로 로그인",
    icon: "/figma/naver-logo.svg",
    iconAlt: "Naver",
    iconSize: 18,
    className: "border-[#bebebe] bg-[#34a853] text-[#f0f0f0]",
  },
  {
    label: "카카오 계정으로 로그인",
    icon: "/figma/kakao-logo.svg",
    iconAlt: "Kakao",
    iconSize: 24,
    className: "border-[#bebebe] bg-[#fbd205] text-[#1e1e1e]",
  },
];

export function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f0f0f0] font-sans text-[#1e1e1e] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <section className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col items-center px-5 pt-[clamp(96px,23.25vh,186px)]">
        <Image
          src="/figma/service-logo.svg"
          alt="서비스 로고"
          width={96}
          height={96}
          className="size-[96px] shrink-0"
          priority
        />

        <h1 className="mt-[18px] text-center text-[20px] leading-[28px] font-extrabold tracking-normal">
          서비스 이름 및 설명을 입력해 주세요
        </h1>

        <div className="mt-[132px] flex w-full max-w-[550px] flex-col gap-3">
          {loginOptions.map((option) => (
            <Link
              key={option.label}
              href="/signup"
              className={`relative flex h-[52px] w-full items-center justify-center rounded-[8px] border border-solid px-16 text-center text-[16px] leading-[24px] font-bold tracking-normal drop-shadow-[0_0_1px_rgba(18,18,18,0.25)] transition-[filter,transform] hover:brightness-[0.98] active:translate-y-px ${option.className}`}
            >
              <Image
                src={option.icon}
                alt={option.iconAlt}
                width={option.iconSize}
                height={option.iconSize}
                className="absolute top-1/2 left-5 -translate-y-1/2"
                style={{ width: option.iconSize, height: option.iconSize }}
              />
              {option.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
