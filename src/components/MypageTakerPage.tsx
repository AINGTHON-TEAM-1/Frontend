import Image from "next/image";
import { SiteHeader } from "./SiteHeader";

const dashboardItems = [
  { label: "요청한 협업", value: "000건+" },
  { label: "제안받은 솔루션", value: "000건+" },
  { label: "완료한 솔루션", value: "000건+" },
];

export default function MypageTakerPage() {
  return (
    <main
      className="min-h-screen bg-[#f0f0f0] font-sans text-[#1e1e1e] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      data-node-id="71:1098"
    >
      <SiteHeader role="taker" active="mypage" />

      <section className="mx-auto min-h-[808px] w-full max-w-[1280px] bg-[#f0f0f0]">
        <div className="w-full px-[45px] pt-[66px]">
          <h1 className="text-[24px] leading-[34px] font-extrabold">
            나의 프로필
          </h1>

          <section className="mt-[18px] flex h-28 items-center gap-4 rounded-2xl bg-[#f0f0f0] px-[23px] py-6 shadow-[0_0_4px_rgba(0,0,0,0.25)]">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#ccc] p-2">
              <Image
                src="/figma/my-icon.svg"
                alt=""
                width={48}
                height={48}
                className="size-12"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-2">
                  <p className="text-[18px] leading-[26px] font-bold whitespace-nowrap">
                    홍길동
                  </p>
                  <span className="rounded-full bg-[#165a28] px-3 py-1 text-[11px] leading-[14px] font-medium text-[#34a853]">
                    테이커
                  </span>
                </div>
                <button
                  type="button"
                  className="shrink-0 rounded-full bg-[#424242] px-[14px] py-1 text-[11px] leading-[14px] font-medium text-[#b2b2b2]"
                >
                  프로필 이미지 변경
                </button>
              </div>
              <p className="text-[14px] leading-5 font-medium">
                abcd1234@inha.edu
              </p>
            </div>
          </section>

          <h2 className="mt-[64px] text-[24px] leading-[34px] font-extrabold">
            나의 대시보드
          </h2>

          <section className="mt-[23px] grid grid-cols-3 gap-[18px]">
            {dashboardItems.map((item) => (
              <article
                key={item.label}
                className="flex h-[138px] flex-col items-center justify-center rounded-2xl bg-[#f0f0f0] px-[37px] py-[25px] text-center shadow-[0_0_4px_rgba(0,0,0,0.25)]"
              >
                <p className="text-[20px] leading-[30px] font-bold">
                  {item.label}
                </p>
                <p className="mt-1 text-[36px] leading-[48px] font-extrabold">
                  {item.value}
                </p>
              </article>
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}
