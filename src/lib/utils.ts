import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { PaymentStatus } from '@/types/category'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 금액을 한국 원화 형식으로 포맷합니다.
 * 예: 35000000 → "35,000,000원"
 */
export function formatCurrency(amount: number): string {
  return `${amount.toLocaleString('ko-KR')}원`
}

/**
 * ISO 8601 날짜 문자열을 한국어 날짜 형식으로 포맷합니다.
 * 예: "2026-04-01" → "2026년 4월 1일"
 * null인 경우 "-" 반환
 */
export function formatDate(dateString: string | null): string {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * 결제 상태를 한국어 레이블로 변환합니다.
 */
export function getPaymentStatusLabel(status: PaymentStatus): string {
  const labels: Record<PaymentStatus, string> = {
    pending: '대기',
    partial: '부분완료',
    completed: '결제완료',
  }
  return labels[status]
}

/**
 * 결제 상태에 따른 Badge 색상 클래스를 반환합니다.
 * shadcn Badge 컴포넌트의 className에 적용합니다.
 */
export function getPaymentStatusColor(status: PaymentStatus): string {
  const colors: Record<PaymentStatus, string> = {
    pending:
      'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800',
    partial:
      'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
    completed:
      'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
  }
  return colors[status]
}
