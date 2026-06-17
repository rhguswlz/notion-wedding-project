'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/actions/auth'

export default function LoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await login(password)
      if (result.success) {
        router.push('/admin')
        router.refresh()
      } else {
        setError(result.error || '로그인에 실패했습니다')
      }
    } catch (err) {
      setError('오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">관리자</h1>
          <p className="mt-2 text-slate-600">웨딩 비용 정리 블로그</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-lg border border-red-300 bg-red-100 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-900">
              비밀번호
            </label>
            <input
              type="password"
              placeholder="관리자 비밀번호를 입력하세요"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-slate-100"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:bg-slate-400"
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          © 2026 웨딩 블로그 관리자
        </p>
      </div>
    </div>
  )
}
