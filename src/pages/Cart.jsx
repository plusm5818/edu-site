import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { categories } from '../data/courses'

export default function Cart() {
  const { items, removeFromCart, clearCart, total } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [done, setDone] = useState(false)

  const formatPrice = (n) => n.toLocaleString('ru-RU') + ' ₽'
  const oldTotal = items.reduce((s, c) => s + (c.oldPrice || c.price), 0)
  const discount = oldTotal - total

  const checkout = () => {
    if (!user) return navigate('/login')
    clearCart()
    setDone(true)
  }

  if (done) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <span className="text-6xl">🎉</span>
        <h1 className="mt-4 text-2xl font-extrabold text-slate-900">Спасибо за покупку!</h1>
        <p className="mt-2 text-slate-500">
          Курсы добавлены в ваш профиль. Можно приступать к обучению.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/profile" className="btn-primary">В мой профиль</Link>
          <Link to="/catalog" className="btn-outline">Продолжить покупки</Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <span className="text-6xl">🛒</span>
        <h1 className="mt-4 text-2xl font-extrabold text-slate-900">Корзина пуста</h1>
        <p className="mt-2 text-slate-500">Добавьте курсы из каталога, чтобы оформить заказ</p>
        <Link to="/catalog" className="btn-primary mt-6">Перейти в каталог</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-3xl font-extrabold text-slate-900">Корзина</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Список товаров */}
        <div className="space-y-4 lg:col-span-2">
          {items.map((c) => {
            const cat = categories.find((x) => x.id === c.category)
            return (
              <div key={c.id} className="card flex items-center gap-4 p-4">
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-3xl ${c.gradient}`}
                >
                  {c.image}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-bold text-slate-900">{c.title}</h3>
                  <p className="text-sm text-slate-500">
                    {cat.icon} {cat.label} · {c.instructor}
                  </p>
                  <div className="mt-1 font-extrabold text-slate-900">{formatPrice(c.price)}</div>
                </div>
                <button
                  onClick={() => removeFromCart(c.id)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                  aria-label="Удалить"
                  title="Удалить из корзины"
                >
                  🗑️
                </button>
              </div>
            )
          })}
          <button onClick={clearCart} className="text-sm text-slate-500 hover:text-red-600">
            Очистить корзину
          </button>
        </div>

        {/* Итого */}
        <div className="lg:col-span-1">
          <div className="card sticky top-20 p-6">
            <h2 className="text-lg font-bold text-slate-900">Итого</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-slate-600">
                <dt>Курсов</dt>
                <dd>{items.length}</dd>
              </div>
              <div className="flex justify-between text-slate-600">
                <dt>Стоимость</dt>
                <dd>{formatPrice(oldTotal)}</dd>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <dt>Скидка</dt>
                  <dd>−{formatPrice(discount)}</dd>
                </div>
              )}
            </dl>
            <div className="mt-4 flex justify-between border-t border-slate-200 pt-4">
              <span className="font-bold text-slate-900">К оплате</span>
              <span className="text-xl font-extrabold text-brand-600">{formatPrice(total)}</span>
            </div>
            <button onClick={checkout} className="btn-primary mt-5 w-full">
              {user ? 'Оформить заказ' : 'Войти и оформить'}
            </button>
            {!user && (
              <p className="mt-2 text-center text-xs text-slate-400">
                Для оформления нужно войти в аккаунт
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
