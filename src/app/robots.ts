import type { MetadataRoute } from 'next'

/**
 * robots.txt 파일 생성
 * 검색 엔진 크롤러를 위한 사이트 맵과 접근 규칙을 정의합니다.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3004'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/search',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
