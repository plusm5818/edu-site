import { Link } from 'react-router-dom'
import { courses, categories } from '../data/courses'
import CourseCard from '../components/CourseCard'

const stats = [
  { value: '120+', label: 'курсов' },
  { value: '50K+', label: 'студентов' },
  { value: '4.8★', label: 'средний рейтинг' },
  { value: '95%', label: 'доходят до конца' },
]

const features = [
  { icon: '🎯', title: 'Практика с первого урока', text: 'Реальные проекты, а не сухая теория. Учитесь на задачах из индустрии.' },
  { icon: '🧑‍🏫', title: 'Эксперты-практики', text: 'Преподаватели из ведущих компаний делятся актуальным опытом.' },
  { icon: '📱', title: 'Учитесь где угодно', text: 'Доступ с любого устройства. Продолжайте обучение в любой момент.' },
  { icon: '🏆', title: 'Сертификаты', text: 'Получайте подтверждение навыков, которое ценят работодатели.' },
]

export default function Home() {
  const popular = courses.slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-indigo-600 to-purple-700 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur">
              🚀 Новые курсы каждую неделю
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
              Прокачайте навыки, которые
              <span className="text-yellow-300"> меняют карьеру</span>
            </h1>
            <p className="mt-5 text-lg text-indigo-100">
              Онлайн-курсы по программированию, дизайну и языкам. Учитесь в удобном темпе
              у экспертов-практиков и собирайте портфолио.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/catalog" className="btn bg-white text-brand-700 hover:bg-slate-100">
                Выбрать курс →
              </Link>
              <Link to="/register" className="btn border border-white/40 text-white hover:bg-white/10">
                Создать аккаунт
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold text-brand-600">{s.value}</div>
              <div className="mt-1 text-sm text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Категории */}
        <section className="py-14">
          <h2 className="text-2xl font-bold text-slate-900">Направления обучения</h2>
          <p className="mt-1 text-slate-500">Выберите сферу, в которой хотите расти</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/catalog?cat=${cat.id}`}
                className="card flex items-center gap-4 p-6 transition-shadow hover:shadow-md"
              >
                <span className="text-4xl">{cat.icon}</span>
                <div>
                  <div className="font-bold text-slate-900">{cat.label}</div>
                  <div className="text-sm text-slate-500">
                    {courses.filter((c) => c.category === cat.id).length} курсов
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Популярные курсы */}
        <section className="pb-14">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Популярные курсы</h2>
              <p className="mt-1 text-slate-500">Выбор тысяч студентов</p>
            </div>
            <Link to="/catalog" className="hidden text-sm font-semibold text-brand-600 hover:underline sm:block">
              Смотреть все →
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </section>

        {/* Преимущества */}
        <section className="pb-16">
          <h2 className="text-center text-2xl font-bold text-slate-900">Почему выбирают EduFlow</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="card p-6">
                <div className="text-3xl">{f.icon}</div>
                <h3 className="mt-3 font-bold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-16 rounded-3xl bg-gradient-to-r from-brand-600 to-purple-700 px-8 py-12 text-center text-white">
          <h2 className="text-3xl font-extrabold">Готовы начать обучение?</h2>
          <p className="mx-auto mt-3 max-w-xl text-indigo-100">
            Присоединяйтесь к 50 000 студентов и сделайте первый шаг к новой профессии уже сегодня.
          </p>
          <Link to="/register" className="btn mt-6 bg-white text-brand-700 hover:bg-slate-100">
            Зарегистрироваться бесплатно
          </Link>
        </section>
      </div>
    </div>
  )
}
