import { getPostsByCategoryForAdmin } from '@/lib/notion/admin-queries'
import { getCategoryBySlug } from '@/lib/notion/queries'

interface Props {
  params: { slug: string }
}

export default async function CategoryPostsPage({ params }: Props) {
  const category = await getCategoryBySlug(params.slug)
  const posts = await getPostsByCategoryForAdmin(params.slug)

  if (!category) {
    return (
      <div className="rounded-lg bg-white p-6 shadow">
        <p className="text-slate-600">카테고리를 찾을 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
          <h3 className="font-bold text-slate-900">
            {category.name} - 글 목록 ({posts.length}개)
          </h3>
        </div>
        {posts.length === 0 ? (
          <div className="p-6 text-center text-slate-500">
            이 카테고리의 글이 없습니다.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    제목
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    조회수
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    발행일
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {posts.map(post => (
                  <tr key={post.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {post.title}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium ${
                          post.visibility === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {post.visibility === 'published' ? '발행' : '비발행'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {post.views}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(post.publishedDate).toLocaleDateString('ko-KR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
