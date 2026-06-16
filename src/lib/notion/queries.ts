import type {
  PageObjectResponse,
  BlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import notionClient from './client'
import { parseBlock, parsePost } from './parsers'
import type { Post } from '@/types/post'
import type { Block } from '@/types/block'

const REVALIDATE_SECONDS = 3600 // 1시간

export const revalidate = REVALIDATE_SECONDS

async function getAllPublishedPages(): Promise<PageObjectResponse[]> {
  const results: PageObjectResponse[] = []
  let cursor: string | undefined

  try {
    while (true) {
      const response = await notionClient.search({
        query: '',
        filter: {
          value: 'page',
          property: 'object',
        },
        sort: {
          direction: 'descending',
          timestamp: 'last_edited_time',
        },
        start_cursor: cursor,
      })

      const pages = response.results.filter(
        item => item.object === 'page'
      ) as PageObjectResponse[]
      results.push(...pages)

      if (!response.has_more) break
      cursor = response.next_cursor || undefined
    }
  } catch (error) {
    console.error('Notion API 오류:', error)
    throw new Error('Notion 데이터베이스를 조회할 수 없습니다')
  }

  return results
}

export async function getPosts(): Promise<Post[]> {
  const pages = await getAllPublishedPages()
  return pages.map(parsePost)
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getPosts()
  return posts.filter(post => post.category === category)
}

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

export async function searchPosts(query: string): Promise<Post[]> {
  if (!query.trim()) return []

  const posts = await getPosts()
  const lowerQuery = query.toLowerCase()

  return posts.filter(post => {
    const titleMatch = post.title.toLowerCase().includes(lowerQuery)
    const tagMatch = post.tags.some(tag =>
      tag.toLowerCase().includes(lowerQuery)
    )
    return titleMatch || tagMatch
  })
}
