'use client'

/**
 * 검색 입력 컴포넌트
 *
 * 검색어를 입력받아 /search?q= 경로로 이동합니다.
 * 홈 페이지 및 검색 결과 페이지에서 공통으로 사용합니다.
 */

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SearchInputProps {
  /** 검색창 초기값 (검색 결과 페이지에서 현재 검색어 표시 시 사용) */
  defaultValue?: string
}

export function SearchInput({ defaultValue = '' }: SearchInputProps) {
  return (
    <form
      className="flex w-full items-center gap-2"
      action="/search"
      method="GET"
      role="search"
      aria-label="웨딩 비용 검색"
    >
      {/* 검색어 입력 필드 */}
      <div className="relative flex-1">
        <Search
          className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
          aria-hidden="true"
        />
        <Input
          type="search"
          name="q"
          defaultValue={defaultValue}
          placeholder="검색어를 입력하세요..."
          className="pl-9"
          aria-label="검색어 입력"
        />
      </div>

      {/* 검색 버튼 */}
      <Button type="submit" variant="default" aria-label="검색 실행">
        검색
      </Button>
    </form>
  )
}
