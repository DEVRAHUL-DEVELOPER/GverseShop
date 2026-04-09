// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/dashboard'
import Products from './pages/product'
import Orders from './pages/order'
import Customers from './pages/customers'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
      </Routes>
    </Layout>
  )
}

export default App