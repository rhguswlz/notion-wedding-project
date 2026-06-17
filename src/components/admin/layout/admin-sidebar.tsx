'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FolderOpen,
  MessageSquare,
  LogOut,
} from 'lucide-react'

export function AdminSidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      label: '대시보드',
      href: '/admin',
      icon: LayoutDashboard,
    },
    {
      label: '카테고리',
      href: '/admin/categories',
      icon: FolderOpen,
    },
    {
      label: '피드백',
      href: '/admin/feedback',
      icon: MessageSquare,
    },
  ]

  return (
    <div className="flex h-screen w-64 flex-col bg-slate-900 text-white">
      {/* 로고 */}
      <div className="border-b border-slate-700 p-6">
        <h1 className="text-xl font-bold">관리자</h1>
        <p className="text-sm text-slate-400">웨딩 블로그</p>
      </div>

      {/* 메뉴 */}
      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map(item => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-2 transition ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* 로그아웃 */}
      <div className="border-t border-slate-700 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-slate-300 transition hover:bg-slate-800">
          <LogOut size={20} />
          <span>로그아웃</span>
        </button>
      </div>
    </div>
  )
}
