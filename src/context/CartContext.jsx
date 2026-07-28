import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('eduflow_cart')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('eduflow_cart', JSON.stringify(items))
  }, [items])

  const addToCart = (course) => {
    setItems((prev) => (prev.some((c) => c.id === course.id) ? prev : [...prev, course]))
  }

  const removeFromCart = (id) => setItems((prev) => prev.filter((c) => c.id !== id))
  const clearCart = () => setItems([])
  const inCart = (id) => items.some((c) => c.id === id)

  const total = useMemo(() => items.reduce((sum, c) => sum + c.price, 0), [items])

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, clearCart, inCart, total, count: items.length }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
