// Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo_gverseshop.png";
import {
  FiHome,
  FiPackage,
  FiShoppingCart,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiDollarSign,
  FiTrendingUp,
  FiShoppingBag,
  FiUser,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiMoreVertical
} from "react-icons/fi";

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sample products data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Gaming Mouse Pro X",
      category: "Gaming Gear",
      price: 89.99,
      stock: 145,
      sales: 1234,
      rating: 4.8,
      status: "active",
      image: "🖱️",
      description: "Ultra-lightweight gaming mouse with RGB lighting"
    },
    {
      id: 2,
      name: "RGB Mechanical Keyboard",
      category: "Gaming Gear",
      price: 159.99,
      stock: 89,
      sales: 892,
      rating: 4.9,
      status: "active",
      image: "⌨️",
      description: "Mechanical keyboard with customizable RGB"
    },
    {
      id: 3,
      name: "Wireless Gaming Headset",
      category: "Audio",
      price: 129.99,
      stock: 56,
      sales: 756,
      rating: 4.7,
      status: "active",
      image: "🎧",
      description: "7.1 surround sound wireless headset"
    },
    {
      id: 4,
      name: "Streaming Microphone",
      category: "Audio",
      price: 99.99,
      stock: 34,
      sales: 445,
      rating: 4.6,
      status: "low-stock",
      image: "🎙️",
      description: "Professional condenser microphone"
    },
    {
      id: 5,
      name: "RGB Gaming Mousepad",
      category: "Accessories",
      price: 39.99,
      stock: 0,
      sales: 678,
      rating: 4.5,
      status: "out-of-stock",
      image: "🖱️",
      description: "Large RGB gaming mousepad"
    }
  ]);

  // Stats data
  const stats = [
    {
      title: "Total Revenue",
      value: "$48,293",
      change: "+12.5%",
      icon: FiDollarSign,
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Total Orders",
      value: "1,284",
      change: "+8.2%",
      icon: FiShoppingBag,
      color: "from-blue-500 to-cyan-600"
    },
    {
      title: "Total Products",
      value: "156",
      change: "+5",
      icon: FiPackage,
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "Active Users",
      value: "3,542",
      change: "+23.1%",
      icon: FiUsers,
      color: "from-orange-500 to-red-600"
    }
  ];

  // Recent orders data
  const recentOrders = [
    { id: "#ORD-001", customer: "Alex Morgan", product: "Gaming Mouse Pro X", amount: "$89.99", status: "delivered", date: "2024-03-15" },
    { id: "#ORD-002", customer: "Sarah Chen", product: "RGB Mechanical Keyboard", amount: "$159.99", status: "processing", date: "2024-03-15" },
    { id: "#ORD-003", customer: "Mike Ross", product: "Wireless Gaming Headset", amount: "$129.99", status: "pending", date: "2024-03-14" },
    { id: "#ORD-004", customer: "Emma Watson", product: "Streaming Microphone", amount: "$99.99", status: "shipped", date: "2024-03-14" }
  ];

  const getStatusColor = (status) => {
    const colors = {
      delivered: "bg-green-500/20 text-green-400",
      processing: "bg-blue-500/20 text-blue-400",
      pending: "bg-yellow-500/20 text-yellow-400",
      shipped: "bg-purple-500/20 text-purple-400",
      "low-stock": "bg-orange-500/20 text-orange-400",
      "out-of-stock": "bg-red-500/20 text-red-400",
      active: "bg-green-500/20 text-green-400"
    };
    return colors[status] || "bg-gray-500/20 text-gray-400";
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAddProduct = (newProduct) => {
    const product = {
      ...newProduct,
      id: products.length + 1,
      sales: 0,
      rating: 0
    };
    setProducts([...products, product]);
    setShowAddProduct(false);
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setShowEditProduct(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500">
      
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white/10 backdrop-blur-lg border-r border-white/20">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
              <img src={Logo} alt="logo" className="w-10" />
              <h1 className="text-white text-xl font-bold">GverseShop</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {[
              { icon: FiHome, label: "Dashboard", tab: "dashboard" },
              { icon: FiPackage, label: "Products", tab: "products" },
              { icon: FiShoppingCart, label: "Orders", tab: "orders" },
              { icon: FiUsers, label: "Customers", tab: "customers" },
              { icon: FiBarChart2, label: "Analytics", tab: "analytics" },
              { icon: FiSettings, label: "Settings", tab: "settings" }
            ].map((item) => (
              <button
                key={item.tab}
                onClick={() => setActiveTab(item.tab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.tab
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-white/20">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              <FiLogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white capitalize">
              {activeTab}
            </h1>
            <p className="text-white/70 mt-1">
              Welcome back! Here's what's happening with your store.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <FiUser className="text-white" />
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                      <stat.icon className="text-white" size={24} />
                    </div>
                    <span className="text-green-400 text-sm font-semibold flex items-center gap-1">
                      <FiTrendingUp size={14} />
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-white/70 text-sm mb-1">{stat.title}</h3>
                  <p className="text-white text-2xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
              <div className="p-6 border-b border-white/20">
                <h2 className="text-white text-xl font-bold">Recent Orders</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5 border-b border-white/20">
                    <tr className="text-white/70 text-sm">
                      <th className="text-left p-4">Order ID</th>
                      <th className="text-left p-4">Customer</th>
                      <th className="text-left p-4">Product</th>
                      <th className="text-left p-4">Amount</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-white/10 hover:bg-white/5">
                        <td className="p-4 text-white font-medium">{order.id}</td>
                        <td className="p-4 text-white/80">{order.customer}</td>
                        <td className="p-4 text-white/80">{order.product}</td>
                        <td className="p-4 text-white font-semibold">{order.amount}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-4 text-white/60 text-sm">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products Content */}
        {activeTab === "products" && (
          <div className="space-y-6">
            {/* Header with Add Product Button */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-white text-2xl font-bold">Product Listing</h2>
                <p className="text-white/70">Manage your store products</p>
              </div>
              <button
                onClick={() => setShowAddProduct(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold hover:shadow-lg transition-all"
              >
                <FiPlus size={20} />
                Add Product
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hover:border-white/40 transition-all overflow-hidden"
                >
                  <div className="p-6">
                    <div className="text-6xl mb-4">{product.image}</div>
                    <h3 className="text-white text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-white/60 text-sm mb-3">{product.description}</p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-white text-2xl font-bold">${product.price}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                        {product.status === "active" ? "In Stock" : product.status === "low-stock" ? "Low Stock" : "Out of Stock"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-white/60 mb-4">
                      <span>📦 Stock: {product.stock}</span>
                      <span>⭐ {product.rating}</span>
                      <span>📈 {product.sales} sold</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowEditProduct(true);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-400 transition-all"
                      >
                        <FiEdit2 size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 transition-all"
                      >
                        <FiTrash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Content */}
        {activeTab === "orders" && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
            <div className="p-6 border-b border-white/20">
              <h2 className="text-white text-xl font-bold">All Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/20">
                  <tr className="text-white/70 text-sm">
                    <th className="text-left p-4">Order ID</th>
                    <th className="text-left p-4">Customer</th>
                    <th className="text-left p-4">Product</th>
                    <th className="text-left p-4">Amount</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Date</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-white/10 hover:bg-white/5">
                      <td className="p-4 text-white font-medium">{order.id}</td>
                      <td className="p-4 text-white/80">{order.customer}</td>
                      <td className="p-4 text-white/80">{order.product}</td>
                      <td className="p-4 text-white font-semibold">{order.amount}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 text-white/60 text-sm">{order.date}</td>
                      <td className="p-4">
                        <button className="text-white/60 hover:text-white">
                          <FiEye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add Product Modal */}
        {showAddProduct && (
          <AddProductModal
            onClose={() => setShowAddProduct(false)}
            onSave={handleAddProduct}
          />
        )}

        {/* Edit Product Modal */}
        {showEditProduct && selectedProduct && (
          <EditProductModal
            product={selectedProduct}
            onClose={() => {
              setShowEditProduct(false);
              setSelectedProduct(null);
            }}
            onSave={handleEditProduct}
          />
        )}
      </main>
    </div>
  );
}

// Add Product Modal Component
const AddProductModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "🛍️"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      status: formData.stock > 10 ? "active" : formData.stock > 0 ? "low-stock" : "out-of-stock"
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 rounded-xl w-full max-w-md p-6 border border-white/20">
        <h2 className="text-white text-2xl font-bold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Category"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            required
          />
          <input
            type="number"
            placeholder="Price"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            required
          />
          <input
            type="number"
            placeholder="Stock Quantity"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            value={formData.stock}
            onChange={(e) => setFormData({...formData, stock: e.target.value})}
            required
          />
          <textarea
            placeholder="Description"
            rows="3"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold hover:shadow-lg transition-all"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Edit Product Modal Component
const EditProductModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({...product});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 rounded-xl w-full max-w-md p-6 border border-white/20">
        <h2 className="text-white text-2xl font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Category"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            required
          />
          <input
            type="number"
            placeholder="Price"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            required
          />
          <input
            type="number"
            placeholder="Stock Quantity"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            value={formData.stock}
            onChange={(e) => setFormData({...formData, stock: e.target.value})}
            required
          />
          <textarea
            placeholder="Description"
            rows="3"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold hover:shadow-lg transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;