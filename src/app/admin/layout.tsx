import type { Metadata } from 'next'
import { AdminSidebar } from '@/components/admin/layout/admin-sidebar'
import { AdminHeader } from '@/components/admin/layout/admin-header'

export const metadata: Metadata = {
  title: '관리자 대시보드 | 웨딩 비용 정리 블로그',
  description: '웨딩 블로그 관리자 화면',
  robots: 'noindex, nofollow',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminHeader />
        <main className="flex-1 overflow-auto p-8">{children}</main>
      </div>
    </div>
  )
}
