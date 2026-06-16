/**
 * 웨딩 비용 세부 항목 타입 정의
 *
 * Notion "Items" 데이터베이스 스키마 (실제 확인된 구조):
 * DB ID: 38151c2c-b673-8131-8767-000b711d1aa3
 *
 * 프로퍼티:
 * - 항목명 (title):    항목 이름 (예: 드레스, 메이크업, 식대, 대관료)
 * - 단가 (number):     항목 단위 가격 (단위: 원)
 * - 수량 (number):     항목 수량
 * - 금액 (formula):    합산 금액 = 단가 × 수량 (수식 자동 계산)
 * - Category (relation): 소속 카테고리 페이지 참조 (Category DB)
 */

/**
 * Notion Items DB 레코드를 정규화한 세부 항목 타입
 *
 * Notion 원본 필드명 → 정규화된 필드명 매핑:
 * - 항목명(title)      → name
 * - 단가(number)       → unitPrice
 * - 수량(number)       → quantity
 * - 금액(formula)      → totalAmount
 * - Category(relation) → categoryId
 */
export interface WeddingItem {
  /** Notion 페이지 ID */
  id: string
  /** 항목명 (예: 드레스, 메이크업, 식대, 대관료) */
  name: string
  /** 단가 (원) */
  unitPrice: number
  /** 수량 */
  quantity: number
  /** 합산 금액 = 단가 × 수량 (원) - Notion formula 필드에서 계산 */
  totalAmount: number
  /** 소속 카테고리 Notion 페이지 ID (없으면 null) */
  categoryId: string | null
}
