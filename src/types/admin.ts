import { WeddingCategory } from './category'

export type PostVisibility = 'published' | 'unpublished' | 'archived'

export interface AdminCategorySummary extends WeddingCategory {
  postCount: number
  totalAmount: number
  publishedCount: number
  unpublishedCount: number
  archivedCount: number
}

export interface AdminPostSummary {
  id: string
  title: string
  category: string
  visibility: PostVisibility
  views: number
  publishedDate: string
  createdDate: string
  tags?: string[]
}

export interface AdminStats {
  totalPosts: number
  totalCategories: number
  totalViews: number
  totalFeedback: number
  publishedCount: number
  unpublishedCount: number
  archivedCount: number
  categorySummaries: AdminCategorySummary[]
}

export interface AdminDashboardData {
  stats: AdminStats
  recentPosts: AdminPostSummary[]
}
