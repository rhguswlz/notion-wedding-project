import { Client } from '@notionhq/client'
import { env } from '@/lib/env'

const notionClient = new Client({ auth: env.NOTION_TOKEN })

export default notionClient
