'use client'

/**
 * 카테고리 필터 컴포넌트
 *
 * 홈 페이지에서 카테고리별 필터링 버튼 그룹을 표시합니다.
 * "전체" + 6개 카테고리 버튼을 렌더링합니다.
 * URL searchParam (?category=slug) 기반으로 동작합니다.
 */

import { useRouter, useSearchParams } from 'next/navigation'
import { CATEGORIES } from '@/constants/categories'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function CategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedSlug = searchParams.get('category')

  const filterItems = [
    { label: '전체', slug: null },
    ...CATEGORIES.map(cat => ({ label: cat.name, slug: cat.slug })),
  ]

  const handleSelect = (slug: string | null) => {
    if (slug) {
      router.push(`/?category=${slug}`)
    } else {
      router.push('/')
    }
  }

  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="카테고리 필터"
    >
      {filterItems.map(item => {
        const isActive = item.slug === selectedSlug

        return (
          <Button
            key={item.slug ?? 'all'}
            variant={isActive ? 'default' : 'outline'}
            size="sm"
            className={cn(
              'transition-all duration-150',
              isActive
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'text-foreground hover:bg-accent hover:text-accent-foreground border'
            )}
            onClick={() => handleSelect(item.slug)}
            aria-pressed={isActive}
          >
            {item.label}
          </Button>
        )
      })}
    </div>
  )
}
