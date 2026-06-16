/**
 * WeddingItem 비즈니스 로직 모델
 *
 * 타입 정의는 @/types/item.ts에,
 * 이 파일은 세부 항목 데이터를 다루는 순수 함수(비즈니스 로직)를 담습니다.
 */

import type { WeddingItem } from '@/types/item'
import { formatCurrency } from '@/lib/notion/parsers'

// ─────────────────────────────────────────────
// 금액 계산
// ─────────────────────────────────────────────

/**
 * 단가와 수량으로 합산 금액을 계산합니다.
 *
 * Notion formula 필드가 없거나 신뢰하기 어려울 때 클라이언트에서 직접 계산합니다.
 *
 * @example
 * calculateItemTotal(100000, 250) → 25000000
 */
export function calculateItemTotal(
  unitPrice: number,
  quantity: number
): number {
  return unitPrice * quantity
}

/**
 * 세부 항목의 단가를 원화 형식으로 반환합니다.
 *
 * @example
 * formatItemUnitPrice(item) → "₩100,000"
 */
export function formatItemUnitPrice(item: WeddingItem): string {
  return formatCurrency(item.unitPrice)
}

/**
 * 세부 항목의 합산 금액을 원화 형식으로 반환합니다.
 *
 * @example
 * formatItemTotalAmount(item) → "₩25,000,000"
 */
export function formatItemTotalAmount(item: WeddingItem): string {
  return formatCurrency(item.totalAmount)
}

// ─────────────────────────────────────────────
// 그룹 / 집계
// ─────────────────────────────────────────────

/**
 * 세부 항목 목록을 카테고리 ID 기준으로 그룹화합니다.
 *
 * @param items - 전체 세부 항목 목록
 * @returns 카테고리 ID를 키로 하는 그룹 객체
 *
 * @example
 * groupItemsByCategoryId([item1, item2, item3])
 * → { "cat-id-1": [item1, item2], "cat-id-2": [item3] }
 */
export function groupItemsByCategoryId(
  items: WeddingItem[]
): Record<string, WeddingItem[]> {
  return items.reduce<Record<string, WeddingItem[]>>((acc, item) => {
    const key = item.categoryId ?? '__no_category__'
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(item)
    return acc
  }, {})
}

/**
 * 세부 항목 목록의 합산 금액을 합계냅니다.
 *
 * @param items - 세부 항목 목록
 * @returns 합산 금액 합계 (원)
 *
 * @example
 * sumItemAmounts([item1, item2]) → 35000000
 */
export function sumItemAmounts(items: WeddingItem[]): number {
  return items.reduce((sum, item) => sum + item.totalAmount, 0)
}

/**
 * 세부 항목 목록을 금액 내림차순으로 정렬합니다.
 *
 * @param items - 세부 항목 목록 (원본 배열을 변경하지 않음)
 * @returns 정렬된 새 배열
 */
export function sortItemsByAmount(items: WeddingItem[]): WeddingItem[] {
  return [...items].sort((a, b) => b.totalAmount - a.totalAmount)
}
