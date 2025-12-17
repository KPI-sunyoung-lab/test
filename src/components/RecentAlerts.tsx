import { AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react'

interface Alert {
  id: number
  type: 'success' | 'warning' | 'error' | 'info'
  title: string
  message: string
  time: string
}

const alerts: Alert[] = [
  {
    id: 1,
    type: 'success',
    title: '정상 운행',
    message: 'KTX 101호 서울-부산 노선 정상 운행 중',
    time: '2분 전',
  },
  {
    id: 2,
    type: 'warning',
    title: '지연 알림',
    message: 'KTX 205호 대전역 도착 지연 예상 (약 5분)',
    time: '15분 전',
  },
  {
    id: 3,
    type: 'info',
    title: '점검 완료',
    message: '서울역 3번 승강장 정기 점검 완료',
    time: '1시간 전',
  },
  {
    id: 4,
    type: 'error',
    title: '긴급 알림',
    message: '부산역 2번 승강장 시설 점검 필요',
    time: '2시간 전',
  },
  {
    id: 5,
    type: 'success',
    title: '정상 운행',
    message: 'SRT 301호 광주-서울 노선 정상 운행 중',
    time: '3시간 전',
  },
]

const iconMap = {
  success: CheckCircle,
  warning: AlertCircle,
  error: XCircle,
  info: Info,
}

const colorMap = {
  success: 'bg-green-50 border-green-200 text-green-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
}

const iconColorMap = {
  success: 'text-green-600',
  warning: 'text-yellow-600',
  error: 'text-red-600',
  info: 'text-blue-600',
}

export default function RecentAlerts() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">최근 알림</h3>
        </div>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          전체 보기
        </button>
      </div>
      <div className="space-y-3">
        {alerts.map((alert) => {
          const Icon = iconMap[alert.type]
          return (
            <div
              key={alert.id}
              className={`flex items-start space-x-3 p-4 rounded-lg border ${colorMap[alert.type]}`}
            >
              <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconColorMap[alert.type]}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium">{alert.title}</h4>
                  <span className="text-xs opacity-70">{alert.time}</span>
                </div>
                <p className="text-sm opacity-90">{alert.message}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

