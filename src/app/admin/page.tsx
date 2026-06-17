import { getAdminDashboardData } from '@/lib/notion/admin-queries'
import { StatCard } from '@/components/admin/stat-card'

export default async function AdminDashboard() {
  const { stats, recentPosts } = await getAdminDashboardData()

  return (
    <div className="space-y-6">
      {/* 요약 통계 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <StatCard label="총 글 수" value={stats.totalPosts} color="blue" />
        <StatCard
          label="카테고리"
          value={stats.totalCategories}
          color="green"
        />
        <StatCard label="조회수" value={stats.totalViews} color="purple" />
        <StatCard label="피드백" value={stats.totalFeedback} color="red" />
      </div>

      {/* 상태별 글 개수 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard label="발행됨" value={stats.publishedCount} color="green" />
        <StatCard label="미발행" value={stats.unpublishedCount} color="red" />
        <StatCard label="아카이브" value={stats.archivedCount} color="purple" />
      </div>

      {/* 최근 글 */}
      <div className="rounded-lg bg-white shadow">
        <div className="border-b border-slate-200 px-6 py-4">
          <h3 className="text-lg font-bold">최근 글</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {recentPosts.map(post => (
              <div
                key={post.id}
                className="flex items-center justify-between border-b border-slate-100 py-3 last:border-0"
              >
                <div>
                  <div className="font-medium text-slate-900">{post.title}</div>
                  <div className="text-sm text-slate-500">
                    {post.category} •{' '}
                    {new Date(post.publishedDate).toLocaleDateString('ko-KR')}
                  </div>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    post.visibility === 'published'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {post.visibility === 'published' ? '발행' : '미발행'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
