'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavItem {
  title: string
  href: string
}

// 향후 메뉴 추가 시 이 배열에 항목을 추가하세요
// 예: { title: '소개', href: '/about' }, { title: '통계', href: '/stats' }
const navItems: NavItem[] = [{ title: '홈', href: '/' }]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-1 lg:space-x-2">
      {navItems.map(item => {
        // 현재 경로와 일치하는 항목 활성화 처리
        const isActive =
          item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'hover:text-primary rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              isActive
                ? 'bg-accent text-foreground'
                : 'text-foreground/60 hover:bg-accent/50'
            )}
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
