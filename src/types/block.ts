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

export interface Block {
  id: string
  type: BlockType
  content: string
  imageUrl?: string
  children?: Block[]
}
