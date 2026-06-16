/**
 * Notion API 쿼리 함수 모음
 *
 * 데이터 조회는 이 파일의 함수를 통해서만 수행합니다.
 * 모든 함수는 서버 컴포넌트에서 직접 호출 가능합니다.
 */

import type {
  PageObjectResponse,
  BlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import notionClient from './client'
import { parseBlock, parsePost, parseCategory, parseItem } from './parsers'
import type { Post } from '@/types/post'
import type { Block } from '@/types/block'
import type { WeddingCategory } from '@/types/category'
import type { WeddingItem } from '@/types/item'

/**
 * 캐시 재검증 주기 (초 단위)
 *
 * 페이지별로 다른 캐싱 정책 적용:
 * - 홈 페이지 (통계): 86400초 (24시간) - 변경 적음
 * - 카테고리/포스트: 3600초 (1시간) - 기본 설정
 * - 검색 페이지: 60초 (1분) - 자주 변경
 */
const REVALIDATE_SECONDS = 3600 // 기본값 (카테고리/포스트)

export const revalidate = REVALIDATE_SECONDS

// 페이지별 캐싱 주기 상수
export const CACHE_REVALIDATE = {
  home: 86400, // 24시간
  category: 3600, // 1시간
  post: 3600, // 1시간
  search: 60, // 1분
} as const

// ─────────────────────────────────────────────
// Category DB 쿼리
// ─────────────────────────────────────────────

/**
 * Category DB의 모든 페이지를 조회합니다.
 * 내부 헬퍼 함수로, 외부에서는 getCategories를 사용하세요.
 */
async function getAllCategoryPages(): Promise<PageObjectResponse[]> {
  const results: PageObjectResponse[] = []
  let cursor: string | undefined

  try {
    while (true) {
      // dataSources.query는 런타임에 존재하지만 타입이 노출되지 않음
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await (notionClient.dataSources as any).query({
        data_source_id: '38151c2c-b673-8154-928e-000b72fda882',
        sorts: [{ timestamp: 'last_edited_time', direction: 'descending' }],
        start_cursor: cursor,
      })

      const pages = response.results.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any): item is PageObjectResponse => item.object === 'page'
      )
      results.push(...pages)

      if (!response.has_more) break
      cursor = response.next_cursor || undefined
    }
  } catch (error) {
    console.error('Category DB 조회 오류:', error)
    throw new Error('카테고리 데이터를 조회할 수 없습니다')
  }

  return results
}

/**
 * 모든 카테고리를 WeddingCategory 타입으로 조회합니다.
 */
export async function getCategories(): Promise<WeddingCategory[]> {
  const pages = await getAllCategoryPages()
  return pages.map(parseCategory)
}

/**
 * 모든 카테고리를 Post 타입으로 조회합니다. (블로그 목록용)
 */
export async function getPosts(): Promise<Post[]> {
  const pages = await getAllCategoryPages()
  return pages.map(parsePost)
}

/**
 * 슬러그로 카테고리 포스트 목록을 필터링합니다.
 *
 * @param slug - CategorySlug 값 (예: 'venue', 'dress')
 */
export async function getPostsBySlug(slug: string): Promise<Post[]> {
  const posts = await getPosts()
  return posts.filter(post => post.slug === slug)
}

/**
 * Notion 페이지 ID로 단일 포스트를 조회합니다.
 *
 * @param id - Notion 페이지 ID
 * @returns Post 또는 null (없거나 오류 시)
 */
export async function getPostById(id: string): Promise<Post | null> {
  try {
    const page = await notionClient.pages.retrieve({ page_id: id })
    if (page.object !== 'page') return null

    return parsePost(page as PageObjectResponse)
  } catch (error) {
    console.error(`Post ID ${id} 조회 오류:`, error)
    return null
  }
}

/**
 * 슬러그로 단일 카테고리를 조회합니다.
 *
 * @param slug - CategorySlug 값 (예: 'venue', 'dress')
 * @returns WeddingCategory 또는 null (없으면 null)
 */
export async function getCategoryBySlug(
  slug: string
): Promise<WeddingCategory | null> {
  const categories = await getCategories()
  return categories.find(cat => cat.slug === slug) ?? null
}

// ─────────────────────────────────────────────
// Items DB 쿼리
// ─────────────────────────────────────────────

/**
 * Items DB의 모든 페이지를 조회합니다.
 * 내부 헬퍼 함수로, 외부에서는 getItems를 사용하세요.
 */
async function getAllItemPages(): Promise<PageObjectResponse[]> {
  const results: PageObjectResponse[] = []
  let cursor: string | undefined

  try {
    while (true) {
      // dataSources.query는 런타임에 존재하지만 타입이 노출되지 않음
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await (notionClient.dataSources as any).query({
        data_source_id: '38151c2c-b673-8131-8767-000b711d1aa3',
        start_cursor: cursor,
      })

      const pages = response.results.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any): item is PageObjectResponse => item.object === 'page'
      )
      results.push(...pages)

      if (!response.has_more) break
      cursor = response.next_cursor || undefined
    }
  } catch (error) {
    console.error('Items DB 조회 오류:', error)
    throw new Error('아이템 데이터를 조회할 수 없습니다')
  }

  return results
}

/**
 * 모든 세부 항목을 WeddingItem 타입으로 조회합니다.
 */
export async function getItems(): Promise<WeddingItem[]> {
  const pages = await getAllItemPages()
  return pages.map(parseItem)
}

/**
 * 카테고리 ID에 속하는 세부 항목 목록을 조회합니다.
 *
 * @param categoryId - Notion Category 페이지 ID
 */
export async function getItemsByCategoryId(
  categoryId: string
): Promise<WeddingItem[]> {
  const items = await getItems()
  return items.filter(item => item.categoryId === categoryId)
}

// ─────────────────────────────────────────────
// Block 쿼리
// ─────────────────────────────────────────────

/**
 * Notion 페이지의 모든 블록을 조회합니다. (경험담 본문 콘텐츠)
 *
 * @param pageId - Notion 페이지 ID
 */
export async function getPageBlocks(pageId: string): Promise<Block[]> {
  const blocks: Block[] = []
  let cursor: string | undefined

  try {
    while (true) {
      const response = await notionClient.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
      })

      const parsedBlocks = response.results
        .filter(item => item.object === 'block')
        .map(item => parseBlock(item as unknown as BlockObjectResponse))

      blocks.push(...parsedBlocks)

      if (!response.has_more) break
      cursor = response.next_cursor || undefined
    }
  } catch (error) {
    console.error(`페이지 ${pageId} 블록 조회 오류:`, error)
    throw new Error('페이지 블록을 조회할 수 없습니다')
  }

  return blocks
}

// ─────────────────────────────────────────────
// 검색
// ─────────────────────────────────────────────

/**
 * 제목(카테고리명) 또는 설명(description)을 기준으로 포스트를 검색합니다.
 *
 * @param query - 검색어 (빈 문자열이면 빈 배열 반환)
 */
export async function searchPosts(query: string): Promise<Post[]> {
  if (!query.trim()) return []

  const posts = await getPosts()
  const lowerQuery = query.toLowerCase()

  return posts.filter(
    post =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.description.toLowerCase().includes(lowerQuery)
  )
}
