import { useState } from 'react'
import { Plus, Search, Edit, Trash2, Mail, Phone, Shield } from 'lucide-react'

interface User {
  id: number
  name: string
  email: string
  phone: string
  role: string
  status: 'active' | 'inactive'
  lastLogin: string
}

const mockUsers: User[] = [
  {
    id: 1,
    name: '홍길동',
    email: 'hong@railway.co.kr',
    phone: '010-1234-5678',
    role: '관리자',
    status: 'active',
    lastLogin: '2024-01-15 14:30',
  },
  {
    id: 2,
    name: '김철수',
    email: 'kim@railway.co.kr',
    phone: '010-2345-6789',
    role: '운영자',
    status: 'active',
    lastLogin: '2024-01-15 13:20',
  },
  {
    id: 3,
    name: '이영희',
    email: 'lee@railway.co.kr',
    phone: '010-3456-7890',
    role: '운영자',
    status: 'active',
    lastLogin: '2024-01-15 12:10',
  },
  {
    id: 4,
    name: '박민수',
    email: 'park@railway.co.kr',
    phone: '010-4567-8901',
    role: '조회자',
    status: 'inactive',
    lastLogin: '2024-01-14 18:45',
  },
  {
    id: 5,
    name: '최지영',
    email: 'choi@railway.co.kr',
    phone: '010-5678-9012',
    role: '조회자',
    status: 'active',
    lastLogin: '2024-01-15 11:30',
  },
]

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRoleColor = (role: string) => {
    switch (role) {
      case '관리자':
        return 'bg-red-100 text-red-800'
      case '운영자':
        return 'bg-blue-100 text-blue-800'
      case '조회자':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">사용자 관리</h3>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>사용자 추가</span>
        </button>
      </div>

      {/* 검색 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="이름 또는 이메일로 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* 사용자 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">이름</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">이메일</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">전화번호</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">역할</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">최종 로그인</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">작업</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{user.phone}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {user.status === 'active' ? '활성' : '비활성'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{user.lastLogin}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-sm text-gray-600">
        총 {filteredUsers.length}명의 사용자
      </div>
    </div>
  )
}

