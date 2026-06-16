/**
 * Notion API 응답 파싱 유틸리티
 *
 * Notion 원본 데이터 → 앱 내부 타입으로 변환하는 함수 모음입니다.
 *
 * 실제 Notion 데이터베이스 구조 (2026-06-17 기준):
 *
 * [Category DB] 38151c2c-b673-8154-928e-000b72fda882
 * - 대분류   (title):    카테고리명
 * - 총금액   (number):   합산 금액 (원)
 * - 상태     (status):   결제 상태 (대기 | 부분완료 | 결제완료)
 * - 계획금액 (date):     계획 지불 예정일
 * - 지금금액 (date):     실제 지불 완료일
 * - Items    (relation): 세부 항목 ID 목록
 *
 * [Items DB] 38151c2c-b673-8131-8767-000b711d1aa3
 * - 항목명   (title):    항목명
 * - 단가     (number):   단가 (원)
 * - 수량     (number):   수량
 * - 금액     (formula):  합산 금액 = 단가 × 수량
 * - Category (relation): 소속 카테고리 ID
 */

import type {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'
import type { Post } from '@/types/post'
import type { Block, BlockType } from '@/types/block'
import type {
  WeddingCategory,
  NotionPaymentStatus,
  PaymentStatus,
} from '@/types/category'
import type { WeddingItem } from '@/types/item'
import type { CategorySlug } from '@/types/category'
import {
  CATEGORY_NAME_TO_SLUG,
  DEFAULT_CATEGORY_SLUG,
  CATEGORY_MAP,
  NOTION_PROPERTY_NAMES,
} from '@/constants/categories'

// ─────────────────────────────────────────────
// 포맷팅 유틸리티
// ─────────────────────────────────────────────

/**
 * 숫자 금액을 한국 원화 형식으로 포맷합니다.
 *
 * @example
 * formatCurrency(35000000) → "₩35,000,000"
 * formatCurrency(0) → "₩0"
 * formatCurrency(null) → "₩0"
 */
export function formatCurrency(amount: number | null | undefined): string {
  const value = amount ?? 0
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * ISO 8601 날짜 문자열을 한국어 날짜 형식으로 포맷합니다.
 *
 * @example
 * formatDate("2026-04-01") → "2026년 4월 1일"
 * formatDate(null) → "-"
 */
export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  // 유효하지 않은 날짜 방어 처리
  if (isNaN(date.getTime())) return '-'
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

// ─────────────────────────────────────────────
// 기초 유틸리티
// ─────────────────────────────────────────────

/**
 * Notion RichText 배열에서 plain text를 추출합니다.
 */
export function extractTextContent(richText: RichTextItemResponse[]): string {
  return richText
    .map(item => {
      if (item.type === 'text') {
        return item.text.content
      }
      if (item.type === 'equation') {
        return item.equation.expression
      }
      // mention 등 기타 타입은 빈 문자열
      return ''
    })
    .join('')
}

/**
 * Notion 결제 상태 문자열을 앱 내부 PaymentStatus로 변환합니다.
 *
 * Notion 상태값 → 내부 상태값:
 * - "대기"     → "pending"
 * - "부분완료" → "partial"
 * - "결제완료" → "completed"
 * - 기타/null  → "pending" (폴백)
 */
export function parsePaymentStatus(notionStatus: string | null): PaymentStatus {
  const statusMap: Record<NotionPaymentStatus, PaymentStatus> = {
    대기: 'pending',
    부분완료: 'partial',
    결제완료: 'completed',
  }
  if (!notionStatus) return 'pending'
  return statusMap[notionStatus as NotionPaymentStatus] ?? 'pending'
}

/**
 * 카테고리명(한국어)을 URL 슬러그로 변환합니다.
 *
 * CATEGORY_NAME_TO_SLUG 매핑 테이블을 사용하며,
 * 매핑이 없을 경우 DEFAULT_CATEGORY_SLUG('venue')를 반환합니다.
 */
export function parseCategorySlug(name: string): CategorySlug {
  return CATEGORY_NAME_TO_SLUG[name] ?? DEFAULT_CATEGORY_SLUG
}

// ─────────────────────────────────────────────
// 프로퍼티 값 추출
// ─────────────────────────────────────────────

/**
 * Notion 페이지 프로퍼티에서 특정 필드 값을 추출합니다.
 *
 * 지원 타입: title, rich_text, select, multi_select, date,
 *            checkbox, status, number, formula, relation
 */
export function getPropertyValue(
  properties: PageObjectResponse['properties'],
  propertyName: string
): unknown {
  const property = properties[propertyName]
  if (!property) return null

  switch (property.type) {
    case 'title':
      return extractTextContent(property.title)

    case 'rich_text':
      return extractTextContent(property.rich_text)

    case 'select':
      return property.select?.name ?? null

    case 'multi_select':
      return property.multi_select.map(item => item.name)

    case 'date':
      return property.date?.start ?? null

    case 'checkbox':
      return property.checkbox

    case 'status':
      return property.status?.name ?? null

    case 'number':
      return property.number ?? 0

    case 'formula':
      // formula 결과 타입에 따라 추출
      if (property.formula.type === 'number') {
        return property.formula.number ?? 0
      }
      if (property.formula.type === 'string') {
        return property.formula.string ?? ''
      }
      return null

    case 'relation':
      // relation 배열에서 참조 ID 목록 반환
      return property.relation.map((ref: { id: string }) => ref.id)

    default:
      return null
  }
}

// ─────────────────────────────────────────────
// Category DB 파싱
// ─────────────────────────────────────────────

/**
 * Notion Category DB 페이지를 WeddingCategory로 파싱합니다.
 *
 * Category DB 프로퍼티 매핑:
 * - 대분류(title)        → name, slug
 * - 총금액(number)       → totalAmount
 * - 상태(status)         → paymentStatus
 * - 계획금액(date)       → plannedPaymentDate
 * - 지금금액(date)       → actualPaymentDate
 * - Items(relation)      → itemIds
 */
export function parseCategory(page: PageObjectResponse): WeddingCategory {
  const { CATEGORY_DB } = NOTION_PROPERTY_NAMES
  const name =
    (getPropertyValue(page.properties, CATEGORY_DB.NAME) as string) ?? ''
  const slug = parseCategorySlug(name)
  const categoryMeta = CATEGORY_MAP[slug]

  return {
    id: page.id,
    name,
    slug,
    description: categoryMeta?.description ?? '',
    totalAmount:
      (getPropertyValue(page.properties, CATEGORY_DB.TOTAL_AMOUNT) as number) ??
      0,
    paymentStatus: parsePaymentStatus(
      getPropertyValue(page.properties, CATEGORY_DB.STATUS) as string | null
    ),
    plannedPaymentDate:
      (getPropertyValue(page.properties, CATEGORY_DB.PLANNED_PAYMENT_DATE) as
        | string
        | null) ?? null,
    actualPaymentDate:
      (getPropertyValue(page.properties, CATEGORY_DB.ACTUAL_PAYMENT_DATE) as
        | string
        | null) ?? null,
    itemIds:
      (getPropertyValue(page.properties, CATEGORY_DB.ITEMS) as string[]) ?? [],
  }
}

/**
 * Notion Category DB 페이지를 Post(포스트)로 파싱합니다.
 *
 * Post는 WeddingCategory를 기반으로 하되,
 * 블로그 목록/상세 페이지 용도에 맞게 구성됩니다.
 */
export function parsePost(page: PageObjectResponse): Post {
  const category = parseCategory(page)

  return {
    id: page.id,
    title: category.name,
    slug: category.slug,
    description: category.description,
    totalAmount: category.totalAmount,
    paymentStatus: category.paymentStatus,
    plannedPaymentDate: category.plannedPaymentDate,
    actualPaymentDate: category.actualPaymentDate,
    itemIds: category.itemIds,
    lastEditedTime: page.last_edited_time,
  }
}

// ─────────────────────────────────────────────
// Items DB 파싱
// ─────────────────────────────────────────────

/**
 * Notion Items DB 페이지를 WeddingItem으로 파싱합니다.
 *
 * Items DB 프로퍼티 매핑:
 * - 항목명(title)       → name
 * - 단가(number)        → unitPrice
 * - 수량(number)        → quantity
 * - 금액(formula)       → totalAmount
 * - Category(relation)  → categoryId
 */
export function parseItem(page: PageObjectResponse): WeddingItem {
  const { ITEMS_DB } = NOTION_PROPERTY_NAMES
  const categoryIds =
    (getPropertyValue(page.properties, ITEMS_DB.CATEGORY) as string[]) ?? []

  return {
    id: page.id,
    name: (getPropertyValue(page.properties, ITEMS_DB.NAME) as string) ?? '',
    unitPrice:
      (getPropertyValue(page.properties, ITEMS_DB.UNIT_PRICE) as number) ?? 0,
    quantity:
      (getPropertyValue(page.properties, ITEMS_DB.QUANTITY) as number) ?? 0,
    totalAmount:
      (getPropertyValue(page.properties, ITEMS_DB.AMOUNT) as number) ?? 0,
    // relation은 배열로 반환되므로 첫 번째 ID만 사용
    categoryId: categoryIds[0] ?? null,
  }
}

// ─────────────────────────────────────────────
// Block 파싱
// ─────────────────────────────────────────────

/**
 * Notion BlockObjectResponse를 앱 내부 Block 타입으로 파싱합니다.
 *
 * 지원 블록 타입:
 * - heading_1, heading_2, heading_3
 * - paragraph
 * - bulleted_list_item, numbered_list_item
 * - quote
 * - image (external / file 모두 처리)
 * - divider
 *
 * 미지원 블록은 content가 빈 문자열인 paragraph로 폴백됩니다.
 */
export function parseBlock(block: BlockObjectResponse): Block {
  let content = ''
  let blockType: BlockType = 'paragraph'
  let imageUrl: string | undefined

  switch (block.type) {
    case 'heading_1':
      blockType = 'heading_1'
      content = extractTextContent(block.heading_1.rich_text)
      break

    case 'heading_2':
      blockType = 'heading_2'
      content = extractTextContent(block.heading_2.rich_text)
      break

    case 'heading_3':
      blockType = 'heading_3'
      content = extractTextContent(block.heading_3.rich_text)
      break

    case 'paragraph':
      blockType = 'paragraph'
      content = extractTextContent(block.paragraph.rich_text)
      break

    case 'bulleted_list_item':
      blockType = 'bulleted_list_item'
      content = extractTextContent(block.bulleted_list_item.rich_text)
      break

    case 'numbered_list_item':
      blockType = 'numbered_list_item'
      content = extractTextContent(block.numbered_list_item.rich_text)
      break

    case 'quote':
      blockType = 'quote'
      content = extractTextContent(block.quote.rich_text)
      break

    case 'image':
      blockType = 'image'
      // Notion 이미지: 외부 URL 또는 Notion 업로드 파일 URL
      if (block.image.type === 'external') {
        imageUrl = block.image.external.url
      } else if (block.image.type === 'file') {
        imageUrl = block.image.file.url
      }
      // 이미지 캡션이 있으면 content에 저장
      if (block.image.caption?.length) {
        content = extractTextContent(block.image.caption)
      }
      break

    case 'divider':
      blockType = 'divider'
      content = ''
      break

    default:
      // 미지원 블록 타입은 paragraph로 폴백
      blockType = 'paragraph'
      content = ''
  }

  return {
    id: block.id,
    type: blockType,
    content,
    imageUrl,
  }
}
