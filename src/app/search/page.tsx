/**
 * 검색 결과 페이지
 *
 * URL searchParam의 'q' 값으로 Notion 데이터에서 포스트를 검색합니다.
 * 제목(title)과 설명(description)을 기준으로 필터링합니다.
 */

import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { PostCard } from '@/components/common/post-card'
import { SearchInput } from '@/components/common/search-input'
import { EmptyState } from '@/components/common/empty-state'
import { searchPosts } from '@/lib/notion/queries'
import type { PostSummary } from '@/types/post'

// 검색 페이지는 사용자 입력이 자주 변하므로 1분 캐싱 (60초)
export const revalidate = 60

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
  }>
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q = '' } = await searchParams

  return {
    title: q
      ? `"${q}" 검색 결과 | 웨딩 비용 정리 블로그`
      : '검색 | 웨딩 비용 정리 블로그',
    description: `"${q}" 웨딩 비용 정리 블로그 검색 결과입니다.`,
    robots: {
      index: false,
      follow: true,
    },
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = '' } = await searchParams

  // Notion API를 통한 포스트 검색 (빈 쿼리면 빈 배열 반환)
  const posts = await searchPosts(q)
  const results: PostSummary[] = posts.map(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ items: _i, content: _c, ...summary }) => summary
  )

  const keyword = q.trim()

  return (
    <div className="py-8 sm:py-12">
      <Container>
        {/* 검색창 */}
        <section className="mb-8" aria-label="검색">
          <SearchInput defaultValue={q} />
        </section>

        {/* 검색 결과 요약 */}
        {keyword && (
          <p
            className="text-muted-foreground mb-6 text-sm"
            role="status"
            aria-live="polite"
          >
            <span className="text-foreground font-semibold">
              &ldquo;{q}&rdquo;
            </span>{' '}
            검색 결과:{' '}
            <span className="text-foreground font-semibold">
              {results.length}개
            </span>
          </p>
        )}

        {/* 검색어 없음 안내 */}
        {!keyword && (
          <p className="text-muted-foreground mb-6 text-sm">
            검색어를 입력하면 웨딩 비용 카테고리를 검색할 수 있습니다.
          </p>
        )}

        {/* 검색 결과 그리드 또는 빈 상태 */}
        {results.length > 0 ? (
          <section aria-labelledby="search-results-heading">
            <h2 id="search-results-heading" className="sr-only">
              검색 결과 목록
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        ) : (
          keyword && (
            <EmptyState
              message={`"${q}"에 해당하는 포스트가 없습니다. 다른 검색어로 시도해 보세요.`}
            />
          )
        )}
      </Container>
    </div>
  )
}
