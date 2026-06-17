import { getAdminStats } from '@/lib/notion/admin-queries'
import { StatCard } from '@/components/admin/stat-card'

export default async function AnalyticsPage() {
  const stats = await getAdminStats()

  const topCategories = stats.categorySummaries
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* 핵심 통계 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <StatCard label="총 글 수" value={stats.totalPosts} color="blue" />
        <StatCard label="발행 글" value={stats.publishedCount} color="green" />
        <StatCard
          label="미발행 글"
          value={stats.unpublishedCount}
          color="red"
        />
        <StatCard label="아카이브" value={stats.archivedCount} color="purple" />
      </div>

      {/* 카테고리별 통계 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 카테고리별 글 개수 */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-bold">카테고리별 글 개수</h3>
          <div className="space-y-3">
            {topCategories.map(cat => (
              <div key={cat.slug} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">
                    {cat.name}
                  </p>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{
                        width: `${(cat.postCount / Math.max(...topCategories.map(c => c.postCount))) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <p className="ml-4 text-sm font-semibold text-slate-900">
                  {cat.postCount}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 카테고리별 총금액 */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-bold">카테고리별 총금액</h3>
          <div className="space-y-3">
            {topCategories.map(cat => (
              <div key={cat.slug} className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-900">{cat.name}</p>
                <p className="text-sm font-semibold text-slate-900">
                  ₩{cat.totalAmount.toLocaleString('ko-KR')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 상세 통계 테이블 */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
          <h3 className="font-bold text-slate-900">전체 카테고리 통계</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                  카테고리
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                  총 글
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                  발행/미발행
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                  총금액
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {stats.categorySummaries.map(cat => (
                <tr key={cat.slug} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {cat.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {cat.postCount}개
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {cat.publishedCount}/{cat.unpublishedCount}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    ₩{cat.totalAmount.toLocaleString('ko-KR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
