'use client'

import { useState } from 'react'

export type PostStatusFilter = 'all' | 'published' | 'unpublished' | 'archived'

interface PostStatusFilterProps {
  counts: {
    all: number
    published: number
    unpublished: number
    archived: number
  }
  onFilterChange: (status: PostStatusFilter) => void
}

export function PostStatusFilter({
  counts,
  onFilterChange,
}: PostStatusFilterProps) {
  const [activeStatus, setActiveStatus] = useState<PostStatusFilter>('all')

  const handleStatusChange = (status: PostStatusFilter) => {
    setActiveStatus(status)
    onFilterChange(status)
  }

  const tabs = [
    { value: 'all' as const, label: '전체', count: counts.all, color: 'gray' },
    {
      value: 'published' as const,
      label: '발행',
      count: counts.published,
      color: 'green',
    },
    {
      value: 'unpublished' as const,
      label: '미발행',
      count: counts.unpublished,
      color: 'red',
    },
    {
      value: 'archived' as const,
      label: '아카이브',
      count: counts.archived,
      color: 'purple',
    },
  ]

  return (
    <div className="mb-6 flex gap-2 border-b border-slate-200">
      {tabs.map(tab => (
        <button
          key={tab.value}
          onClick={() => handleStatusChange(tab.value)}
          className={`border-b-2 px-4 py-2 text-sm font-medium transition ${
            activeStatus === tab.value
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          {tab.label} <span className="ml-1 text-xs">({tab.count})</span>
        </button>
      ))}
    </div>
  )
}
