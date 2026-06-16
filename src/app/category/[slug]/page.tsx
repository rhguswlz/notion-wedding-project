/**
 * 카테고리 상세 페이지
 *
 * URL 파라미터의 slug로 카테고리를 식별하고 해당 카테고리의 포스트 목록을 표시합니다.
 * 유효하지 않은 slug인 경우 404 페이지로 이동합니다.
 */

import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { PostCard } from '@/components/common/post-card'
import { EmptyState } from '@/components/common/empty-state'
import { CATEGORY_MAP } from '@/constants/categories'
import {
  getPostsBySlug,
  getCategories,
  CACHE_REVALIDATE,
} from '@/lib/notion/queries'
import type { CategorySlug } from '@/types/category'
import type { PostSummary } from '@/types/post'

/**
 * 동적 라우트 세그먼트 설정
 * - revalidate: ISR 캐싱 시간 (초)
 * - dynamicParams: false일 경우 generateStaticParams에 없는 경로는 404 반환
 *
 * generateStaticParams를 사용하면 빌드 시 모든 카테고리 경로를 정적 생성합니다.
 */
export const revalidate = CACHE_REVALIDATE.category
export const dynamicParams = true // 새로운 카테고리가 추가되면 동적 생성

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

/**
 * 모든 카테고리 경로를 빌드 시점에 정적 생성합니다.
 * 이를 통해 동적 라우트의 성능을 최적화합니다.
 */
export async function generateStaticParams() {
  try {
    const categories = await getCategories()
    return categories.map(cat => ({
      slug: cat.slug,
    }))
  } catch (error) {
    console.error('Failed to generate static params for categories:', error)
    // 오류 시 빈 배열 반환 (dynamicParams=true이므로 동적 생성으로 폴백)
    return []
  }
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = CATEGORY_MAP[slug as CategorySlug]

  if (!category) {
    return { title: '카테고리 없음 | 웨딩 비용 정리 블로그' }
  }

  return {
    title: `${category.name} | 웨딩 비용 정리 블로그`,
    description: `웨딩 비용 정리 블로그의 ${category.name} 카테고리입니다. ${category.description}`,
    keywords: [category.name, '웨딩 비용', '결혼식 예산', category.name],
    openGraph: {
      title: `${category.name} | 웨딩 비용 정리 블로그`,
      description: `${category.description}`,
      url: `/category/${slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${category.name} | 웨딩 비용 정리 블로그`,
      description: `${category.description}`,
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params

  // 유효하지 않은 slug인 경우 404 페이지로 이동
  const categoryMeta = CATEGORY_MAP[slug as CategorySlug]
  if (!categoryMeta) {
    notFound()
  }

  // Notion API에서 해당 카테고리의 포스트 조회
  const posts = await getPostsBySlug(slug)
  const summaries: PostSummary[] = posts.map(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ items: _i, content: _c, ...summary }) => summary
  )

  return (
    <div className="py-8 sm:py-12">
      <Container>
        {/* 카테고리 헤더 */}
        <section className="mb-10" aria-labelledby="category-title">
          {/* 뒤로가기 텍스트 링크 */}
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1 text-sm transition-colors"
          >
            ← 전체 목록으로
          </Link>

          <h1
            id="category-title"
            className="mt-2 mb-2 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {categoryMeta.name}
          </h1>
          <p className="text-muted-foreground text-base">
            {categoryMeta.description}
          </p>
        </section>

        {/* 포스트 그리드 또는 빈 상태 */}
        {summaries.length > 0 ? (
          <section aria-labelledby="category-posts-heading">
            <h2 id="category-posts-heading" className="sr-only">
              {categoryMeta.name} 포스트 목록
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {summaries.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        ) : (
          <EmptyState
            message={`${categoryMeta.name} 카테고리에 아직 포스트가 없습니다.`}
          />
        )}
      </Container>
    </div>
  )
}
