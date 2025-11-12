import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] bg-gray-100">
        {product.image_url ? (
          <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-gray-400">No Image</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-1">{product.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mt-1">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-blue-600 font-bold">${product.price?.toFixed ? product.price.toFixed(2) : product.price}</span>
          <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700">Add to cart</button>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/products?category=mobile`)
        const data = await res.json()
        setProducts(Array.isArray(data) ? data : [])
      } catch (e) {
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-blue-600 grid place-items-center text-white font-bold">R</div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Rohan Mobile Store</h1>
              <p className="text-xs text-gray-500 -mt-0.5">Latest phones, great prices</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a className="hover:text-gray-900" href="#">Home</a>
            <a className="hover:text-gray-900" href="#">Mobiles</a>
            <a className="hover:text-gray-900" href="#">Accessories</a>
            <a className="hover:text-gray-900" href="#">Support</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <section className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            Discover the best mobiles at Rohan
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Shop our curated selection of smartphones with stunning displays, long battery life, and blazing-fast performance.
          </p>
        </section>

        <section className="mt-10">
          {loading ? (
            <div className="grid place-items-center py-16 text-gray-500">Loading products…</div>
          ) : error ? (
            <div className="grid place-items-center py-16 text-red-600">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((p, idx) => (
                <ProductCard key={idx} product={p} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Rohan Mobile Store. All rights reserved.
      </footer>
    </div>
  )
}
