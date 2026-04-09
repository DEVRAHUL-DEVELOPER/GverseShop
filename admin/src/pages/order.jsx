// src/pages/Orders.jsx
import { useState } from 'react'

export default function Orders() {
  const [orders, setOrders] = useState([
    { id: 'ORD-001', customer: 'John Doe', total: 299.99, status: 'Delivered', date: '2024-01-15', items: 3 },
    { id: 'ORD-002', customer: 'Jane Smith', total: 159.99, status: 'Processing', date: '2024-01-14', items: 2 },
    { id: 'ORD-003', customer: 'Mike Johnson', total: 499.99, status: 'Shipped', date: '2024-01-14', items: 4 },
    { id: 'ORD-004', customer: 'Sarah Williams', total: 89.99, status: 'Pending', date: '2024-01-13', items: 1 },
    { id: 'ORD-005', customer: 'David Brown', total: 234.99, status: 'Processing', date: '2024-01-12', items: 2 },
  ])

  const getStatusColor = (status) => {
    const colors = {
      'Delivered': 'bg-green-100 text-green-600',
      'Processing': 'bg-blue-100 text-blue-600',
      'Shipped': 'bg-purple-100 text-purple-600',
      'Pending': 'bg-yellow-100 text-yellow-600',
      'Cancelled': 'bg-red-100 text-red-600'
    }
    return colors[status] || 'bg-gray-100 text-gray-600'
  }

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Orders</h1>
        <div className="text-sm text-gray-500">
          Manage and track all customer orders
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors">
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
          <input
            type="date"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
          />
          <input
            type="date"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
          />
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
            Apply Filters
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-left text-gray-600">
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Items</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-gray-700">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-600">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {order.items} items
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-green-600">₹{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-indigo-600 hover:bg-indigo-50 rounded-md font-medium transition-colors">
                        View
                      </button>
                      {order.status === 'Pending' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'Processing')}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
                        >
                          Process
                        </button>
                      )}
                      {order.status === 'Processing' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'Shipped')}
                          className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition-colors"
                        >
                          Ship
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-gray-600">Showing 1 to 5 of 25 orders</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Previous</button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium">1</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">2</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">3</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Next</button>
        </div>
      </div>
    </div>
  )
}