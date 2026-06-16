/**
 * 빈 상태 컴포넌트
 *
 * 검색 결과나 카테고리 포스트가 없을 때 표시하는 빈 상태 UI입니다.
 */

import { FileSearch } from 'lucide-react'

interface EmptyStateProps {
  /** 빈 상태 안내 메시지 */
  message?: string
}

export function EmptyState({
  message = '표시할 항목이 없습니다.',
}: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 text-center"
      role="status"
      aria-live="polite"
    >
      {/* 빈 상태 아이콘 */}
      <FileSearch
        className="text-muted-foreground/40 mb-4 h-16 w-16"
        aria-hidden="true"
      />

      {/* 안내 메시지 */}
      <p className="text-muted-foreground text-base">{message}</p>
    </div>
  )
}
