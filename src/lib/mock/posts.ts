/**
 * 개발/테스트용 목업 데이터
 *
 * Notion API 연동 전 UI 개발 시 사용합니다.
 * Post 타입 스키마 기준: src/types/post.ts
 */

import type { Post } from '@/types/post'

export const MOCK_POSTS: Post[] = [
  {
    id: 'mock-venue-1',
    title: '예식장',
    slug: 'venue',
    description: '예식장 선택 및 비용',
    totalAmount: 35000000,
    paymentStatus: 'partial',
    plannedPaymentDate: '2026-04-01',
    actualPaymentDate: null,
    itemIds: ['mock-item-1', 'mock-item-2'],
    lastEditedTime: '2026-06-16T00:00:00.000Z',
    items: [
      {
        id: 'mock-item-1',
        name: '대관료',
        unitPrice: 20000000,
        quantity: 1,
        totalAmount: 20000000,
        categoryId: 'mock-venue-1',
      },
      {
        id: 'mock-item-2',
        name: '식대 (1인)',
        unitPrice: 75000,
        quantity: 200,
        totalAmount: 15000000,
        categoryId: 'mock-venue-1',
      },
    ],
    content: [
      {
        id: 'block-venue-1',
        type: 'heading_2',
        content: '예식장 선정 과정',
      },
      {
        id: 'block-venue-2',
        type: 'paragraph',
        content:
          '서울 강남 지역 예식장 5곳을 직접 방문하여 견적을 받았습니다. 접근성과 주차 공간, 수용 인원을 기준으로 최종 결정했습니다.',
      },
      {
        id: 'block-venue-3',
        type: 'heading_3',
        content: '비용 협상 팁',
      },
      {
        id: 'block-venue-4',
        type: 'bulleted_list_item',
        content:
          '평일 또는 오전 타임을 선택하면 대관료를 20~30% 절약할 수 있습니다.',
      },
      {
        id: 'block-venue-5',
        type: 'bulleted_list_item',
        content:
          '식대는 예상 하객 수보다 10~15% 적게 계약하는 것이 일반적입니다.',
      },
      {
        id: 'block-venue-6',
        type: 'bulleted_list_item',
        content:
          '꽃 장식 패키지는 외부 업체를 통하면 절반 가격에 해결 가능합니다.',
      },
      {
        id: 'block-venue-7',
        type: 'divider',
        content: '',
      },
      {
        id: 'block-venue-8',
        type: 'quote',
        content:
          '"계약 전 반드시 취소 환불 정책을 꼼꼼히 확인하세요. 일부 업체는 계약금 환불이 불가합니다."',
      },
    ],
  },
  {
    id: 'mock-dress-1',
    title: '스드메',
    slug: 'dress',
    description: '스튜디오, 드레스, 메이크업',
    totalAmount: 2000000,
    paymentStatus: 'completed',
    plannedPaymentDate: '2026-06-16',
    actualPaymentDate: '2026-06-16',
    itemIds: ['mock-item-3', 'mock-item-4'],
    lastEditedTime: '2026-06-16T00:00:00.000Z',
    items: [
      {
        id: 'mock-item-3',
        name: '웨딩 스튜디오',
        unitPrice: 800000,
        quantity: 1,
        totalAmount: 800000,
        categoryId: 'mock-dress-1',
      },
      {
        id: 'mock-item-4',
        name: '드레스 대여',
        unitPrice: 700000,
        quantity: 1,
        totalAmount: 700000,
        categoryId: 'mock-dress-1',
      },
      {
        id: 'mock-item-5',
        name: '메이크업 & 헤어',
        unitPrice: 500000,
        quantity: 1,
        totalAmount: 500000,
        categoryId: 'mock-dress-1',
      },
    ],
    content: [
      {
        id: 'block-dress-1',
        type: 'heading_2',
        content: '스드메 패키지 선택 후기',
      },
      {
        id: 'block-dress-2',
        type: 'paragraph',
        content:
          '스튜디오, 드레스, 메이크업을 패키지로 묶어서 계약했습니다. 개별 계약보다 30만 원 정도 절약할 수 있었습니다.',
      },
      {
        id: 'block-dress-3',
        type: 'heading_3',
        content: '스튜디오 촬영 준비물',
      },
      {
        id: 'block-dress-4',
        type: 'numbered_list_item',
        content: '속옷은 드레스에 맞는 누드 컬러로 준비합니다.',
      },
      {
        id: 'block-dress-5',
        type: 'numbered_list_item',
        content: '피부 상태를 위해 촬영 2주 전부터 수분 관리를 시작합니다.',
      },
      {
        id: 'block-dress-6',
        type: 'numbered_list_item',
        content: '소품(반지, 귀걸이)은 미리 스튜디오와 협의합니다.',
      },
    ],
  },
  {
    id: 'mock-gifts-1',
    title: '예물',
    slug: 'gifts',
    description: '예물 및 예단 비용',
    totalAmount: 5000000,
    paymentStatus: 'pending',
    plannedPaymentDate: '2026-08-01',
    actualPaymentDate: null,
    itemIds: [],
    lastEditedTime: '2026-06-16T00:00:00.000Z',
    items: [],
    content: [
      {
        id: 'block-gifts-1',
        type: 'heading_2',
        content: '예물 준비 계획',
      },
      {
        id: 'block-gifts-2',
        type: 'paragraph',
        content:
          '예물은 반지, 시계 등을 교환할 예정입니다. 아직 구체적인 계획은 세우지 못했으나, 8월 내 완료를 목표로 하고 있습니다.',
      },
    ],
  },
  {
    id: 'mock-favors-1',
    title: '하객 선물',
    slug: 'favors',
    description: '하객 답례 선물',
    totalAmount: 3000000,
    paymentStatus: 'pending',
    plannedPaymentDate: null,
    actualPaymentDate: null,
    itemIds: [],
    lastEditedTime: '2026-06-16T00:00:00.000Z',
    items: [],
    content: [
      {
        id: 'block-favors-1',
        type: 'heading_2',
        content: '답례 선물 아이디어',
      },
      {
        id: 'block-favors-2',
        type: 'paragraph',
        content:
          '실용적이면서도 기억에 남는 선물을 고민 중입니다. 예산은 1인당 15,000원 내외로 계획하고 있습니다.',
      },
      {
        id: 'block-favors-3',
        type: 'bulleted_list_item',
        content: '티 세트 (차 2종 + 머그컵)',
      },
      {
        id: 'block-favors-4',
        type: 'bulleted_list_item',
        content: '소형 디퓨저',
      },
      {
        id: 'block-favors-5',
        type: 'bulleted_list_item',
        content: '수제 캔들',
      },
    ],
  },
  {
    id: 'mock-household-1',
    title: '신혼살림',
    slug: 'household',
    description: '신혼살림 준비 비용',
    totalAmount: 10000000,
    paymentStatus: 'pending',
    plannedPaymentDate: null,
    actualPaymentDate: null,
    itemIds: [],
    lastEditedTime: '2026-06-16T00:00:00.000Z',
    items: [],
    content: [
      {
        id: 'block-household-1',
        type: 'heading_2',
        content: '신혼살림 준비 목록',
      },
      {
        id: 'block-household-2',
        type: 'paragraph',
        content:
          '냉장고, 세탁기, 에어컨 등 필수 가전제품과 침구, 주방용품을 준비할 예정입니다. 혼수 박람회를 활용하면 비용을 절약할 수 있습니다.',
      },
    ],
  },
  {
    id: 'mock-honeymoon-1',
    title: '허니문',
    slug: 'honeymoon',
    description: '신혼여행 비용',
    totalAmount: 4000000,
    paymentStatus: 'pending',
    plannedPaymentDate: null,
    actualPaymentDate: null,
    itemIds: [],
    lastEditedTime: '2026-06-16T00:00:00.000Z',
    items: [],
    content: [
      {
        id: 'block-honeymoon-1',
        type: 'heading_2',
        content: '신혼여행 계획',
      },
      {
        id: 'block-honeymoon-2',
        type: 'paragraph',
        content:
          '유럽 또는 동남아시아 중 고민 중입니다. 여름 성수기를 피해 9월에 출발하는 것을 검토하고 있습니다.',
      },
    ],
  },
]
