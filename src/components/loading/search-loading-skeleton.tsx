/**
 * 검색 결과 로딩 스켈레톤 컴포넌트
 *
 * 검색 페이지(search)에서 결과 로딩 시 표시됩니다.
 * 검색창, 결과 수 요약 텍스트, 결과 카드 그리드를 스켈레톤으로 표현합니다.
 * count prop으로 표시할 결과 카드 개수를 조절할 수 있습니다.
 */

import { Skeleton } from '@/components/ui/skeleton'
import { PostCardSkeleton } from './post-card-skeleton'

interface SearchLoadingSkeletonProps {
  /** 표시할 결과 카드 스켈레톤 개수 (기본값: 3) */
  count?: number
}

export function SearchLoadingSkeleton({
  count = 3,
}: SearchLoadingSkeletonProps) {
  return (
    <div aria-busy="true" aria-label="검색 결과 로딩 중">
      {/* 검색창 스켈레톤 */}
      <section className="mb-8" aria-hidden="true">
        <Skeleton className="h-10 w-full rounded-lg" />
      </section>

      {/* 검색 결과 요약 텍스트 스켈레톤 */}
      <div className="mb-6 flex items-center gap-1.5" aria-hidden="true">
        {/* "키워드" 부분 */}
        <Skeleton className="h-4 w-24 rounded-sm" />
        {/* "검색 결과:" 부분 */}
        <Skeleton className="h-4 w-16 rounded-sm" />
        {/* 결과 수 */}
        <Skeleton className="h-4 w-8 rounded-sm" />
      </div>

      {/* 결과 카드 그리드 스켈레톤 */}
      <section aria-hidden="true">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: count }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>
      </section>
    </div>
  )
}
