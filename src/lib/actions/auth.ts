'use server'

import { cookies } from 'next/headers'
import { env } from '@/lib/env'
import crypto from 'crypto'

const SESSION_NAME = 'admin_session'
const SESSION_MAX_AGE = 24 * 60 * 60 // 24시간

export async function login(password: string) {
  if (password !== env.ADMIN_PASSWORD) {
    return { success: false, error: '비밀번호가 일치하지 않습니다' }
  }

  const session_id = crypto.randomUUID()
  const signature = crypto
    .createHmac('sha256', env.ADMIN_SESSION_SECRET)
    .update(session_id)
    .digest('hex')

  const cookie = await cookies()
  cookie.set(SESSION_NAME, `${session_id}.${signature}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  })

  return { success: true }
}

export async function logout() {
  const cookie = await cookies()
  cookie.delete(SESSION_NAME)
  return { success: true }
}

export async function verifySession(sessionCookie: string | undefined) {
  if (!sessionCookie) return null

  const [session_id, signature] = sessionCookie.split('.')
  if (!session_id || !signature) return null

  const expected_signature = crypto
    .createHmac('sha256', env.ADMIN_SESSION_SECRET)
    .update(session_id)
    .digest('hex')

  if (signature !== expected_signature) return null

  return { session_id }
}
