/**
 * 포스트 목록 스켈레톤 로딩 컴포넌트
 *
 * 홈 페이지 및 카테고리 페이지에서 포스트 목록 로딩 시 표시됩니다.
 * 검색창, 카테고리 필터, 그리드 형식의 카드 스켈레톤을 포함합니다.
 * count prop으로 표시할 스켈레톤 카드 개수를 조절할 수 있습니다.
 */

import { Skeleton } from '@/components/ui/skeleton'
import { PostCardSkeleton } from './post-card-skeleton'

interface PostListSkeletonProps {
  /** 표시할 스켈레톤 카드 개수 (기본값: 6) */
  count?: number
  /** 검색창 스켈레톤 표시 여부 (기본값: false) */
  showSearch?: boolean
  /** 카테고리 필터 스켈레톤 표시 여부 (기본값: false) */
  showFilter?: boolean
}

export function PostListSkeleton({
  count = 6,
  showSearch = false,
  showFilter = false,
}: PostListSkeletonProps) {
  return (
    <div aria-busy="true" aria-label="포스트 목록 로딩 중">
      {/* 검색창 스켈레톤 */}
      {showSearch && (
        <div className="mb-6">
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      )}

      {/* 카테고리 필터 스켈레톤 */}
      {showFilter && (
        <div className="mb-8 flex flex-wrap gap-2">
          {/* 전체 버튼 포함 5개의 필터 탭 스켈레톤 */}
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-8 rounded-full"
              style={{ width: `${60 + index * 12}px` }}
              aria-hidden="true"
            />
          ))}
        </div>
      )}

      {/* 포스트 카드 그리드 스켈레톤 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}
