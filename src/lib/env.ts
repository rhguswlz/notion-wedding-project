import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  VERCEL_URL: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  NOTION_TOKEN: z.string().min(1, 'NOTION_TOKEN은 필수입니다'),
  ADMIN_PASSWORD: z
    .string()
    .min(8, '관리자 비밀번호는 최소 8자 이상이어야 합니다'),
  ADMIN_SESSION_SECRET: z
    .string()
    .min(32, '세션 시크릿은 최소 32자 이상이어야 합니다'),
})

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  VERCEL_URL: process.env.VERCEL_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NOTION_TOKEN: process.env.NOTION_TOKEN,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  ADMIN_SESSION_SECRET: process.env.ADMIN_SESSION_SECRET,
})

export type Env = z.infer<typeof envSchema>
