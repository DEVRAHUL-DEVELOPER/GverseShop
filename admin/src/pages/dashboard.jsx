// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react'

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
      value: `₹${stats.revenue.toLocaleString()}`,
      icon: '💰',
      color: 'bg-green-500',
      change: '+12.5%',
      trend: 'up'
    },
    {
      title: 'Total Orders',
      value: stats.orders.toLocaleString(),
      icon: '🛒',
      color: 'bg-blue-500',
      change: '+8.2%',
      trend: 'up'
    },
    {
      title: 'Total Products',
      value: stats.products.toLocaleString(),
      icon: '📦',
      color: 'bg-purple-500',
      change: '+3.1%',
      trend: 'up'
    },
    {
      title: 'Total Customers',
      value: stats.customers.toLocaleString(),
      icon: '👥',
      color: 'bg-orange-500',
      change: '+15.3%',
      trend: 'up'
    }
  ]

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', amount: '₹299.99', status: 'Delivered', date: '2024-01-15' },
    { id: '#ORD-002', customer: 'Jane Smith', amount: '₹159.99', status: 'Processing', date: '2024-01-14' },
    { id: '#ORD-003', customer: 'Mike Johnson', amount: '₹499.99', status: 'Shipped', date: '2024-01-14' },
    { id: '#ORD-004', customer: 'Sarah Williams', amount: '₹89.99', status: 'Pending', date: '2024-01-13' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Welcome back! Here's what's happening with your store today.
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg text-white shadow-sm`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                <span>{stat.trend === 'up' ? '▲' : '▼'}</span>
                <span>{stat.change}</span>
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Revenue Overview</h2>
          <div className="h-64 flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
            <div className="text-center">
              <div className="text-4xl mb-2">📈</div>
              <p className="text-lg font-medium">Revenue Chart</p>
              <p className="text-sm">Chart component coming soon</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Products</h2>
          <div className="space-y-4">
            {['Gverse Hoodie', 'Streetwear Tee', 'Sneakers', 'Cap'].map((product, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-indigo-600 font-bold text-sm">{i + 1}</span>
                  </div>
                  <span className="text-gray-700 font-medium">{product}</span>
                </div>
                <span className="font-bold text-indigo-600">{Math.floor(Math.random() * 100) + 1} sales</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-600 border-b">
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-gray-700">{order.customer}</td>
                  <td className="px-6 py-4 font-semibold text-green-600">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium
                      ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                        'bg-yellow-100 text-yellow-800'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}