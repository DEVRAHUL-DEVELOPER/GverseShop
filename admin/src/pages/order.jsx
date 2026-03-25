// src/pages/Orders.jsx
import { useState } from 'react'
import { Eye, Truck, CheckCircle, XCircle } from 'lucide-react'

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
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Orders</h1>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex gap-4">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
          <input
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="btn-primary">Apply Filters</button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left text-gray-600">
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Items</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{order.id}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4 text-gray-600">{order.date}</td>
                <td className="px-6 py-4">{order.items}</td>
                <td className="px-6 py-4 font-semibold">${order.total}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-1 text-indigo-600 hover:bg-indigo-50 rounded">
                      <Eye size={18} />
                    </button>
                    {order.status === 'Pending' && (
                      <button 
                        onClick={() => updateOrderStatus(order.id, 'Processing')}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Truck size={18} />
                      </button>
                    )}
                    {order.status === 'Processing' && (
                      <button 
                        onClick={() => updateOrderStatus(order.id, 'Shipped')}
                        className="p-1 text-purple-600 hover:bg-purple-50 rounded"
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-gray-600">Showing 1 to 5 of 25 orders</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">Previous</button>
          <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg">1</button>
          <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">2</button>
          <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">3</button>
          <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  )
}