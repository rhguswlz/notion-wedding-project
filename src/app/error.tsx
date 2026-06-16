'use client'

/**
 * 500 서버 에러 페이지
 *
 * Next.js의 error.tsx는 클라이언트 컴포넌트여야 합니다.
 * 예상치 못한 런타임 에러 발생 시 표시되며,
 * "다시 시도" 및 "홈으로 돌아가기" 버튼으로 복구 경로를 안내합니다.
 */

import Link from 'next/link'
import { AlertCircle, Home, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'

interface ErrorPageProps {
  /** Next.js가 주입하는 에러 객체 */
  error: Error & { digest?: string }
  /** 현재 페이지를 다시 렌더링 시도하는 함수 */
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <Container size="sm">
        <div
          className="flex flex-col items-center text-center"
          role="main"
          aria-labelledby="error-title"
        >
          {/* 에러 아이콘 영역 */}
          <div
            className="mb-8 flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="bg-destructive/10 flex h-20 w-20 items-center justify-center rounded-full sm:h-24 sm:w-24">
              <AlertCircle
                className="text-destructive h-10 w-10 sm:h-12 sm:w-12"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* 에러 코드 */}
          <p className="text-muted-foreground/60 mb-2 text-sm font-medium tracking-widest uppercase">
            오류 500
          </p>

          {/* 에러 타이틀 */}
          <h1
            id="error-title"
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            오류가 발생했어요
          </h1>

          {/* 에러 설명 */}
          <p className="text-muted-foreground mb-2 max-w-md text-base leading-relaxed sm:text-lg">
            페이지를 불러오는 중 예상치 못한 오류가 발생했습니다.
          </p>
          <p className="text-muted-foreground mb-3 max-w-md text-sm leading-relaxed">
            잠시 후 다시 시도하거나 홈 페이지로 돌아가 이용해 주세요.
          </p>

          {/* 에러 상세 정보 (digest가 있을 경우에만 표시) */}
          {error.digest && (
            <p className="text-muted-foreground/50 mb-8 text-xs">
              오류 코드: {error.digest}
            </p>
          )}

          {/* 에러 복구 안내 메시지 */}
          <div
            className="bg-muted mb-10 w-full max-w-sm rounded-lg px-4 py-3"
            role="note"
            aria-label="에러 복구 안내"
          >
            <ul className="text-muted-foreground space-y-1 text-left text-sm">
              <li className="flex items-start gap-2">
                <span aria-hidden="true">1.</span>
                <span>
                  &quot;다시 시도&quot; 버튼을 눌러 페이지를 새로고침해 보세요
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true">2.</span>
                <span>문제가 지속된다면 잠시 후 다시 접속해 보세요</span>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true">3.</span>
                <span>홈으로 돌아가 다른 카테고리를 확인해 보세요</span>
              </li>
            </ul>
          </div>

          {/* 액션 버튼 영역 */}
          <div className="flex flex-col gap-3 sm:flex-row">
            {/* 다시 시도 버튼 - TODO: reset() 로직 연결 필요 */}
            <Button
              onClick={() => reset()}
              size="lg"
              className="gap-2"
              aria-label="현재 페이지 다시 시도"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              다시 시도
            </Button>

            {/* 홈으로 돌아가기 버튼 */}
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/" aria-label="홈 페이지로 돌아가기">
                <Home className="h-4 w-4" aria-hidden="true" />
                홈으로 돌아가기
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
