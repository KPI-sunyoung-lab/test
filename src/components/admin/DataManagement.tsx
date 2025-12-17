import { useState } from 'react'
import { Download, Upload, Trash2, RefreshCw, Database, FileText } from 'lucide-react'

interface DataBackup {
  id: number
  name: string
  type: string
  size: string
  date: string
  status: 'success' | 'pending' | 'failed'
}

const mockBackups: DataBackup[] = [
  {
    id: 1,
    name: 'backup_2024_01_15_full.sql',
    type: '전체 백업',
    size: '2.4 GB',
    date: '2024-01-15 03:00',
    status: 'success',
  },
  {
    id: 2,
    name: 'backup_2024_01_14_incremental.sql',
    type: '증분 백업',
    size: '450 MB',
    date: '2024-01-14 03:00',
    status: 'success',
  },
  {
    id: 3,
    name: 'backup_2024_01_13_full.sql',
    type: '전체 백업',
    size: '2.3 GB',
    date: '2024-01-13 03:00',
    status: 'success',
  },
]

export default function DataManagement() {
  const [backups, setBackups] = useState<DataBackup[]>(mockBackups)
  const [isBackingUp, setIsBackingUp] = useState(false)

  const handleBackup = () => {
    setIsBackingUp(true)
    setTimeout(() => {
      setIsBackingUp(false)
      alert('백업이 완료되었습니다.')
    }, 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">데이터 관리</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleBackup}
            disabled={isBackingUp}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            <Database className="w-4 h-4" />
            <span>{isBackingUp ? '백업 중...' : '백업 생성'}</span>
          </button>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Database className="w-5 h-5 text-blue-600" />
            <h4 className="font-medium text-blue-900">데이터베이스 크기</h4>
          </div>
          <p className="text-2xl font-bold text-blue-900">12.5 GB</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <FileText className="w-5 h-5 text-green-600" />
            <h4 className="font-medium text-green-900">백업 파일 수</h4>
          </div>
          <p className="text-2xl font-bold text-green-900">{backups.length}</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <RefreshCw className="w-5 h-5 text-purple-600" />
            <h4 className="font-medium text-purple-900">마지막 백업</h4>
          </div>
          <p className="text-sm font-medium text-purple-900">{backups[0]?.date}</p>
        </div>
      </div>

      {/* 백업 목록 */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-900">백업 목록</h4>
        </div>
        <div className="divide-y divide-gray-200">
          {backups.map((backup) => (
            <div key={backup.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{backup.name}</p>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                        <span>{backup.type}</span>
                        <span>•</span>
                        <span>{backup.size}</span>
                        <span>•</span>
                        <span>{backup.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(backup.status)}`}
                  >
                    {backup.status === 'success' ? '완료' : backup.status === 'pending' ? '진행중' : '실패'}
                  </span>
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

