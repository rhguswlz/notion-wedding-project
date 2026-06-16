/**
 * 글 상세 페이지
 *
 * URL 파라미터의 id로 포스트를 조회하고 비용 항목 테이블과 본문 블록을 표시합니다.
 * 유효하지 않은 id인 경우 404 페이지로 이동합니다.
 */

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CalendarDays, CreditCard } from 'lucide-react'
import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { BlockRenderer } from '@/components/content/block-renderer'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  getPostById,
  getItemsByCategoryId,
  getPageBlocks,
} from '@/lib/notion/queries'
import {
  formatCurrency,
  formatDate,
  getPaymentStatusLabel,
  getPaymentStatusColor,
  cn,
} from '@/lib/utils'

// ISR 캐싱 시간: 1시간
export const revalidate = 3600

interface PostPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { id } = await params
  const post = await getPostById(id)

  if (!post) {
    return { title: '글을 찾을 수 없음 | 웨딩 비용 정리 블로그' }
  }

  return {
    title: `${post.title} | 웨딩 비용 정리 블로그`,
    description: `${post.description} - 총 ${formatCurrency(post.totalAmount)}`,
    keywords: [post.title, '웨딩 비용', '결혼식 예산'],
    openGraph: {
      title: `${post.title} | 웨딩 비용 정리 블로그`,
      description: `${post.description}`,
      url: `/post/${id}`,
      type: 'article',
      authors: ['Wedding Blog'],
      modifiedTime: post.lastEditedTime,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title}`,
      description: `${post.description}`,
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params

  // 포스트 메타데이터 조회 (존재 여부 확인)
  const post = await getPostById(id)

  // 포스트가 없으면 404 페이지로 이동
  if (!post) {
    notFound()
  }

  // items와 blocks를 병렬로 조회 (서로 독립적)
  const [items, content] = await Promise.all([
    getItemsByCategoryId(id),
    getPageBlocks(id).catch(() => []),
  ])

  // post에 items, content 병합
  const fullPost = { ...post, items, content }

  return (
    <div className="py-8 sm:py-12">
      <Container size="md">
        {/* 뒤로가기 링크 */}
        <Link
          href={`/category/${fullPost.slug}`}
          className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1.5 text-sm transition-colors"
          aria-label={`${fullPost.title} 카테고리 목록으로 돌아가기`}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          목록으로
        </Link>

        {/* 글 본문 */}
        <article aria-labelledby="post-title">
          {/* 글 헤더 */}
          <header className="mb-8">
            <h1
              id="post-title"
              className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              {fullPost.title}
            </h1>

            {/* 메타 정보 */}
            <div className="flex flex-wrap items-center gap-3">
              {/* 결제 상태 배지 */}
              <Badge
                className={cn(
                  'text-xs',
                  getPaymentStatusColor(fullPost.paymentStatus)
                )}
              >
                {getPaymentStatusLabel(fullPost.paymentStatus)}
              </Badge>

              {/* 예정 결제일 */}
              {fullPost.plannedPaymentDate && (
                <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>예정일: {formatDate(fullPost.plannedPaymentDate)}</span>
                </div>
              )}

              {/* 실제 결제일 */}
              {fullPost.actualPaymentDate && (
                <div className="flex items-center gap-1.5 text-sm text-green-700 dark:text-green-400">
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>완료일: {formatDate(fullPost.actualPaymentDate)}</span>
                </div>
              )}
            </div>

            {/* 설명 */}
            <p className="text-muted-foreground mt-3 text-base">
              {fullPost.description}
            </p>
          </header>

          <Separator className="mb-8" />

          {/* 총 비용 요약 */}
          <section
            className="bg-muted/50 mb-8 rounded-lg p-4 sm:p-6"
            aria-label="비용 요약"
          >
            <div className="flex items-center gap-3">
              <CreditCard
                className="text-muted-foreground h-5 w-5 shrink-0"
                aria-hidden="true"
              />
              <div>
                <p className="text-muted-foreground text-sm">총 비용</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(fullPost.totalAmount)}
                </p>
              </div>
            </div>
          </section>

          {/* 세부 항목 테이블 */}
          {fullPost.items && fullPost.items.length > 0 && (
            <section className="mb-8" aria-labelledby="items-heading">
              <h2 id="items-heading" className="mb-4 text-xl font-semibold">
                세부 항목
              </h2>

              <div className="overflow-x-auto rounded-lg border">
                <table
                  className="w-full text-sm"
                  aria-label="웨딩 비용 세부 항목"
                >
                  <thead>
                    <tr className="bg-muted/50 border-b">
                      <th
                        scope="col"
                        className="px-4 py-3 text-left font-medium"
                      >
                        항목명
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-right font-medium"
                      >
                        단가
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-right font-medium"
                      >
                        수량
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-right font-medium"
                      >
                        금액
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fullPost.items.map(item => (
                      <tr
                        key={item.id}
                        className="hover:bg-muted/30 border-b transition-colors last:border-0"
                      >
                        <td className="px-4 py-3 font-medium">{item.name}</td>
                        <td className="text-muted-foreground px-4 py-3 text-right">
                          {formatCurrency(item.unitPrice)}
                        </td>
                        <td className="text-muted-foreground px-4 py-3 text-right">
                          {item.quantity.toLocaleString('ko-KR')}
                        </td>
                        <td className="px-4 py-3 text-right font-semibold">
                          {formatCurrency(item.unitPrice * item.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {/* 합계 행 */}
                  <tfoot>
                    <tr className="bg-muted/50 border-t-2">
                      <td colSpan={3} className="px-4 py-3 font-semibold">
                        합계
                      </td>
                      <td className="px-4 py-3 text-right text-base font-bold">
                        {formatCurrency(fullPost.totalAmount)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </section>
          )}

          {/* 본문 블록 */}
          {fullPost.content && fullPost.content.length > 0 && (
            <section aria-labelledby="content-heading">
              <h2 id="content-heading" className="mb-6 text-xl font-semibold">
                경험 후기
              </h2>
              <BlockRenderer blocks={fullPost.content} />
            </section>
          )}
        </article>
      </Container>
    </div>
  )
}
