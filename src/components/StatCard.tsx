import { Train, Users, Clock, DollarSign, TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: 'train' | 'users' | 'clock' | 'dollar'
  color: 'blue' | 'green' | 'yellow' | 'purple'
}

const iconMap = {
  train: Train,
  users: Users,
  clock: Clock,
  dollar: DollarSign,
}

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-green-50 text-green-600',
  yellow: 'bg-yellow-50 text-yellow-600',
  purple: 'bg-purple-50 text-purple-600',
}

export default function StatCard({ title, value, change, trend, icon, color }: StatCardProps) {
  const Icon = iconMap[icon]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center space-x-1 text-sm ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend === 'up' ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>{change}</span>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  )
}

