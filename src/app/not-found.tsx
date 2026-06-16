/**
 * 404 페이지를 찾을 수 없음 에러 페이지
 *
 * 존재하지 않는 URL에 접근했을 때 표시됩니다.
 * 웨딩 테마 아이콘과 함께 홈으로 돌아가는 안내를 제공합니다.
 */

import Link from 'next/link'
import { Heart, Home, Gem } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <Container size="sm">
        <div
          className="flex flex-col items-center text-center"
          role="main"
          aria-labelledby="not-found-title"
        >
          {/* 웨딩 테마 아이콘 장식 영역 */}
          <div
            className="mb-8 flex items-center justify-center gap-3"
            aria-hidden="true"
          >
            <Gem className="text-muted-foreground/40 h-8 w-8 -rotate-12" />
            <div className="bg-muted flex h-20 w-20 items-center justify-center rounded-full sm:h-24 sm:w-24">
              <Heart
                className="text-muted-foreground h-10 w-10 sm:h-12 sm:w-12"
                strokeWidth={1.5}
              />
            </div>
            <Gem className="text-muted-foreground/40 h-8 w-8 rotate-12" />
          </div>

          {/* 에러 코드 */}
          <p className="text-muted-foreground/60 mb-2 text-sm font-medium tracking-widest uppercase">
            오류 404
          </p>

          {/* 에러 타이틀 */}
          <h1
            id="not-found-title"
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            페이지를 찾을 수 없어요
          </h1>

          {/* 에러 설명 */}
          <p className="text-muted-foreground mb-2 max-w-md text-base leading-relaxed sm:text-lg">
            요청하신 페이지가 존재하지 않거나 이동되었습니다.
          </p>
          <p className="text-muted-foreground mb-10 max-w-md text-sm leading-relaxed">
            주소를 다시 확인하시거나 홈으로 돌아가 원하시는 웨딩 비용 정보를
            찾아보세요.
          </p>

          {/* 홈으로 돌아가기 버튼 */}
          <Button asChild size="lg" className="gap-2">
            <Link href="/" aria-label="홈 페이지로 돌아가기">
              <Home className="h-4 w-4" aria-hidden="true" />
              홈으로 돌아가기
            </Link>
          </Button>

          {/* 하단 구분 링크 */}
          <div className="mt-8 flex items-center gap-4 text-sm">
            <Link
              href="/search"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="검색 페이지로 이동"
            >
              검색하기
            </Link>
            <span className="text-muted-foreground/40" aria-hidden="true">
              ·
            </span>
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="카테고리 목록으로 이동"
            >
              카테고리 보기
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
