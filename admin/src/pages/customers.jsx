// src/pages/Customers.jsx
import { useState } from 'react'

export default function Customers() {
  const [customers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 890', location: 'New York, USA', orders: 12, spent: 1249.99, status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234 567 891', location: 'Los Angeles, USA', orders: 8, spent: 879.99, status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+1 234 567 892', location: 'Chicago, USA', orders: 15, spent: 1899.99, status: 'Active' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', phone: '+1 234 567 893', location: 'Houston, USA', orders: 3, spent: 249.99, status: 'Inactive' },
    { id: 5, name: 'David Brown', email: 'david@example.com', phone: '+1 234 567 894', location: 'Phoenix, USA', orders: 7, spent: 649.99, status: 'Active' },
  ])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Customers</h1>
        <div className="text-sm text-gray-500">
          Manage your customer database
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <p className="text-gray-600 text-sm font-medium">Total Customers</p>
          <p className="text-3xl font-bold mt-2 text-gray-900">3,892</p>
          <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
            <span>▲</span>
            <span>15.3% from last month</span>
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <p className="text-gray-600 text-sm font-medium">Active Customers</p>
          <p className="text-3xl font-bold mt-2 text-gray-900">3,245</p>
          <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
            <span>▲</span>
            <span>8.7% from last month</span>
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <p className="text-gray-600 text-sm font-medium">New Customers (30d)</p>
          <p className="text-3xl font-bold mt-2 text-gray-900">456</p>
          <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
            <span>▲</span>
            <span>23.1% from last month</span>
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <p className="text-gray-600 text-sm font-medium">Avg. Order Value</p>
          <p className="text-3xl font-bold mt-2 text-gray-900">₹89.99</p>
          <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
            <span>▲</span>
            <span>5.2% from last month</span>
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</div>
            <input
              type="text"
              placeholder="Search customers by name or email..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
            />
          </div>
          <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
            Search
          </button>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map(customer => (
          <div key={customer.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 font-bold text-lg">
                    {customer.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {customer.status}
                  </span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <span className="text-xl">⋯</span>
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>✉️</span>
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>📞</span>
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>📍</span>
                <span>{customer.location}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 flex justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">Total Orders</p>
                <p className="font-bold text-gray-900">{customer.orders}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Total Spent</p>
                <p className="font-bold text-green-600">₹{customer.spent}</p>
              </div>
              <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
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