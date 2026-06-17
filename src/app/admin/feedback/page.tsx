'use client'

import { useState } from 'react'

export default function FeedbackPage() {
  const [feedbacks] = useState([
    {
      id: 1,
      author: '김민영',
      email: 'kim@example.com',
      message: '예물 선택 팁이 정말 도움이 되었어요!',
      post: '예물 선택 팁 10가지',
      date: '2026-06-17',
      status: 'new' as const,
    },
    {
      id: 2,
      author: '이소연',
      email: 'lee@example.com',
      message:
        '스드메 금액이 생각보다 비싸네요. 가격대별 정보도 있으면 좋겠습니다.',
      post: '스드메 셀렉션 가이드',
      date: '2026-06-16',
      status: 'new' as const,
    },
    {
      id: 3,
      author: '박준호',
      email: 'park@example.com',
      message: '예식장 선택 기준이 정말 실용적입니다.',
      post: '예식장 비용 분석',
      date: '2026-06-15',
      status: 'reviewed' as const,
    },
  ])

  const newCount = feedbacks.filter(f => f.status === 'new').length

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-800">
          새로운 피드백 <span className="font-bold">{newCount}개</span>
        </p>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
          <h3 className="font-bold text-slate-900">피드백 목록</h3>
        </div>
        <div className="divide-y divide-slate-200">
          {feedbacks.map(feedback => (
            <div
              key={feedback.id}
              className={`p-6 transition hover:bg-slate-50 ${
                feedback.status === 'new' ? 'bg-blue-50' : ''
              }`}
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-slate-900">
                      {feedback.author}
                    </h4>
                    {feedback.status === 'new' && (
                      <span className="rounded bg-blue-600 px-2 py-1 text-xs text-white">
                        새로움
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500">{feedback.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600">{feedback.date}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    📝 {feedback.post}
                  </p>
                </div>
              </div>
              <p className="mb-4 rounded border border-slate-200 bg-white p-3 text-slate-700">
                {feedback.message}
              </p>
              <div className="flex gap-2">
                <button className="rounded-lg bg-green-100 px-3 py-1 text-sm font-medium text-green-700 transition hover:bg-green-200">
                  승인
                </button>
                <button className="rounded-lg bg-red-100 px-3 py-1 text-sm font-medium text-red-700 transition hover:bg-red-200">
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
