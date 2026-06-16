/**
 * 포스트 카드 스켈레톤 로딩 컴포넌트
 *
 * PostCard 컴포넌트와 동일한 레이아웃 구조로 구성된 로딩 플레이스홀더입니다.
 * 데이터 로딩 중에 카드 형태의 스켈레톤 UI를 표시합니다.
 * animate-pulse 효과로 로딩 상태를 시각적으로 전달합니다.
 */

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function PostCardSkeleton() {
  return (
    <Card
      className="h-full gap-4"
      aria-busy="true"
      aria-label="포스트 카드 로딩 중"
    >
      <CardHeader className="pb-0">
        {/* 제목 + 배지 스켈레톤 */}
        <div className="flex items-start justify-between gap-2">
          {/* 제목 스켈레톤 */}
          <Skeleton className="h-6 w-3/4" />
          {/* 결제 상태 배지 스켈레톤 */}
          <Skeleton className="h-5 w-16 shrink-0 rounded-full" />
        </div>

        {/* 설명 스켈레톤 - 두 줄 */}
        <div className="space-y-1.5 pt-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* 총 금액 스켈레톤 */}
        <div className="flex items-center gap-2">
          {/* 아이콘 스켈레톤 */}
          <Skeleton className="h-4 w-4 shrink-0 rounded-sm" />
          {/* 금액 텍스트 스켈레톤 */}
          <Skeleton className="h-7 w-32" />
        </div>

        {/* 날짜 정보 스켈레톤 */}
        <div className="space-y-1.5">
          {/* 예정 결제일 스켈레톤 */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-3.5 w-3.5 shrink-0 rounded-sm" />
            <Skeleton className="h-3.5 w-40" />
          </div>
          {/* 실제 결제일 스켈레톤 */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-3.5 w-3.5 shrink-0 rounded-sm" />
            <Skeleton className="h-3.5 w-36" />
          </div>
        </div>

        {/* 항목 수 스켈레톤 */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-3.5 w-3.5 shrink-0 rounded-sm" />
          <Skeleton className="h-3.5 w-20" />
        </div>
      </CardContent>
    </Card>
  )
}
