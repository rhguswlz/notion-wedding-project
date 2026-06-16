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
import { getPostsBySlug } from '@/lib/notion/queries'
import type { CategorySlug } from '@/types/category'
import type { PostSummary } from '@/types/post'

// ISR 캐싱 시간: 1시간
export const revalidate = 3600

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
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
