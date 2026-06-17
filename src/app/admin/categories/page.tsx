'use client'

import { Copy, Check } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getCategorySummaries } from '@/lib/notion/admin-queries'

export default function CategoriesPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [categories, setCategories] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategorySummaries()
        setCategories(data)
        setError(null)
      } catch (err) {
        console.error('Failed to load categories:', err)
        setError(
          err instanceof Error
            ? err.message
            : '카테고리를 불러오는 데 실패했습니다'
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadCategories()
  }, [])

  const handleCopy = (slug: string) => {
    const url = `${window.location.origin}/category/${slug}`
    navigator.clipboard.writeText(url)
    setCopiedId(slug)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const formatAmount = (amount: number) => {
    return `₩${amount.toLocaleString('ko-KR')}`
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
          <h3 className="font-bold text-slate-900">카테고리 목록</h3>
        </div>
        {error && (
          <div className="rounded border border-red-200 bg-red-50 p-6 text-red-700">
            <p className="font-semibold">오류 발생</p>
            <p className="mt-1 text-sm">{error}</p>
          </div>
        )}
        {isLoading ? (
          <div className="p-6 text-center text-slate-500">로딩 중...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    카테고리
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    글 개수
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    총금액
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    발행/미발행
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    공유 링크
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {categories.map(cat => (
                  <tr key={cat.slug} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {cat.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {cat.postCount}개
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {formatAmount(cat.totalAmount)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {cat.publishedCount}/{cat.postCount}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleCopy(cat.slug)}
                        className="flex items-center gap-2 rounded-lg bg-blue-100 px-3 py-1 text-blue-700 transition hover:bg-blue-200"
                      >
                        {copiedId === cat.slug ? (
                          <>
                            <Check size={16} />
                            <span>복사됨</span>
                          </>
                        ) : (
                          <>
                            <Copy size={16} />
                            <span>복사</span>
                          </>
                        )}
                      </button>
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
