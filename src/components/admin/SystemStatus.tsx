import { Activity, Server, Database, Cpu, HardDrive, Wifi } from 'lucide-react'

interface SystemMetric {
  name: string
  value: string
  status: 'healthy' | 'warning' | 'critical'
  icon: any
}

const metrics: SystemMetric[] = [
  {
    name: 'CPU 사용률',
    value: '45%',
    status: 'healthy',
    icon: Cpu,
  },
  {
    name: '메모리 사용률',
    value: '62%',
    status: 'healthy',
    icon: Activity,
  },
  {
    name: '디스크 사용률',
    value: '78%',
    status: 'warning',
    icon: HardDrive,
  },
  {
    name: '네트워크',
    value: '정상',
    status: 'healthy',
    icon: Wifi,
  },
  {
    name: '데이터베이스',
    value: '정상',
    status: 'healthy',
    icon: Database,
  },
  {
    name: '서버 상태',
    value: '온라인',
    status: 'healthy',
    icon: Server,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'healthy':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'warning':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'critical':
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

export default function SystemStatus() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">시스템 상태</h3>
        <p className="text-sm text-gray-600 mt-1">실시간 시스템 리소스 및 상태 모니터링</p>
      </div>

      {/* 시스템 메트릭 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <div
              key={index}
              className={`border rounded-lg p-4 ${getStatusColor(metric.status)}`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-5 h-5" />
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(metric.status)}`}>
                  {metric.status === 'healthy' ? '정상' : metric.status === 'warning' ? '경고' : '위험'}
                </span>
              </div>
              <h4 className="font-medium mb-1">{metric.name}</h4>
              <p className="text-2xl font-bold">{metric.value}</p>
            </div>
          )
        })}
      </div>

      {/* 서비스 상태 */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-900">서비스 상태</h4>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            { name: '웹 서버', status: 'online', uptime: '99.9%' },
            { name: '데이터베이스', status: 'online', uptime: '99.8%' },
            { name: 'API 서버', status: 'online', uptime: '99.7%' },
            { name: '캐시 서버', status: 'online', uptime: '99.9%' },
          ].map((service, index) => (
            <div key={index} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{service.name}</p>
                <p className="text-sm text-gray-600">가동률: {service.uptime}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">{service.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 최근 이벤트 */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-900">최근 이벤트</h4>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            { time: '2분 전', event: '시스템 백업 완료', status: 'success' },
            { time: '15분 전', event: '데이터베이스 최적화 완료', status: 'success' },
            { time: '1시간 전', event: '서버 재시작', status: 'info' },
            { time: '3시간 전', event: '보안 업데이트 적용', status: 'success' },
          ].map((event, index) => (
            <div key={index} className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900">{event.event}</p>
                <p className="text-xs text-gray-500 mt-1">{event.time}</p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  event.status === 'success'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {event.status === 'success' ? '완료' : '정보'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

