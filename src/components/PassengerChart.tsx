import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Users } from 'lucide-react'

const data = [
  { station: '서울역', 승차: 125000, 하차: 118000 },
  { station: '부산역', 승차: 89000, 하차: 92000 },
  { station: '대전역', 승차: 67000, 하차: 65000 },
  { station: '대구역', 승차: 54000, 하차: 56000 },
  { station: '광주역', 승차: 42000, 하차: 41000 },
  { station: '인천역', 승차: 38000, 하차: 39000 },
]

export default function PassengerChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Users className="w-5 h-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">역별 승하차 인원</h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="station" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Bar dataKey="승차" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          <Bar dataKey="하차" fill="#10b981" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

