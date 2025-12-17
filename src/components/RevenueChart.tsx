import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { DollarSign } from 'lucide-react'

const data = [
  { month: '1월', 수익: 720, 예측: 680 },
  { month: '2월', 수익: 680, 예측: 700 },
  { month: '3월', 수익: 750, 예측: 720 },
  { month: '4월', 수익: 780, 예측: 750 },
  { month: '5월', 수익: 820, 예측: 780 },
  { month: '6월', 수익: 850, 예측: 820 },
  { month: '7월', 수익: 880, 예측: 850 },
  { month: '8월', 수익: 920, 예측: 880 },
  { month: '9월', 수익: 890, 예측: 900 },
  { month: '10월', 수익: 950, 예측: 920 },
  { month: '11월', 수익: 980, 예측: 950 },
  { month: '12월', 수익: 1020, 예측: 980 },
]

export default function RevenueChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <DollarSign className="w-5 h-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">월별 수익 추이 (억원)</h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Area
            type="monotone"
            dataKey="수익"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#colorRevenue)"
          />
          <Area
            type="monotone"
            dataKey="예측"
            stroke="#10b981"
            strokeDasharray="5 5"
            fillOpacity={1}
            fill="url(#colorForecast)"
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-gray-600">실제 수익</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded" style={{ background: 'repeating-linear-gradient(45deg, #10b981, #10b981 2px, transparent 2px, transparent 4px)' }}></div>
          <span className="text-gray-600">예측 수익</span>
        </div>
      </div>
    </div>
  )
}

