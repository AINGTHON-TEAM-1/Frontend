import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/AuthContext";

export const metadata: Metadata = {
  title: "온보딩 질문",
  description: "서비스 사용 목적을 선택하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
