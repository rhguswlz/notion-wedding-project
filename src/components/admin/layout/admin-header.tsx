'use client'

import { usePathname, useRouter } from 'next/navigation'
import { logout } from '@/lib/actions/auth'
import { ThemeToggle } from '@/components/theme-toggle'

const pageNames: Record<string, string> = {
  '/admin': '대시보드',
  '/admin/categories': '카테고리 관리',
  '/admin/analytics': '통계',
  '/admin/feedback': '피드백 관리',
}

export function AdminHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const pageTitle = pageNames[pathname] || '관리자 페이지'

  const handleLogout = async () => {
    await logout()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4 dark:border-slate-800 dark:bg-slate-950">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
        {pageTitle}
      </h2>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
        >
          로그아웃
        </button>
      </div>
    </div>
  )
}
