import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { count } = useCart()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  const onSearch = (e) => {
    e.preventDefault()
    navigate(`/catalog?q=${encodeURIComponent(query.trim())}`)
    setMobileOpen(false)
  }

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-brand-600' : 'text-slate-600 hover:text-slate-900'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        {/* Логотип */}
        <Link to="/" className="flex shrink-0 items-center gap-2 text-lg font-extrabold text-slate-900">
          <span className="text-2xl">🎓</span>
          <span>EduFlow</span>
        </Link>

        {/* Поиск (десктоп) */}
        <form onSubmit={onSearch} className="relative hidden flex-1 md:block">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            🔍
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск курсов..."
            className="input pl-9"
          />
        </form>

        {/* Навигация (десктоп) */}
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={linkClass} end>
            Главная
          </NavLink>
          <NavLink to="/catalog" className={linkClass}>
            Каталог
          </NavLink>
          {user && (
            <NavLink to="/profile" className={linkClass}>
              Профиль
            </NavLink>
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          {/* Корзина */}
          <Link to="/cart" className="relative rounded-lg p-2 text-xl hover:bg-slate-100">
            🛒
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>

          {/* Аккаунт */}
          {user ? (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-100"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span className="text-sm font-medium text-slate-700">{user.name.split(' ')[0]}</span>
              </Link>
              <button onClick={logout} className="btn-outline px-3 py-2 text-xs">
                Выйти
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link to="/login" className="btn-outline">
                Войти
              </Link>
              <Link to="/register" className="btn-primary">
                Регистрация
              </Link>
            </div>
          )}

          {/* Бургер */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="rounded-lg p-2 text-xl hover:bg-slate-100 md:hidden"
            aria-label="Меню"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <form onSubmit={onSearch} className="relative mb-4">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              🔍
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск курсов..."
              className="input pl-9"
            />
          </form>
          <nav className="flex flex-col gap-1">
            <NavLink to="/" end className="rounded-lg px-3 py-2 hover:bg-slate-100" onClick={() => setMobileOpen(false)}>
              Главная
            </NavLink>
            <NavLink to="/catalog" className="rounded-lg px-3 py-2 hover:bg-slate-100" onClick={() => setMobileOpen(false)}>
              Каталог
            </NavLink>
            {user ? (
              <>
                <NavLink to="/profile" className="rounded-lg px-3 py-2 hover:bg-slate-100" onClick={() => setMobileOpen(false)}>
                  Профиль
                </NavLink>
                <button
                  onClick={() => {
                    logout()
                    setMobileOpen(false)
                  }}
                  className="rounded-lg px-3 py-2 text-left text-red-600 hover:bg-red-50"
                >
                  Выйти
                </button>
              </>
            ) : (
              <div className="mt-2 flex gap-2">
                <Link to="/login" className="btn-outline flex-1" onClick={() => setMobileOpen(false)}>
                  Войти
                </Link>
                <Link to="/register" className="btn-primary flex-1" onClick={() => setMobileOpen(false)}>
                  Регистрация
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
