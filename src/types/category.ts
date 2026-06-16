/**
 * 웨딩 비용 카테고리 타입 정의
 *
 * Notion "Category" 데이터베이스 스키마:
 * DB ID: 38151c2c-b673-8154-928e-000b72fda882
 *
 * 프로퍼티:
 * - 대분류   (title):    카테고리명 (예: 예식장, 스드메)
 * - 계획금액 (date):     계획 지불 예정일 (ISO 8601)
 * - 지금금액 (date):     실제 지불 완료일 (ISO 8601)
 * - 상태     (status):   결제 상태 ("대기" | "부분완료" | "결제완료")
 * - 총금액   (number):   카테고리 전체 합산 금액 (단위: 원)
 * - Items    (relation): 해당 카테고리의 세부 항목 ID 목록
 */

/** Notion 결제 상태 값 (Notion에서 직접 사용하는 한국어 값) */
export type NotionPaymentStatus = '대기' | '부분완료' | '결제완료'

/** 내부 정규화된 결제 상태 (앱 내부에서 사용) */
export type PaymentStatus = 'pending' | 'partial' | 'completed'

/**
 * 앱 내 카테고리 슬러그 (URL 라우팅용)
 *
 * Notion 대분류 → slug 매핑:
 * - 예식장    → venue
 * - 스드메    → dress
 * - 예물      → gifts
 * - 하객 선물 → favors
 * - 신혼살림  → household
 * - 허니문    → honeymoon
 */
export type CategorySlug =
  | 'venue'
  | 'dress'
  | 'gifts'
  | 'favors'
  | 'household'
  | 'honeymoon'

/**
 * Notion Category DB 레코드를 정규화한 카테고리 타입
 *
 * Notion 원본 필드명 → 정규화된 필드명 매핑:
 * - 대분류(title)        → name
 * - 총금액(number)       → totalAmount
 * - 상태(status)         → paymentStatus
 * - 계획금액(date)       → plannedPaymentDate
 * - 지금금액(date)       → actualPaymentDate
 * - Items(relation)      → itemIds
 */
export interface WeddingCategory {
  /** Notion 페이지 ID */
  id: string
  /** 카테고리 대분류명 (예: 예식장, 스드메) */
  name: string
  /** URL 라우팅용 슬러그 (name 기반으로 매핑) */
  slug: CategorySlug
  /** 카테고리 설명 (앱 내 정의, Notion 필드 아님) */
  description: string
  /** 총 비용 (원) - Notion 수동 입력 값 */
  totalAmount: number
  /** 결제 상태 (정규화) */
  paymentStatus: PaymentStatus
  /**
   * 계획 지불 예정일 (ISO 8601 날짜 문자열, 없으면 null)
   * Notion 프로퍼티: 계획금액 (date 타입)
   */
  plannedPaymentDate: string | null
  /**
   * 실제 지불 완료일 (ISO 8601 날짜 문자열, 없으면 null)
   * Notion 프로퍼티: 지금금액 (date 타입)
   */
  actualPaymentDate: string | null
  /** 연결된 세부 항목(Items DB) ID 목록 */
  itemIds: string[]
}

/**
 * 레거시 Category 인터페이스 (constants/categories.ts 호환성 유지)
 * @deprecated WeddingCategory 사용 권장
 */
export interface Category {
  name: string
  slug: string
  description: string
}
