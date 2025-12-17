import { useState } from 'react'
import { Filter, Download, RefreshCw, AlertCircle, Info, CheckCircle, XCircle } from 'lucide-react'

interface LogEntry {
  id: number
  timestamp: string
  level: 'info' | 'warning' | 'error' | 'success'
  category: string
  message: string
  user: string
}

const mockLogs: LogEntry[] = [
  {
    id: 1,
    timestamp: '2024-01-15 14:30:25',
    level: 'success',
    category: '인증',
    message: '사용자 로그인 성공: hong@railway.co.kr',
    user: '홍길동',
  },
  {
    id: 2,
    timestamp: '2024-01-15 14:28:10',
    level: 'info',
    category: '시스템',
    message: '데이터베이스 백업 완료',
    user: '시스템',
  },
  {
    id: 3,
    timestamp: '2024-01-15 14:25:45',
    level: 'warning',
    category: '운행',
    message: 'KTX 205호 지연 알림: 대전역 도착 지연 예상',
    user: '김철수',
  },
  {
    id: 4,
    timestamp: '2024-01-15 14:20:30',
    level: 'error',
    category: '시스템',
    message: '데이터베이스 연결 오류 (자동 복구됨)',
    user: '시스템',
  },
  {
    id: 5,
    timestamp: '2024-01-15 14:15:20',
    level: 'info',
    category: '사용자',
    message: '사용자 정보 수정: 이영희',
    user: '관리자',
  },
  {
    id: 6,
    timestamp: '2024-01-15 14:10:15',
    level: 'success',
    category: '데이터',
    message: '일일 리포트 생성 완료',
    user: '시스템',
  },
  {
    id: 7,
    timestamp: '2024-01-15 14:05:00',
    level: 'warning',
    category: '보안',
    message: '의심스러운 로그인 시도 감지: 192.168.1.100',
    user: '시스템',
  },
]

const levelColors = {
  info: 'bg-blue-100 text-blue-800 border-blue-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  error: 'bg-red-100 text-red-800 border-red-200',
  success: 'bg-green-100 text-green-800 border-green-200',
}

const levelIcons = {
  info: Info,
  warning: AlertCircle,
  error: XCircle,
  success: CheckCircle,
}

export default function SystemLogs() {
  const [logs] = useState<LogEntry[]>(mockLogs)
  const [filter, setFilter] = useState<'all' | 'info' | 'warning' | 'error' | 'success'>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const filteredLogs = logs.filter((log) => {
    const levelMatch = filter === 'all' || log.level === filter
    const categoryMatch = categoryFilter === 'all' || log.category === categoryFilter
    return levelMatch && categoryMatch
  })

  const categories = Array.from(new Set(logs.map((log) => log.category)))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">시스템 로그</h3>
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span>새로고침</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>내보내기</span>
          </button>
        </div>
      </div>

      {/* 필터 */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">레벨:</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">전체</option>
            <option value="info">정보</option>
            <option value="warning">경고</option>
            <option value="error">오류</option>
            <option value="success">성공</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">카테고리:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">전체</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 로그 목록 */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredLogs.map((log) => {
            const Icon = levelIcons[log.level]
            return (
              <div key={log.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${levelColors[log.level]}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${levelColors[log.level]}`}>
                          {log.level.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500">{log.category}</span>
                      </div>
                      <span className="text-xs text-gray-500">{log.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-900">{log.message}</p>
                    <p className="text-xs text-gray-500 mt-1">사용자: {log.user}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="text-sm text-gray-600">
        총 {filteredLogs.length}개의 로그 항목
      </div>
    </div>
  )
}

