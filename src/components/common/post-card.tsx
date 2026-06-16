/**
 * 포스트 카드 컴포넌트
 *
 * 홈, 카테고리, 검색 결과 페이지에서 웨딩 비용 포스트를 카드 형태로 표시합니다.
 * PostSummary 타입을 입력받아 카드 UI를 렌더링합니다.
 */

import Link from 'next/link'
import { CalendarDays, CreditCard, Package } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  formatCurrency,
  formatDate,
  getPaymentStatusLabel,
  getPaymentStatusColor,
  cn,
} from '@/lib/utils'
import type { PostSummary } from '@/types/post'

interface PostCardProps {
  post: PostSummary
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/post/${post.id}`}
      className="group focus-visible:ring-ring block h-full rounded-xl focus-visible:ring-2 focus-visible:outline-none"
      aria-label={`${post.title} 포스트 보기`}
    >
      <Card className="h-full gap-4 transition-all duration-200 group-hover:scale-[1.01] group-hover:shadow-md">
        <CardHeader className="pb-0">
          {/* 카테고리명 + 결제 상태 배지 */}
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg">{post.title}</CardTitle>
            <Badge
              className={cn(
                'shrink-0 text-xs',
                getPaymentStatusColor(post.paymentStatus)
              )}
            >
              {getPaymentStatusLabel(post.paymentStatus)}
            </Badge>
          </div>

          {/* 카테고리 설명 */}
          <p className="text-muted-foreground text-sm">{post.description}</p>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* 총 금액 */}
          <div className="flex items-center gap-2">
            <CreditCard
              className="text-muted-foreground h-4 w-4 shrink-0"
              aria-hidden="true"
            />
            <span className="text-foreground text-xl font-bold">
              {formatCurrency(post.totalAmount)}
            </span>
          </div>

          {/* 날짜 정보 */}
          <div className="space-y-1.5">
            {/* 예정 결제일 */}
            <div className="flex items-center gap-2">
              <CalendarDays
                className="text-muted-foreground h-3.5 w-3.5 shrink-0"
                aria-hidden="true"
              />
              <span className="text-muted-foreground text-xs">
                예정일: {formatDate(post.plannedPaymentDate)}
              </span>
            </div>

            {/* 실제 결제일 (완료된 경우에만 표시) */}
            {post.actualPaymentDate && (
              <div className="flex items-center gap-2">
                <CalendarDays
                  className="h-3.5 w-3.5 shrink-0 text-green-600 dark:text-green-400"
                  aria-hidden="true"
                />
                <span className="text-xs text-green-700 dark:text-green-400">
                  완료일: {formatDate(post.actualPaymentDate)}
                </span>
              </div>
            )}
          </div>

          {/* 항목 수 */}
          {post.itemIds.length > 0 && (
            <div className="flex items-center gap-2">
              <Package
                className="text-muted-foreground h-3.5 w-3.5 shrink-0"
                aria-hidden="true"
              />
              <span className="text-muted-foreground text-xs">
                {post.itemIds.length}개 항목
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
