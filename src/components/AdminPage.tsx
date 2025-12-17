import { useState } from 'react'
import { Users, Settings, Database, Shield, FileText, Activity } from 'lucide-react'
import UserManagement from './admin/UserManagement'
import SystemSettings from './admin/SystemSettings'
import DataManagement from './admin/DataManagement'
import PermissionManagement from './admin/PermissionManagement'
import SystemLogs from './admin/SystemLogs'
import SystemStatus from './admin/SystemStatus'

type AdminTab = 'users' | 'settings' | 'data' | 'permissions' | 'logs' | 'status'

const tabs = [
  { id: 'users' as AdminTab, label: '사용자 관리', icon: Users },
  { id: 'settings' as AdminTab, label: '시스템 설정', icon: Settings },
  { id: 'data' as AdminTab, label: '데이터 관리', icon: Database },
  { id: 'permissions' as AdminTab, label: '권한 관리', icon: Shield },
  { id: 'logs' as AdminTab, label: '시스템 로그', icon: FileText },
  { id: 'status' as AdminTab, label: '시스템 상태', icon: Activity },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('users')

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />
      case 'settings':
        return <SystemSettings />
      case 'data':
        return <DataManagement />
      case 'permissions':
        return <PermissionManagement />
      case 'logs':
        return <SystemLogs />
      case 'status':
        return <SystemStatus />
      default:
        return <UserManagement />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">관리자 페이지</h2>
        <p className="text-gray-600">시스템 관리 및 설정</p>
      </div>

      {/* 탭 네비게이션 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-1 p-2" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* 탭 컨텐츠 */}
        <div className="p-6">{renderContent()}</div>
      </div>
    </div>
  )
}

