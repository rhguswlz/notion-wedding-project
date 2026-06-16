/**
 * 글 상세 페이지 스켈레톤 로딩 컴포넌트
 *
 * 포스트 상세 페이지(post/[id]) 로딩 시 표시됩니다.
 * 헤더, 비용 요약 박스, 세부 항목 테이블, 본문 블록을 포함한
 * 전체 페이지 레이아웃을 스켈레톤으로 재현합니다.
 */

import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'

export function PostDetailSkeleton() {
  return (
    <div
      className="py-8 sm:py-12"
      aria-busy="true"
      aria-label="글 상세 내용 로딩 중"
    >
      {/* 뒤로가기 링크 스켈레톤 */}
      <Skeleton className="mb-6 h-5 w-24" />

      <article>
        {/* 글 헤더 스켈레톤 */}
        <header className="mb-8">
          {/* 제목 스켈레톤 */}
          <div className="mb-4 space-y-2">
            <Skeleton className="h-9 w-4/5 sm:h-10" />
            <Skeleton className="h-9 w-3/5 sm:h-10" />
          </div>

          {/* 메타 정보 배지 영역 스켈레톤 */}
          <div className="mb-3 flex flex-wrap items-center gap-3">
            {/* 결제 상태 배지 스켈레톤 */}
            <Skeleton className="h-5 w-20 rounded-full" />
            {/* 예정 결제일 스켈레톤 */}
            <Skeleton className="h-5 w-36" />
            {/* 실제 결제일 스켈레톤 */}
            <Skeleton className="h-5 w-32" />
          </div>

          {/* 설명 스켈레톤 */}
          <div className="space-y-1.5">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
          </div>
        </header>

        <Separator className="mb-8" />

        {/* 총 비용 요약 박스 스켈레톤 */}
        <section className="bg-muted/50 mb-8 rounded-lg p-4 sm:p-6">
          <div className="flex items-center gap-3">
            {/* 아이콘 스켈레톤 */}
            <Skeleton className="h-5 w-5 shrink-0 rounded-sm" />
            <div className="space-y-1">
              {/* 레이블 스켈레톤 */}
              <Skeleton className="h-4 w-16" />
              {/* 금액 스켈레톤 */}
              <Skeleton className="h-8 w-40" />
            </div>
          </div>
        </section>

        {/* 세부 항목 테이블 스켈레톤 */}
        <section className="mb-8">
          {/* 섹션 제목 스켈레톤 */}
          <Skeleton className="mb-4 h-7 w-24" />

          <div className="overflow-hidden rounded-lg border">
            {/* 테이블 헤더 스켈레톤 */}
            <div className="bg-muted/50 border-b px-4 py-3">
              <div className="grid grid-cols-4 gap-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="ml-auto h-4 w-12" />
                <Skeleton className="ml-auto h-4 w-10" />
                <Skeleton className="ml-auto h-4 w-12" />
              </div>
            </div>

            {/* 테이블 행 스켈레톤 (4개) */}
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="border-b px-4 py-3 last:border-0"
                aria-hidden="true"
              >
                <div className="grid grid-cols-4 gap-4">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="ml-auto h-4 w-20" />
                  <Skeleton className="ml-auto h-4 w-8" />
                  <Skeleton className="ml-auto h-4 w-24" />
                </div>
              </div>
            ))}

            {/* 테이블 합계 행 스켈레톤 */}
            <div className="bg-muted/50 border-t-2 px-4 py-3">
              <div className="grid grid-cols-4 gap-4">
                <Skeleton className="h-4 w-12" />
                <span className="col-span-2" aria-hidden="true" />
                <Skeleton className="ml-auto h-5 w-28" />
              </div>
            </div>
          </div>
        </section>

        {/* 본문 블록(경험 후기) 스켈레톤 */}
        <section>
          {/* 섹션 제목 스켈레톤 */}
          <Skeleton className="mb-6 h-7 w-28" />

          {/* 단락 블록 스켈레톤 */}
          <div className="space-y-6">
            {/* 첫 번째 단락 */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-4/5" />
            </div>

            {/* 두 번째 단락 */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>

            {/* 소제목 스켈레톤 */}
            <Skeleton className="h-6 w-48" />

            {/* 세 번째 단락 */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-2/3" />
            </div>

            {/* 인용구 스켈레톤 */}
            <div className="border-border border-l-4 pl-4">
              <Skeleton className="h-5 w-5/6" />
            </div>
          </div>
        </section>
      </article>
    </div>
  )
}
