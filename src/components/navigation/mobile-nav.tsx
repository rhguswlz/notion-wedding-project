'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import type { LucideIcon } from 'lucide-react'

interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  // 정확히 일치하는 경우만 활성화 여부 판단 (기본: false - startsWith 사용)
  exact?: boolean
}

// 향후 메뉴 추가 시 이 배열에 항목을 추가하세요
// 예: { title: '소개', href: '/about', icon: Info }
//     { title: '통계', href: '/stats', icon: BarChart }
const navItems: NavItem[] = [
  { title: '홈', href: '/', icon: Home, exact: true },
]

interface MobileNavProps {
  onClose: () => void
}

export function MobileNav({ onClose }: MobileNavProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col space-y-3 pt-6">
      <div className="px-2">
        <h2 className="mb-2 px-2 text-lg font-semibold">메뉴</h2>
        <Separator className="mb-4" />

        <div className="space-y-1">
          {navItems.map(({ title, href, icon: Icon, exact }) => {
            // exact가 true이면 경로 완전 일치, 아니면 startsWith로 활성화 판단
            const isActive = exact
              ? pathname === href
              : pathname.startsWith(href)

            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={cn(
                  'hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium transition-colors',
                  isActive ? 'bg-accent text-accent-foreground' : ''
                )}
              >
                <Icon className="h-4 w-4" />
                {title}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
