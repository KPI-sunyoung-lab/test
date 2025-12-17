import StatCard from './StatCard'
import TrainStatusChart from './TrainStatusChart'
import PassengerChart from './PassengerChart'
import RevenueChart from './RevenueChart'
import RoutePerformance from './RoutePerformance'
import RecentAlerts from './RecentAlerts'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">대시보드 개요</h2>
        <p className="text-gray-600">실시간 철도 운영 현황 및 통계</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="운행 중인 열차"
          value="142"
          change="+5.2%"
          trend="up"
          icon="train"
          color="blue"
        />
        <StatCard
          title="오늘 승객 수"
          value="1,234,567"
          change="+12.3%"
          trend="up"
          icon="users"
          color="green"
        />
        <StatCard
          title="정시 운행률"
          value="96.8%"
          change="-1.2%"
          trend="down"
          icon="clock"
          color="yellow"
        />
        <StatCard
          title="일일 수익"
          value="₩2.4억"
          change="+8.7%"
          trend="up"
          icon="dollar"
          color="purple"
        />
      </div>

      {/* 차트 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrainStatusChart />
        <PassengerChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <RoutePerformance />
      </div>

      {/* 최근 알림 */}
      <RecentAlerts />
    </div>
  )
}

