import type { Metadata } from 'next'

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params

  return {
    title: `${slug} | 웨딩 비용 정리 블로그`,
    description: `웨딩 비용 정리 블로그의 ${slug} 카테고리 페이지입니다.`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-4 text-4xl font-bold">카테고리: {slug}</h1>
        <p className="text-gray-600">
          이 카테고리의 글 목록이 여기에 표시될 예정입니다.
        </p>
      </div>
    </div>
  )
}
