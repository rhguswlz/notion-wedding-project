/**
 * Notion 블록 렌더러 컴포넌트
 *
 * Block 배열을 입력받아 각 블록 타입에 맞는 HTML 요소로 렌더링합니다.
 * 지원 블록: heading_1~3, paragraph, bulleted_list_item, numbered_list_item,
 *            quote, divider, image
 * 미지원 블록 타입은 렌더링을 건너뜁니다.
 */

import Image from 'next/image'
import type { Block } from '@/types/block'

interface BlockRendererProps {
  blocks: Block[]
}

/**
 * 개별 블록 렌더링 컴포넌트
 */
function BlockItem({ block }: { block: Block }) {
  switch (block.type) {
    case 'heading_1':
      return (
        <h1 className="mt-8 mb-4 scroll-m-20 text-4xl font-bold tracking-tight">
          {block.content}
        </h1>
      )

    case 'heading_2':
      return (
        <h2 className="mt-8 mb-3 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
          {block.content}
        </h2>
      )

    case 'heading_3':
      return (
        <h3 className="mt-6 mb-2 scroll-m-20 text-2xl font-semibold tracking-tight">
          {block.content}
        </h3>
      )

    case 'paragraph':
      return (
        <p className="text-foreground/90 mb-4 leading-7 [&:not(:first-child)]:mt-2">
          {block.content}
        </p>
      )

    case 'bulleted_list_item':
      return (
        <li className="text-foreground/90 mb-1.5 ml-4 list-disc leading-7">
          {block.content}
        </li>
      )

    case 'numbered_list_item':
      return (
        <li className="text-foreground/90 mb-1.5 ml-4 list-decimal leading-7">
          {block.content}
        </li>
      )

    case 'quote':
      return (
        <blockquote className="border-primary/30 text-muted-foreground my-6 border-l-4 pl-4 italic">
          {block.content}
        </blockquote>
      )

    case 'divider':
      return <hr className="border-border my-8" aria-hidden="true" />

    case 'image':
      return block.imageUrl ? (
        <figure className="my-6">
          <div className="relative w-full overflow-hidden rounded-lg">
            {/* Next.js Image 컴포넌트를 사용하여 이미지 최적화 */}
            {/* Notion 이미지는 remote pattern에 등록되어 있음 */}
            <Image
              src={block.imageUrl}
              alt={block.content || '웨딩 비용 관련 이미지'}
              width={800}
              height={600}
              quality={85}
              loading="lazy"
              className="h-auto w-full rounded-lg object-cover"
            />
          </div>
          {block.content && (
            <figcaption className="text-muted-foreground mt-2 text-center text-sm">
              {block.content}
            </figcaption>
          )}
        </figure>
      ) : null

    default:
      // 미지원 블록 타입은 렌더링 건너뜀
      return null
  }
}

/**
 * 연속된 list item을 그룹으로 묶는 헬퍼 함수
 */
function groupBlocks(blocks: Block[]) {
  const groups: Array<
    { type: 'list' | 'single'; listType?: string; items: Block[] } | Block
  > = []
  let i = 0

  while (i < blocks.length) {
    const block = blocks[i]

    if (
      block.type === 'bulleted_list_item' ||
      block.type === 'numbered_list_item'
    ) {
      // 동일 타입의 연속 블록을 그룹으로 묶음
      const listType = block.type
      const items: Block[] = [block]

      while (i + 1 < blocks.length && blocks[i + 1].type === listType) {
        i++
        items.push(blocks[i])
      }

      groups.push({ type: 'list', listType, items })
    } else {
      groups.push(block)
    }

    i++
  }

  return groups
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null
  }

  const grouped = groupBlocks(blocks)

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      {grouped.map((group, index) => {
        // 리스트 그룹 처리
        if (
          typeof group === 'object' &&
          'type' in group &&
          group.type === 'list'
        ) {
          const listGroup = group as {
            type: 'list'
            listType: string
            items: Block[]
          }

          if (listGroup.listType === 'bulleted_list_item') {
            return (
              <ul key={index} className="my-4 ml-4 list-disc space-y-1">
                {listGroup.items.map(item => (
                  <BlockItem key={item.id} block={item} />
                ))}
              </ul>
            )
          }

          if (listGroup.listType === 'numbered_list_item') {
            return (
              <ol key={index} className="my-4 ml-4 list-decimal space-y-1">
                {listGroup.items.map(item => (
                  <BlockItem key={item.id} block={item} />
                ))}
              </ol>
            )
          }
        }

        // 단일 블록 처리
        const block = group as Block
        return <BlockItem key={block.id} block={block} />
      })}
    </div>
  )
}
