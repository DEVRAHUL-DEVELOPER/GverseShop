// src/pages/Customers.jsx
import { useState } from 'react'
import { Mail, Phone, MapPin, MoreVertical, Search } from 'lucide-react'

export default function Customers() {
  const [customers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 890', location: 'New York, USA', orders: 12, spent: 1249.99, status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234 567 891', location: 'Los Angeles, USA', orders: 8, spent: 879.99, status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+1 234 567 892', location: 'Chicago, USA', orders: 15, spent: 1899.99, status: 'Active' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', phone: '+1 234 567 893', location: 'Houston, USA', orders: 3, spent: 249.99, status: 'Inactive' },
    { id: 5, name: 'David Brown', email: 'david@example.com', phone: '+1 234 567 894', location: 'Phoenix, USA', orders: 7, spent: 649.99, status: 'Active' },
  ])

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Customers</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-600 text-sm">Total Customers</p>
          <p className="text-2xl font-bold mt-2">3,892</p>
          <p className="text-green-600 text-sm mt-2">↑ 15.3% from last month</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-600 text-sm">Active Customers</p>
          <p className="text-2xl font-bold mt-2">3,245</p>
          <p className="text-green-600 text-sm mt-2">↑ 8.7% from last month</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-600 text-sm">New Customers (30d)</p>
          <p className="text-2xl font-bold mt-2">456</p>
          <p className="text-green-600 text-sm mt-2">↑ 23.1% from last month</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-600 text-sm">Avg. Order Value</p>
          <p className="text-2xl font-bold mt-2">$89.99</p>
          <p className="text-green-600 text-sm mt-2">↑ 5.2% from last month</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search customers by name or email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <button className="btn-primary">Search</button>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map(customer => (
          <div key={customer.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 font-bold text-lg">
                    {customer.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{customer.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    customer.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {customer.status}
                  </span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical size={18} />
              </button>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={16} />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone size={16} />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={16} />
                <span>{customer.location}</span>
              </div>
            </div>
            
            <div className="border-t pt-4 flex justify-between">
              <div>
                <p className="text-xs text-gray-500">Total Orders</p>
                <p className="font-semibold">{customer.orders}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Spent</p>
                <p className="font-semibold">${customer.spent}</p>
              </div>
              <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
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