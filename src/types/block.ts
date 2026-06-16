/**
 * Notion 블록 타입 정의
 *
 * Notion 페이지 본문은 블록(Block)의 배열로 구성됩니다.
 * 이 앱에서는 Category DB 페이지의 블록을 경험담 콘텐츠로 활용합니다.
 *
 * 지원하는 Notion 블록 타입:
 * - heading_1, heading_2, heading_3: 제목 블록
 * - paragraph: 일반 텍스트 단락
 * - bulleted_list_item: 순서 없는 목록 항목
 * - numbered_list_item: 순서 있는 목록 항목
 * - quote: 인용문
 * - image: 이미지 (외부 URL 또는 Notion 업로드 파일)
 * - divider: 구분선
 *
 * 미지원 블록(callout, code, table 등)은 paragraph로 폴백 처리됩니다.
 */

/**
 * 앱에서 지원하는 Notion 블록 유형
 */
export type BlockType =
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  | 'paragraph'
  | 'image'
  | 'bulleted_list_item'
  | 'numbered_list_item'
  | 'quote'
  | 'divider'

/**
 * 정규화된 Notion 블록 데이터
 *
 * Notion API 원본 BlockObjectResponse에서 필요한 필드만 추출한 구조입니다.
 */
export interface Block {
  /** Notion 블록 ID */
  id: string
  /** 블록 유형 */
  type: BlockType
  /**
   * 블록 텍스트 콘텐츠
   * - 텍스트 블록(paragraph, heading, list, quote): 추출된 plain text
   * - image 블록: alt 텍스트 또는 빈 문자열
   * - divider 블록: 빈 문자열
   */
  content: string
  /**
   * 이미지 URL (type === 'image'일 때만 존재)
   * - Notion 외부 이미지: external.url 값
   * - Notion 업로드 이미지: file.url 값 (만료 기간 있음)
   */
  imageUrl?: string
  /**
   * 중첩 자식 블록 목록 (재귀 구조)
   * Notion에서 들여쓰기된 블록 처리에 사용합니다.
   */
  children?: Block[]
}
