import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3004'
  ),
  title: '웨딩 비용 정리 블로그',
  description:
    'Notion CMS 기반 웨딩 비용 카테고리별 정리 블로그. 예식장, 스드메, 예물, 하객 선물, 신혼살림, 허니문 비용을 공유합니다.',
  keywords: [
    '웨딩 비용',
    '결혼식 예산',
    '예식장',
    '스드메',
    '예물',
    '하객 선물',
    '신혼살림',
    '허니문',
    '웨딩 정보',
  ],
  authors: [{ name: 'Wedding Blog' }],
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  openGraph: {
    title: '웨딩 비용 정리 블로그',
    description:
      'Notion CMS 기반 웨딩 비용 카테고리별 정리 블로그. 예식장, 스드메, 예물, 하객 선물, 신혼살림, 허니문 비용을 공유합니다.',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3004',
    siteName: '웨딩 비용 정리 블로그',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '웨딩 비용 정리 블로그',
    description:
      'Notion CMS 기반 웨딩 비용 카테고리별 정리 블로그. 예식장, 스드메, 예물, 하객 선물, 신혼살림, 허니문 비용을 공유합니다.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* 전체 레이아웃 구조: 헤더 → 본문 → 푸터 */}
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
