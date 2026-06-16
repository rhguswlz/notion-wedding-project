/**
 * 블로그 포스트 타입 정의
 *
 * 이 프로젝트의 Notion 구조:
 * - Category DB: 웨딩 비용 카테고리 (예식장, 스드메 등)
 * - Items DB:    카테고리별 세부 비용 항목
 *
 * "포스트"는 Category DB의 한 레코드를 기반으로
 * 해당 카테고리의 비용 내역과 경험담을 담는 블로그 글 단위입니다.
 * Notion Category DB 페이지가 곧 하나의 포스트 역할을 합니다.
 * 페이지 본문 블록(Block)이 경험담 콘텐츠가 됩니다.
 */

import type { Block } from './block'
import type { WeddingItem } from './item'
import type { CategorySlug, PaymentStatus } from './category'

/**
 * 웨딩 비용 포스트 (Category DB 레코드 + 블록 콘텐츠)
 *
 * Notion 원본 필드명 → 정규화된 필드명 매핑:
 * - 대분류(title)        → title
 * - 총금액(number)       → totalAmount
 * - 상태(status)         → paymentStatus
 * - 계획금액(date)       → plannedPaymentDate
 * - 지금금액(date)       → actualPaymentDate
 * - Items(relation)      → items (선택적, 조회 시 포함)
 * - 페이지 블록          → content (선택적, 상세 조회 시 포함)
 */
export interface Post {
  /** Notion 페이지 ID */
  id: string
  /** 카테고리 대분류명 (예: 예식장, 스드메) */
  title: string
  /** URL 라우팅용 슬러그 (name 기반으로 매핑) */
  slug: CategorySlug
  /** 카테고리 설명 (앱 내 정의) */
  description: string
  /** 총 비용 (원) */
  totalAmount: number
  /** 결제 상태 */
  paymentStatus: PaymentStatus
  /**
   * 계획 지불 예정일 (ISO 8601, 없으면 null)
   * Notion 프로퍼티: 계획금액 (date 타입)
   */
  plannedPaymentDate: string | null
  /**
   * 실제 지불 완료일 (ISO 8601, 없으면 null)
   * Notion 프로퍼티: 지금금액 (date 타입)
   */
  actualPaymentDate: string | null
  /** 연결된 세부 항목 ID 목록 */
  itemIds: string[]
  /** 세부 항목 목록 (상세 조회 시 포함, 목록 조회 시 undefined) */
  items?: WeddingItem[]
  /** 페이지 본문 블록 (상세 조회 시 포함, 목록 조회 시 undefined) */
  content?: Block[]
  /** Notion 페이지 마지막 수정 시각 (ISO 8601) */
  lastEditedTime: string
}

/**
 * 목록용 경량 포스트 타입 (items, content 제외)
 *
 * 카드 목록 페이지에서 사용합니다.
 */
export type PostSummary = Omit<Post, 'items' | 'content'>
