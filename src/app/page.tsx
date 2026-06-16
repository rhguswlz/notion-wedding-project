// 웨딩 비용 정리 블로그 홈 페이지
// Notion CMS 기반 글 목록 및 카테고리 네비게이션 제공
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight">
            웨딩 비용 정리 블로그
          </h1>
          <p className="text-muted-foreground mt-4">
            Notion CMS 연동 예정 - 글 목록이 여기에 표시됩니다.
          </p>
        </div>
      </main>
    </div>
  )
}
