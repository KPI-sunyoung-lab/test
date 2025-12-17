import { useState } from 'react'
import { Save } from 'lucide-react'
import { trackEvent } from '../../utils/mixpanel'

interface Setting {
  id: string
  label: string
  description: string
  value: string | boolean
  type: 'text' | 'number' | 'boolean' | 'select'
  options?: string[]
}

const settings: Setting[] = [
  {
    id: 'siteName',
    label: '사이트 이름',
    description: '대시보드에 표시되는 사이트 이름',
    value: '철도 대시보드',
    type: 'text',
  },
  {
    id: 'timezone',
    label: '시간대',
    description: '시스템 시간대 설정',
    value: 'Asia/Seoul',
    type: 'select',
    options: ['Asia/Seoul', 'UTC', 'America/New_York', 'Europe/London'],
  },
  {
    id: 'autoRefresh',
    label: '자동 새로고침',
    description: '대시보드 데이터 자동 새로고침 활성화',
    value: true,
    type: 'boolean',
  },
  {
    id: 'refreshInterval',
    label: '새로고침 간격 (초)',
    description: '자동 새로고침 간격 설정',
    value: '30',
    type: 'number',
  },
  {
    id: 'emailNotifications',
    label: '이메일 알림',
    description: '중요 이벤트 발생 시 이메일 알림 전송',
    value: true,
    type: 'boolean',
  },
  {
    id: 'dataRetention',
    label: '데이터 보관 기간 (일)',
    description: '로그 및 데이터 보관 기간',
    value: '90',
    type: 'number',
  },
]

export default function SystemSettings() {
  const [settingsState, setSettingsState] = useState<Setting[]>(settings)
  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (id: string, value: string | boolean) => {
    setSettingsState((prev) =>
      prev.map((setting) => (setting.id === id ? { ...setting, value } : setting))
    )
  }

  const handleSave = () => {
    setIsSaving(true)
    trackEvent('System Settings Saved', {
      settings: settingsState.map((s) => ({ id: s.id, value: s.value })),
    })
    setTimeout(() => {
      setIsSaving(false)
      alert('설정이 저장되었습니다.')
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">시스템 설정</h3>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? '저장 중...' : '저장'}</span>
        </button>
      </div>

      <div className="space-y-6">
        {settingsState.map((setting) => (
          <div key={setting.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <label className="text-sm font-medium text-gray-900">{setting.label}</label>
                <p className="text-xs text-gray-500 mt-1">{setting.description}</p>
              </div>
            </div>
            <div className="mt-3">
              {setting.type === 'boolean' ? (
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={setting.value as boolean}
                    onChange={(e) => handleChange(setting.id, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  <span className="ml-3 text-sm text-gray-700">
                    {setting.value ? '활성화' : '비활성화'}
                  </span>
                </label>
              ) : setting.type === 'select' ? (
                <select
                  value={setting.value as string}
                  onChange={(e) => handleChange(setting.id, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {setting.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={setting.type}
                  value={setting.value as string}
                  onChange={(e) => handleChange(setting.id, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

