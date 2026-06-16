import type { MetadataRoute } from 'next'
import { getPosts } from '@/lib/notion/queries'
import { CATEGORIES } from '@/constants/categories'

/**
 * sitemap.xml 동적 생성
 * 모든 카테고리, 포스트, 주요 페이지를 포함합니다.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3004'

  try {
    // 모든 포스트 조회
    const posts = await getPosts()

    // 포스트별 사이트맵 항목
    const postEntries: MetadataRoute.Sitemap = posts.map(post => ({
      url: `${baseUrl}/post/${post.id}`,
      lastModified: post.lastEditedTime,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    // 카테고리별 사이트맵 항목
    const categoryEntries: MetadataRoute.Sitemap = CATEGORIES.map(category => ({
      url: `${baseUrl}/category/${category.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    // 주요 페이지
    const mainPages: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
      },
      {
        url: `${baseUrl}/search`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      },
    ]

    return [...mainPages, ...categoryEntries, ...postEntries]
  } catch (error) {
    console.error('Failed to generate sitemap:', error)
    // 에러 시 기본 페이지만 반환
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3004'
    return [
      {
        url: baseUrl,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
      },
    ]
  }
}
