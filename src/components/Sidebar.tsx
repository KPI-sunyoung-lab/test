import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Train, BarChart3, Users, DollarSign, MapPin, Settings, AlertCircle, Shield } from 'lucide-react'
import Popup from './Popup'
import { trackEvent } from '../utils/mixpanel'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  currentPath: string
}

const menuItems = [
  { icon: BarChart3, label: '대시보드', path: '/' },
  { icon: Train, label: '운행 현황', path: '/trains' },
  { icon: Users, label: '승객 통계', path: '/passengers' },
  { icon: DollarSign, label: '수익 분석', path: '/revenue' },
  { icon: MapPin, label: '노선 분석', path: '/routes' },
  { icon: AlertCircle, label: '안전 관리', path: '/safety' },
  { icon: Shield, label: '관리자', path: '/admin' },
  { icon: Settings, label: '설정', path: '/settings' },
]

export default function Sidebar({ isOpen, currentPath }: SidebarProps) {
  const [popupOpen, setPopupOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string>('')

  const handleMenuClick = (e: React.MouseEvent, item: typeof menuItems[0]) => {
    if (!item.path.startsWith('/admin') && currentPath !== item.path) {
      // 활성화되지 않은 메뉴 항목 클릭 시 팝업 표시
      e.preventDefault()
      setSelectedItem(item.label)
      setPopupOpen(true)
      trackEvent('Menu Item Clicked', {
        menuItem: item.label,
        path: item.path,
        isActive: false,
      })
    } else {
      // 활성 메뉴 항목 클릭 시에도 추적
      trackEvent('Menu Item Clicked', {
        menuItem: item.label,
        path: item.path,
        isActive: true,
      })
    }
  }

  return (
    <>
      {isOpen && (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Train className="w-8 h-8 text-primary-600" />
              <h1 className="text-xl font-bold text-gray-900">철도 대시보드</h1>
            </div>
          </div>
          <nav className="flex-1 p-4 space-y-2 bg-orange-50">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              const isActive = currentPath === item.path
              return (
                <Link
                  key={index}
                  to={item.path}
                  onClick={(e) => handleMenuClick(e, item)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </aside>
      )}
      <Popup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        title={`${selectedItem} 메뉴`}
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            <strong>{selectedItem}</strong> 메뉴를 선택하셨습니다.
          </p>
          <p className="text-sm text-gray-500">
            이 기능은 현재 개발 중입니다. 곧 이용하실 수 있습니다.
          </p>
          <div className="flex justify-end space-x-2 pt-4">
            <button
              onClick={() => setPopupOpen(false)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      </Popup>
    </>
  )
}

