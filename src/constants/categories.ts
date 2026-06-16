import type { Category } from '@/types/category'

export const CATEGORIES: Category[] = [
  { name: '예식장', slug: 'venue', description: '예식장 선택 및 비용' },
  {
    name: '스드메',
    slug: 'dress',
    description: '스튜디오, 드레스, 메이크업',
  },
  { name: '예물', slug: 'gifts', description: '예물 및 예단 비용' },
  { name: '하객 선물', slug: 'favors', description: '하객 답례 선물' },
  { name: '신혼살림', slug: 'household', description: '신혼살림 준비 비용' },
  { name: '허니문', slug: 'honeymoon', description: '신혼여행 비용' },
] as const
