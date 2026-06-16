import type { Metadata } from 'next'

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
  }>
}

export const metadata: Metadata = {
  title: '검색 | 웨딩 비용 정리 블로그',
  description: '웨딩 비용 정리 블로그 검색 페이지입니다.',
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = '' } = await searchParams

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-4 text-4xl font-bold">검색 결과</h1>
        {q && (
          <p className="mb-6 text-gray-600">
            검색어: <span className="font-semibold">{q}</span>
          </p>
        )}
        <p className="text-gray-600">검색 결과가 여기에 표시될 예정입니다.</p>
      </div>
    </div>
  )
}
