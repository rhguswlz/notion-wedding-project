import type {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'
import type { Post } from '@/types/post'
import type { Block, BlockType } from '@/types/block'

export function extractTextContent(richText: RichTextItemResponse[]): string {
  return richText
    .map(item => {
      if (item.type === 'text') {
        return item.text.content
      }
      if (item.type === 'mention') {
        return ''
      }
      if (item.type === 'equation') {
        return item.equation.expression
      }
      return ''
    })
    .join('')
}

export function getPropertyValue(
  properties: PageObjectResponse['properties'],
  propertyName: string
): unknown {
  const property = properties[propertyName]
  if (!property) return null

  switch (property.type) {
    case 'title':
      return extractTextContent(property.title)
    case 'rich_text':
      return extractTextContent(property.rich_text)
    case 'select':
      return property.select?.name || null
    case 'multi_select':
      return property.multi_select.map(item => item.name)
    case 'date':
      return property.date?.start || null
    case 'checkbox':
      return property.checkbox
    case 'status':
      return property.status?.name || null
    default:
      return null
  }
}

export function parsePost(page: PageObjectResponse): Post {
  const title = getPropertyValue(page.properties, 'Title') as string
  const category = getPropertyValue(page.properties, 'Category') as string
  const tags = (getPropertyValue(page.properties, 'Tags') as string[]) || []
  const publishedDateStr = getPropertyValue(
    page.properties,
    'PublishedDate'
  ) as string
  const status =
    (getPropertyValue(page.properties, 'Status') as string) || 'draft'

  return {
    id: page.id,
    title,
    category,
    tags,
    publishedDate: publishedDateStr ? new Date(publishedDateStr) : new Date(),
    status: status === 'Published' ? 'published' : 'draft',
  }
}

export function parseBlock(block: BlockObjectResponse): Block {
  let content = ''
  let blockType: BlockType = 'paragraph'
  let imageUrl: string | undefined

  switch (block.type) {
    case 'heading_1':
      blockType = 'heading_1'
      content = extractTextContent(block.heading_1.rich_text)
      break
    case 'heading_2':
      blockType = 'heading_2'
      content = extractTextContent(block.heading_2.rich_text)
      break
    case 'heading_3':
      blockType = 'heading_3'
      content = extractTextContent(block.heading_3.rich_text)
      break
    case 'paragraph':
      blockType = 'paragraph'
      content = extractTextContent(block.paragraph.rich_text)
      break
    case 'image':
      blockType = 'image'
      if (block.image.type === 'external') {
        imageUrl = block.image.external.url
      } else if (block.image.type === 'file') {
        imageUrl = block.image.file.url
      }
      break
    case 'bulleted_list_item':
      blockType = 'bulleted_list_item'
      content = extractTextContent(block.bulleted_list_item.rich_text)
      break
    case 'numbered_list_item':
      blockType = 'numbered_list_item'
      content = extractTextContent(block.numbered_list_item.rich_text)
      break
    case 'quote':
      blockType = 'quote'
      content = extractTextContent(block.quote.rich_text)
      break
    case 'divider':
      blockType = 'divider'
      break
    default:
      blockType = 'paragraph'
      content = ''
  }

  return {
    id: block.id,
    type: blockType,
    content,
    imageUrl,
  }
}
