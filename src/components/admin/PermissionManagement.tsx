import { useState } from 'react'
import { Shield, Check, X } from 'lucide-react'

interface Permission {
  id: string
  name: string
  description: string
}

interface Role {
  id: string
  name: string
  permissions: string[]
}

const permissions: Permission[] = [
  { id: 'dashboard_view', name: '대시보드 조회', description: '대시보드 데이터 조회 권한' },
  { id: 'train_manage', name: '열차 관리', description: '열차 정보 수정 및 관리 권한' },
  { id: 'user_manage', name: '사용자 관리', description: '사용자 추가, 수정, 삭제 권한' },
  { id: 'settings_manage', name: '설정 관리', description: '시스템 설정 변경 권한' },
  { id: 'data_export', name: '데이터 내보내기', description: '데이터 내보내기 및 백업 권한' },
  { id: 'log_view', name: '로그 조회', description: '시스템 로그 조회 권한' },
  { id: 'admin_access', name: '관리자 접근', description: '관리자 페이지 접근 권한' },
]

const roles: Role[] = [
  {
    id: 'admin',
    name: '관리자',
    permissions: ['dashboard_view', 'train_manage', 'user_manage', 'settings_manage', 'data_export', 'log_view', 'admin_access'],
  },
  {
    id: 'operator',
    name: '운영자',
    permissions: ['dashboard_view', 'train_manage', 'log_view'],
  },
  {
    id: 'viewer',
    name: '조회자',
    permissions: ['dashboard_view'],
  },
]

export default function PermissionManagement() {
  const [rolesState, setRolesState] = useState<Role[]>(roles)

  const togglePermission = (roleId: string, permissionId: string) => {
    setRolesState((prev) =>
      prev.map((role) => {
        if (role.id === roleId) {
          const hasPermission = role.permissions.includes(permissionId)
          return {
            ...role,
            permissions: hasPermission
              ? role.permissions.filter((p) => p !== permissionId)
              : [...role.permissions, permissionId],
          }
        }
        return role
      })
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">권한 관리</h3>
        <p className="text-sm text-gray-600 mt-1">역할별 권한을 설정하고 관리합니다.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border border-gray-200">
                권한
              </th>
              {rolesState.map((role) => (
                <th
                  key={role.id}
                  className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase border border-gray-200"
                >
                  {role.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissions.map((permission) => (
              <tr key={permission.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 border border-gray-200">
                  <div>
                    <p className="font-medium text-gray-900">{permission.name}</p>
                    <p className="text-xs text-gray-500">{permission.description}</p>
                  </div>
                </td>
                {rolesState.map((role) => {
                  const hasPermission = role.permissions.includes(permission.id)
                  return (
                    <td key={role.id} className="px-4 py-3 border border-gray-200 text-center">
                      <button
                        onClick={() => togglePermission(role.id, permission.id)}
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                          hasPermission
                            ? 'bg-green-100 text-green-600 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        {hasPermission ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <X className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">권한 관리 안내</h4>
            <p className="text-sm text-blue-700 mt-1">
              권한 변경 사항은 즉시 적용됩니다. 사용자에게 영향을 미칠 수 있으므로 신중하게 변경하세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

