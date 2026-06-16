/**
 * 타입 통합 진입점 (Barrel Export)
 *
 * 모든 타입을 이 파일에서 한 번에 import 할 수 있습니다.
 *
 * 사용 예시:
 * import type { Post, WeddingCategory, WeddingItem, Block } from '@/types'
 */

// 블록 타입
export type { Block, BlockType } from './block'

// 카테고리 타입
export type {
  WeddingCategory,
  Category,
  CategorySlug,
  PaymentStatus,
  NotionPaymentStatus,
} from './category'

// 아이템 타입
export type { WeddingItem } from './item'

// 포스트 타입
export type { Post, PostSummary } from './post'
