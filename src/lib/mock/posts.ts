import type { Post } from '@/types/post'

export const MOCK_POSTS: Post[] = [
  {
    id: 'mock-1',
    title: '예식장 선택 가이드 - 우리의 경험담',
    category: '예식장',
    tags: ['예식장', '비용', '팁'],
    publishedDate: new Date('2024-01-15'),
    status: 'published',
  },
  {
    id: 'mock-2',
    title: '드레스 쇼핑 후기 - 완벽한 웨딩드레스 찾기',
    category: '스드메',
    tags: ['드레스', '스튜디오', '신부'],
    publishedDate: new Date('2024-01-10'),
    status: 'published',
  },
  {
    id: 'mock-3',
    title: '예물 선택 팁 - 전통에서 트렌드까지',
    category: '예물',
    tags: ['예물', '결혼준비', '전통'],
    publishedDate: new Date('2024-01-05'),
    status: 'published',
  },
  {
    id: 'mock-4',
    title: '하객 선물 추천 - 센스있는 답례품',
    category: '하객 선물',
    tags: ['선물', '하객', '감사'],
    publishedDate: new Date('2023-12-28'),
    status: 'published',
  },
  {
    id: 'mock-5',
    title: '신혼집 가구 선택 가이드',
    category: '신혼살림',
    tags: ['신혼살림', '인테리어', '가구'],
    publishedDate: new Date('2023-12-20'),
    status: 'published',
  },
  {
    id: 'mock-6',
    title: '허니문 일정 짜기 - 최적의 목적지',
    category: '허니문',
    tags: ['여행', '허니문', '일정'],
    publishedDate: new Date('2023-12-10'),
    status: 'published',
  },
]
