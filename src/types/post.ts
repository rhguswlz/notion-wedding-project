import type { Block } from './block'

export interface Post {
  id: string
  title: string
  category: string
  tags: string[]
  publishedDate: Date
  status: 'draft' | 'published'
  content?: Block[]
}
