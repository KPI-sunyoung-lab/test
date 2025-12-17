import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Train } from 'lucide-react'

const data = [
  { time: '00:00', 운행중: 45, 대기: 12, 점검: 3 },
  { time: '04:00', 운행중: 38, 대기: 15, 점검: 5 },
  { time: '08:00', 운행중: 120, 대기: 8, 점검: 2 },
  { time: '12:00', 운행중: 135, 대기: 5, 점검: 1 },
  { time: '16:00', 운행중: 142, 대기: 4, 점검: 2 },
  { time: '20:00', 운행중: 98, 대기: 10, 점검: 3 },
  { time: '24:00', 운행중: 52, 대기: 14, 점검: 4 },
]

export default function TrainStatusChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Train className="w-5 h-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">시간대별 열차 운행 현황</h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="time" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="운행중"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="대기"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={{ fill: '#f59e0b', r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="점검"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ fill: '#ef4444', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

