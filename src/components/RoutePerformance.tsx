import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { MapPin } from 'lucide-react'

const data = [
  { route: '서울-부산', 정시율: 98.5, 만족도: 4.6, 수익: 45 },
  { route: '서울-대전', 정시율: 97.2, 만족도: 4.5, 수익: 32 },
  { route: '서울-대구', 정시율: 96.8, 만족도: 4.4, 수익: 28 },
  { route: '부산-대구', 정시율: 95.5, 만족도: 4.3, 수익: 18 },
  { route: '서울-광주', 정시율: 94.2, 만족도: 4.2, 수익: 15 },
]

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

export default function RoutePerformance() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <MapPin className="w-5 h-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">노선별 성과</h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis type="number" stroke="#6b7280" />
          <YAxis dataKey="route" type="category" stroke="#6b7280" width={100} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
            formatter={(value: number) => `${value}%`}
          />
          <Bar dataKey="정시율" radius={[0, 8, 8, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span className="text-gray-700">{item.route}</span>
            </div>
            <div className="flex items-center space-x-4 text-gray-600">
              <span>정시율: {item.정시율}%</span>
              <span>만족도: {item.만족도}/5.0</span>
              <span className="font-medium text-gray-900">수익: ₩{item.수익}억</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

