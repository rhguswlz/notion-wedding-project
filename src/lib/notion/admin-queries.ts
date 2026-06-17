'use server'

import {
  AdminCategorySummary,
  AdminPostSummary,
  AdminStats,
  AdminDashboardData,
} from '@/types/admin'
import { getCategories, getPostsBySlug, getPosts } from './queries'

/**
 * 카테고리별 요약 정보를 조회합니다.
 * 각 카테고리의 글 개수, 금액, 상태별 개수를 포함합니다.
 */
export async function getCategorySummaries(): Promise<AdminCategorySummary[]> {
  const categories = await getCategories()

  const summaries = await Promise.all(
    categories.map(async category => {
      const posts = await getPostsBySlug(category.slug)

      const publishedCount = posts.filter(
        p => p.paymentStatus === 'completed'
      ).length
      const unpublishedCount = posts.filter(
        p => p.paymentStatus === 'pending'
      ).length
      const archivedCount = posts.filter(
        p => p.paymentStatus === 'partial'
      ).length

      const totalAmount = posts.reduce((sum, post) => {
        const amount = post.totalAmount || 0
        return sum + amount
      }, 0)

      return {
        ...category,
        postCount: posts.length,
        totalAmount,
        publishedCount,
        unpublishedCount,
        archivedCount,
      }
    })
  )

  return summaries
}

/**
 * 특정 카테고리의 글 목록을 조회합니다.
 * 관리자 화면용으로 비발행/아카이브된 글도 포함합니다.
 */
export async function getPostsByCategoryForAdmin(
  categorySlug: string
): Promise<AdminPostSummary[]> {
  const posts = await getPostsBySlug(categorySlug)

  return posts.map(post => ({
    id: post.id,
    title: post.title,
    category: post.slug,
    visibility: (post.paymentStatus === 'completed'
      ? 'published'
      : 'unpublished') as 'published' | 'unpublished',
    views: 0, // TODO: 실제 조회수 데이터 필요
    publishedDate:
      post.actualPaymentDate || post.plannedPaymentDate || post.lastEditedTime,
    createdDate: post.lastEditedTime,
    tags: [],
  }))
}

/**
 * 대시보드용 통계 정보를 조회합니다.
 * 전체 글 수, 카테고리별 글 개수, 조회수 등을 포함합니다.
 */
export async function getAdminStats(): Promise<AdminStats> {
  const allPosts = await getPosts()
  const categorySummaries = await getCategorySummaries()

  const publishedCount = allPosts.filter(
    p => p.paymentStatus === 'completed'
  ).length
  const unpublishedCount = allPosts.filter(
    p => p.paymentStatus === 'pending'
  ).length
  const archivedCount = allPosts.filter(
    p => p.paymentStatus === 'partial'
  ).length

  return {
    totalPosts: allPosts.length,
    totalCategories: categorySummaries.length,
    totalViews: 0, // TODO: 실제 조회수 데이터 필요
    totalFeedback: 0, // TODO: 피드백 데이터 필요
    publishedCount,
    unpublishedCount,
    archivedCount,
    categorySummaries,
  }
}

/**
 * 대시보드 전체 데이터를 조회합니다.
 * 통계와 최근 글 목록을 함께 반환합니다.
 */
export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  const stats = await getAdminStats()
  const allPosts = await getPosts()

  const recentPosts = allPosts
    .sort(
      (a, b) =>
        new Date(b.lastEditedTime).getTime() -
        new Date(a.lastEditedTime).getTime()
    )
    .slice(0, 5)
    .map(post => ({
      id: post.id,
      title: post.title,
      category: post.slug,
      visibility: (post.paymentStatus === 'completed'
        ? 'published'
        : 'unpublished') as 'published' | 'unpublished',
      views: 0,
      publishedDate:
        post.actualPaymentDate ||
        post.plannedPaymentDate ||
        post.lastEditedTime,
      createdDate: post.lastEditedTime,
      tags: [],
    }))

  return {
    stats,
    recentPosts,
  }
}

/**
 * 글의 상태를 업데이트합니다.
 * (선택 범위: Notion 쓰기 권한이 필요함)
 */
export async function updatePostVisibility(
  postId: string,
  visibility: 'published' | 'unpublished' | 'archived'
): Promise<void> {
  // TODO: Notion API로 글 상태 업데이트
  // 실제 구현: Task #110에서 (선택)
  throw new Error('Not implemented')
}
