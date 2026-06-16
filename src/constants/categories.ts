/**
 * 웨딩 비용 카테고리 상수 정의
 *
 * Notion Category DB의 "대분류" 필드값(한국어)을
 * 앱 내부 슬러그(영어)로 매핑하는 정보를 담습니다.
 *
 * Notion에 존재하는 카테고리 (실제 데이터 기준):
 * - 예식장 (venue)
 * - 스드메 (dress)
 *
 * 추후 Notion에 카테고리 추가 시 이 파일도 함께 업데이트가 필요합니다.
 */

import type { Category, CategorySlug } from '@/types/category'

/**
 * 카테고리 목록 (레거시 Category 인터페이스 사용)
 * @deprecated CATEGORY_MAP 또는 WeddingCategory 타입 사용 권장
 */
export const CATEGORIES: Category[] = [
  { name: '예식장', slug: 'venue', description: '예식장 선택 및 비용' },
  {
    name: '스드메',
    slug: 'dress',
    description: '스튜디오, 드레스, 메이크업',
  },
  { name: '예물', slug: 'gifts', description: '예물 및 예단 비용' },
  { name: '하객 선물', slug: 'favors', description: '하객 답례 선물' },
  { name: '신혼살림', slug: 'household', description: '신혼살림 준비 비용' },
  { name: '허니문', slug: 'honeymoon', description: '신혼여행 비용' },
] as const

/**
 * Notion 대분류명(한국어) → CategorySlug 매핑 테이블
 *
 * Notion Category DB의 "대분류" 필드값을 키로 사용합니다.
 * parseCategory / parsePost 함수에서 slug 변환 시 활용합니다.
 */
export const CATEGORY_NAME_TO_SLUG: Record<string, CategorySlug> = {
  예식장: 'venue',
  스드메: 'dress',
  예물: 'gifts',
  '하객 선물': 'favors',
  신혼살림: 'household',
  허니문: 'honeymoon',
}

/**
 * CategorySlug → 카테고리 메타정보 매핑 테이블
 *
 * slug를 키로 이름, 설명을 빠르게 조회할 때 사용합니다.
 */
export const CATEGORY_MAP: Record<
  CategorySlug,
  { name: string; description: string }
> = {
  venue: { name: '예식장', description: '예식장 선택 및 비용' },
  dress: { name: '스드메', description: '스튜디오, 드레스, 메이크업' },
  gifts: { name: '예물', description: '예물 및 예단 비용' },
  favors: { name: '하객 선물', description: '하객 답례 선물' },
  household: { name: '신혼살림', description: '신혼살림 준비 비용' },
  honeymoon: { name: '허니문', description: '신혼여행 비용' },
}

/**
 * 기본 슬러그 (매핑 실패 시 폴백)
 */
export const DEFAULT_CATEGORY_SLUG: CategorySlug = 'venue'

/**
 * Notion DB ID 상수
 * Notion API 호출 시 사용하는 실제 데이터베이스 ID입니다.
 */
export const NOTION_DB_IDS = {
  /** Category 데이터베이스 ID */
  CATEGORY: '38151c2c-b673-8154-928e-000b72fda882',
  /** Items 데이터베이스 ID */
  ITEMS: '38151c2c-b673-8131-8767-000b711d1aa3',
} as const

/**
 * Notion 프로퍼티명 상수
 *
 * Notion DB의 실제 프로퍼티 이름을 상수로 관리합니다.
 * 오타 방지 및 리팩토링 편의를 위해 사용합니다.
 *
 * ※ Notion DB에서 프로퍼티명을 변경할 경우 이 상수도 함께 업데이트하세요.
 */
export const NOTION_PROPERTY_NAMES = {
  /** Category DB 프로퍼티명 */
  CATEGORY_DB: {
    /** 카테고리명 (title 타입) */
    NAME: '대분류',
    /** 계획 지불 예정일 (date 타입) */
    PLANNED_PAYMENT_DATE: '계획금액',
    /** 실제 지불 완료일 (date 타입) */
    ACTUAL_PAYMENT_DATE: '지금금액',
    /** 결제 상태 (status 타입): 대기 | 부분완료 | 결제완료 */
    STATUS: '상태',
    /** 카테고리 총 금액 (number 타입, 원화) */
    TOTAL_AMOUNT: '총금액',
    /** 세부 항목 관계 (relation 타입) */
    ITEMS: 'Items',
  },
  /** Items DB 프로퍼티명 */
  ITEMS_DB: {
    /** 항목명 (title 타입) */
    NAME: '항목명',
    /** 단가 (number 타입, 원화) */
    UNIT_PRICE: '단가',
    /** 수량 (number 타입) */
    QUANTITY: '수량',
    /** 합산 금액 (formula 타입: 단가 × 수량, 원화) */
    AMOUNT: '금액',
    /** 소속 카테고리 관계 (relation 타입) */
    CATEGORY: 'Category',
  },
} as const
