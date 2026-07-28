import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
            <span className="text-2xl">🎓</span> EduFlow
          </Link>
          <p className="mt-3 text-sm text-slate-500">
            Современная образовательная платформа. Учитесь в удобном темпе у лучших экспертов.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Обучение</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li><Link to="/catalog" className="hover:text-brand-600">Все курсы</Link></li>
            <li><Link to="/catalog?cat=programming" className="hover:text-brand-600">Программирование</Link></li>
            <li><Link to="/catalog?cat=design" className="hover:text-brand-600">Дизайн</Link></li>
            <li><Link to="/catalog?cat=languages" className="hover:text-brand-600">Языки</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Компания</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li><a href="#" className="hover:text-brand-600">О нас</a></li>
            <li><a href="#" className="hover:text-brand-600">Преподаватели</a></li>
            <li><a href="#" className="hover:text-brand-600">Блог</a></li>
            <li><a href="#" className="hover:text-brand-600">Контакты</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Мы в соцсетях</h4>
          <div className="flex gap-3 text-2xl">
            <a href="#" className="hover:opacity-70">📘</a>
            <a href="#" className="hover:opacity-70">📷</a>
            <a href="#" className="hover:opacity-70">▶️</a>
            <a href="#" className="hover:opacity-70">💬</a>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 py-5 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} EduFlow. Все права защищены.
      </div>
    </footer>
  )
}
