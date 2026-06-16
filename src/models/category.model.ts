/**
 * WeddingCategory 비즈니스 로직 모델
 *
 * 타입 정의는 @/types/category.ts에,
 * 이 파일은 카테고리 데이터를 다루는 순수 함수(비즈니스 로직)를 담습니다.
 */

import type { WeddingCategory, PaymentStatus } from '@/types/category'
import type { WeddingItem } from '@/types/item'
import { formatCurrency, formatDate } from '@/lib/notion/parsers'

// ─────────────────────────────────────────────
// 결제 상태 관련
// ─────────────────────────────────────────────

/**
 * 결제 상태를 한국어 레이블로 반환합니다.
 *
 * @example
 * getPaymentStatusLabel('pending') → "대기"
 * getPaymentStatusLabel('partial') → "부분완료"
 * getPaymentStatusLabel('completed') → "결제완료"
 */
export function getPaymentStatusLabel(status: PaymentStatus): string {
  const labelMap: Record<PaymentStatus, string> = {
    pending: '대기',
    partial: '부분완료',
    completed: '결제완료',
  }
  return labelMap[status]
}

/**
 * 결제 상태에 따른 Tailwind CSS 배지 색상 클래스를 반환합니다.
 *
 * @example
 * getPaymentStatusColor('pending') → "bg-gray-100 text-gray-700"
 * getPaymentStatusColor('partial') → "bg-yellow-100 text-yellow-700"
 * getPaymentStatusColor('completed') → "bg-green-100 text-green-700"
 */
export function getPaymentStatusColor(status: PaymentStatus): string {
  const colorMap: Record<PaymentStatus, string> = {
    pending: 'bg-gray-100 text-gray-700',
    partial: 'bg-yellow-100 text-yellow-700',
    completed: 'bg-green-100 text-green-700',
  }
  return colorMap[status]
}

// ─────────────────────────────────────────────
// 금액 / 날짜 포맷
// ─────────────────────────────────────────────

/**
 * 카테고리 총 금액을 원화 형식 문자열로 반환합니다.
 *
 * @example
 * formatCategoryAmount(category) → "₩35,000,000"
 */
export function formatCategoryAmount(category: WeddingCategory): string {
  return formatCurrency(category.totalAmount)
}

/**
 * 계획 지불 예정일을 한국어 날짜 형식으로 반환합니다.
 *
 * @example
 * formatPlannedDate(category) → "2026년 4월 1일"
 * formatPlannedDate(category) → "-" (날짜 없을 시)
 */
export function formatPlannedDate(category: WeddingCategory): string {
  return formatDate(category.plannedPaymentDate)
}

/**
 * 실제 지불 완료일을 한국어 날짜 형식으로 반환합니다.
 *
 * @example
 * formatActualDate(category) → "2026년 6월 16일"
 * formatActualDate(category) → "-" (날짜 없을 시)
 */
export function formatActualDate(category: WeddingCategory): string {
  return formatDate(category.actualPaymentDate)
}

// ─────────────────────────────────────────────
// 진행률 계산
// ─────────────────────────────────────────────

/**
 * 세부 항목 기준 결제 진행률을 퍼센트(0~100)로 계산합니다.
 *
 * @param items - 카테고리에 속하는 세부 항목 목록
 * @param totalBudget - 카테고리 총 예산 (0이면 0% 반환)
 *
 * @example
 * calculatePaymentProgress([item1, item2], 35000000) → 71
 */
export function calculatePaymentProgress(
  items: WeddingItem[],
  totalBudget: number
): number {
  if (totalBudget === 0) return 0
  const paidTotal = items.reduce((sum, item) => sum + item.totalAmount, 0)
  const progress = Math.round((paidTotal / totalBudget) * 100)
  // 0~100 범위로 클램핑
  return Math.min(100, Math.max(0, progress))
}

// ─────────────────────────────────────────────
// 복합 뷰 모델
// ─────────────────────────────────────────────

/**
 * 카테고리와 세부 항목을 합산한 복합 뷰 타입
 */
export interface CategoryWithItems extends WeddingCategory {
  /** 세부 항목 목록 */
  items: WeddingItem[]
  /** 세부 항목 합산 금액 (원) */
  itemsTotalAmount: number
  /** 결제 진행률 (0~100) */
  paymentProgress: number
}

/**
 * WeddingCategory와 WeddingItem 목록을 합쳐 CategoryWithItems를 생성합니다.
 *
 * @param category - WeddingCategory 인스턴스
 * @param items - 해당 카테고리의 세부 항목 목록
 */
export function buildCategoryWithItems(
  category: WeddingCategory,
  items: WeddingItem[]
): CategoryWithItems {
  const itemsTotalAmount = items.reduce(
    (sum, item) => sum + item.totalAmount,
    0
  )
  const paymentProgress = calculatePaymentProgress(
    items,
    category.totalAmount || itemsTotalAmount
  )

  return {
    ...category,
    items,
    itemsTotalAmount,
    paymentProgress,
  }
}
