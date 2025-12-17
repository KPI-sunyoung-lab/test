import { useState } from 'react'
import { Menu, Bell, Search, User, LogOut, Settings, Shield } from 'lucide-react'
import Popup from './Popup'
import { trackEvent } from '../utils/mixpanel'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [popupOpen, setPopupOpen] = useState(false)

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <img 
              src="/image/1.png" 
              alt="Logo" 
              className="h-8 w-auto object-contain hidden md:block"
            />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="검색..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => trackEvent('Notification Bell Clicked')}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={() => {
                setPopupOpen(true)
                trackEvent('Admin Menu Clicked', { location: 'header' })
              }}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">관리자</span>
            </button>
          </div>
        </div>
      </header>
      <Popup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        title="관리자 메뉴"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <User className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">프로필 보기</p>
                <p className="text-sm text-gray-500">계정 정보 및 설정</p>
              </div>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <Settings className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">계정 설정</p>
                <p className="text-sm text-gray-500">비밀번호 및 개인정보 변경</p>
              </div>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <Shield className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">권한 관리</p>
                <p className="text-sm text-gray-500">사용자 권한 설정</p>
              </div>
            </button>
            <div className="border-t border-gray-200 pt-2">
              <button
                onClick={() => {
                  trackEvent('Logout Clicked')
                  setPopupOpen(false)
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-50 transition-colors text-left text-red-600"
              >
                <LogOut className="w-5 h-5" />
                <div>
                  <p className="font-medium">로그아웃</p>
                  <p className="text-sm text-red-500">세션 종료</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </Popup>
    </>
  )
}

