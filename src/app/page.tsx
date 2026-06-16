/**
 * 웨딩 비용 정리 블로그 홈 페이지
 *
 * Notion API 기반으로 포스트 목록을 표시합니다.
 * 카테고리 필터와 검색창을 제공합니다.
 */

import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { PostCard } from '@/components/common/post-card'
import { CategoryFilter } from '@/components/common/category-filter'
import { SearchInput } from '@/components/common/search-input'
import { EmptyState } from '@/components/common/empty-state'
import { getPosts } from '@/lib/notion/queries'
import { formatCurrency } from '@/lib/utils'
import type { PostSummary } from '@/types/post'

// 홈 페이지는 통계 정보가 자주 변경되지 않으므로 24시간 캐싱 (86400초)
export const revalidate = 86400

export const metadata: Metadata = {
  title: '웨딩 비용 정리 블로그',
  description:
    'Notion CMS 기반 웨딩 비용 카테고리별 정리 블로그. 예식장, 스드메, 예물, 하객 선물, 신혼살림, 허니문 비용을 공유합니다.',
  openGraph: {
    title: '웨딩 비용 정리 블로그',
    description:
      'Notion CMS 기반 웨딩 비용 카테고리별 정리 블로그. 예식장, 스드메, 예물, 하객 선물, 신혼살림, 허니문 비용을 공유합니다.',
    url: '/',
    type: 'website',
  },
}

interface HomePageProps {
  searchParams: Promise<{
    category?: string
  }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { category } = await searchParams

  // Notion API에서 모든 포스트 조회
  const allPosts = await getPosts()

  // 카테고리 필터 적용 (category searchParam이 있으면)
  const filteredPosts = category
    ? allPosts.filter(post => post.slug === category)
    : allPosts

  // 목록 페이지에서는 items, content 필드를 제외한 경량 데이터 사용
  const posts: PostSummary[] = filteredPosts.map(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ items: _i, content: _c, ...summary }) => summary
  )

  // 전체 예상 비용 합산 (헤로 섹션 통계는 필터 전 전체 기준)
  const totalBudget = allPosts.reduce((sum, post) => sum + post.totalAmount, 0)
  const completedCount = allPosts.filter(
    p => p.paymentStatus === 'completed'
  ).length

  return (
    <div className="py-8 sm:py-12">
      <Container>
        {/* 헤로 섹션 */}
        <section
          className="mb-10 py-8 text-center sm:py-12 lg:py-16"
          aria-labelledby="hero-title"
        >
          <h1
            id="hero-title"
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            웨딩 비용 정리
          </h1>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-base sm:text-lg">
            결혼식 준비 비용을 카테고리별로 관리하고 경험을 공유합니다.
            <br className="hidden sm:block" />
            실제 견적과 후기를 통해 합리적인 예산 계획을 세워보세요.
          </p>

          {/* 예산 통계 뱃지 */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-muted rounded-lg px-4 py-2 text-sm">
              <span className="text-muted-foreground">총 예산 </span>
              <span className="font-semibold">
                {formatCurrency(totalBudget)}
              </span>
            </div>
            <div className="bg-muted rounded-lg px-4 py-2 text-sm">
              <span className="text-muted-foreground">카테고리 </span>
              <span className="font-semibold">{allPosts.length}개</span>
            </div>
            <div className="bg-muted rounded-lg px-4 py-2 text-sm">
              <span className="text-muted-foreground">결제 완료 </span>
              <span className="font-semibold">{completedCount}개</span>
            </div>
          </div>
        </section>

        {/* 검색창 */}
        <section className="mb-6" aria-label="검색">
          <SearchInput />
        </section>

        {/* 카테고리 필터 */}
        <section className="mb-8" aria-label="카테고리 필터">
          <Suspense fallback={<div className="h-10 w-full" />}>
            <CategoryFilter />
          </Suspense>
        </section>

        {/* 포스트 그리드 */}
        <section aria-labelledby="posts-heading">
          <h2 id="posts-heading" className="sr-only">
            웨딩 비용 포스트 목록
          </h2>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <EmptyState
              message={
                category
                  ? `'${category}' 카테고리에 포스트가 없습니다.`
                  : '포스트가 없습니다.'
              }
            />
          )}
        </section>
      </Container>
    </div>
  )
}
