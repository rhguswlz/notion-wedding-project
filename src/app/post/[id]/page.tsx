import type { Metadata } from 'next'

interface PostPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata(
  _props: PostPageProps
): Promise<Metadata> {
  return {
    title: `글 상세 | 웨딩 비용 정리 블로그`,
    description: '글 상세 페이지입니다.',
  }
}

export default async function PostPage({ params }: PostPageProps) {
  await params

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="mb-4 text-4xl font-bold">글 상세 페이지</h1>
        <p className="mt-4 text-gray-600">
          이 페이지에 글의 전체 내용이 표시될 예정입니다.
        </p>
      </div>
    </div>
  )
}
