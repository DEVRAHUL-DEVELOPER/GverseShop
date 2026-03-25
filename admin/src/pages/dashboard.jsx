// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react'
import { 
  DollarSign, 
  Package, 
  ShoppingCart, 
  Users,
  TrendingUp,
  TrendingDown
} from 'lucide-react'
import RevenueChart from '../components/Charts/RevenueChart'

export default function Dashboard() {
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    products: 0,
    customers: 0
  })

  useEffect(() => {
    // Simulate API call
    setStats({
      revenue: 125430,
      orders: 1243,
      products: 456,
      customers: 3892
    })
  }, [])

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.revenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-500',
      change: '+12.5%',
      trend: 'up'
    },
    {
      title: 'Total Orders',
      value: stats.orders.toLocaleString(),
      icon: ShoppingCart,
      color: 'bg-blue-500',
      change: '+8.2%',
      trend: 'up'
    },
    {
      title: 'Total Products',
      value: stats.products.toLocaleString(),
      icon: Package,
      color: 'bg-purple-500',
      change: '+3.1%',
      trend: 'up'
    },
    {
      title: 'Total Customers',
      value: stats.customers.toLocaleString(),
      icon: Users,
      color: 'bg-orange-500',
      change: '+15.3%',
      trend: 'up'
    }
  ]

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', amount: '$299.99', status: 'Delivered', date: '2024-01-15' },
    { id: '#ORD-002', customer: 'Jane Smith', amount: '$159.99', status: 'Processing', date: '2024-01-14' },
    { id: '#ORD-003', customer: 'Mike Johnson', amount: '$499.99', status: 'Shipped', date: '2024-01-14' },
    { id: '#ORD-004', customer: 'Sarah Williams', amount: '$89.99', status: 'Pending', date: '2024-01-13' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                <span>{stat.change}</span>
              </div>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h2>
          <RevenueChart />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Products</h2>
          <div className="space-y-4">
            {['Gverse Hoodie', 'Streetwear Tee', 'Sneakers', 'Cap'].map((product, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-gray-600">{product}</span>
                <span className="font-semibold">{Math.floor(Math.random() * 100) + 1} sales</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left text-gray-600">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr key={index} className="border-b last:border-0">
                  <td className="py-3 font-medium">{order.id}</td>
                  <td className="py-3 text-gray-600">{order.customer}</td>
                  <td className="py-3 font-semibold">{order.amount}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-600' :
                        order.status === 'Shipped' ? 'bg-purple-100 text-purple-600' :
                        'bg-yellow-100 text-yellow-600'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 text-gray-600">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}