import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { courses, categories, levels } from '../data/courses'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import CourseCard from '../components/CourseCard'
import Badge from '../components/Badge'

// Чему научитесь — набор навыков по направлению
const learnByCategory = {
  programming: [
    'Писать чистый и поддерживаемый код',
    'Работать с современными инструментами разработки',
    'Проектировать архитектуру приложений',
    'Отлаживать и тестировать программы',
    'Собрать проекты для портфолио',
    'Готовиться к техническим собеседованиям',
  ],
  design: [
    'Создавать продуманные интерфейсы',
    'Работать с типографикой и цветом',
    'Строить прототипы и дизайн-системы',
    'Понимать потребности пользователей',
    'Презентовать свои решения',
    'Собрать сильное портфолио',
  ],
  languages: [
    'Уверенно говорить на новые темы',
    'Расширить активный словарный запас',
    'Понимать речь носителей на слух',
    'Грамотно строить предложения',
    'Вести переписку и диалоги',
    'Преодолеть языковой барьер',
  ],
}

// Генерируем программу курса (модули) из числа уроков
function buildCurriculum(course) {
  const moduleNames = [
    'Введение и основы',
    'Базовые концепции',
    'Практические инструменты',
    'Углублённые темы',
    'Реальные проекты',
    'Финальная работа и итоги',
  ]
  const modulesCount = Math.min(moduleNames.length, Math.max(3, Math.round(course.lessons / 14)))
  const per = Math.round(course.lessons / modulesCount)
  return moduleNames.slice(0, modulesCount).map((name, i) => ({
    title: name,
    lessons: i === modulesCount - 1 ? course.lessons - per * (modulesCount - 1) : per,
  }))
}

export default function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, inCart } = useCart()
  const { user } = useAuth()
  const [openModule, setOpenModule] = useState(0)

  const course = courses.find((c) => c.id === Number(id))

  if (!course) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <span className="text-6xl">🤷</span>
        <h1 className="mt-4 text-2xl font-extrabold text-slate-900">Курс не найден</h1>
        <Link to="/catalog" className="btn-primary mt-6">В каталог</Link>
      </div>
    )
  }

  const category = categories.find((c) => c.id === course.category)
  const level = levels[course.level]
  const added = inCart(course.id)
  const owned = user && user.progress[course.id] !== undefined
  const curriculum = buildCurriculum(course)
  const formatPrice = (n) => n.toLocaleString('ru-RU') + ' ₽'
  const discount = course.oldPrice
    ? Math.round((1 - course.price / course.oldPrice) * 100)
    : 0

  const related = courses
    .filter((c) => c.category === course.category && c.id !== course.id)
    .slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className={`bg-gradient-to-br ${course.gradient} text-white`}>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
          <Link to="/catalog" className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white">
            ← Назад в каталог
          </Link>
          <div className="mt-6 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-white/20 text-white">{category.icon} {category.label}</Badge>
                <Badge className="bg-white/20 text-white">{level.label}</Badge>
              </div>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">{course.title}</h1>
              <p className="mt-4 max-w-2xl text-lg text-white/90">{course.description}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/90">
                <span className="flex items-center gap-1">
                  <span className="text-yellow-300">★</span>
                  <span className="font-bold">{course.rating}</span>
                  <span className="text-white/70">({course.students.toLocaleString('ru-RU')} студентов)</span>
                </span>
                <span>📚 {course.lessons} уроков</span>
                <span>⏱️ {course.duration}</span>
                <span>👨‍🏫 {course.instructor}</span>
              </div>
            </div>
            <div className="hidden items-center justify-center text-9xl lg:flex">{course.image}</div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Левая колонка */}
          <div className="space-y-10 lg:col-span-2">
            {/* Чему научитесь */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900">Чему вы научитесь</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {learnByCategory[course.category].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 text-emerald-500">✓</span>
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Программа курса */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900">Программа курса</h2>
              <p className="mt-1 text-sm text-slate-500">
                {curriculum.length} модулей · {course.lessons} уроков · {course.duration}
              </p>
              <div className="mt-4 space-y-2">
                {curriculum.map((mod, i) => {
                  const open = openModule === i
                  return (
                    <div key={i} className="card overflow-hidden">
                      <button
                        onClick={() => setOpenModule(open ? -1 : i)}
                        className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-slate-50"
                      >
                        <span className="flex items-center gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-sm font-bold text-brand-700">
                            {i + 1}
                          </span>
                          <span className="font-semibold text-slate-900">{mod.title}</span>
                        </span>
                        <span className="flex items-center gap-3 text-sm text-slate-400">
                          <span>{mod.lessons} уроков</span>
                          <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>⌄</span>
                        </span>
                      </button>
                      {open && (
                        <ul className="space-y-1 border-t border-slate-100 px-5 py-3">
                          {Array.from({ length: mod.lessons }).map((_, l) => (
                            <li key={l} className="flex items-center gap-2.5 py-1.5 text-sm text-slate-600">
                              <span className="text-slate-300">▶</span>
                              Урок {l + 1}. {mod.title} — часть {l + 1}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Преподаватель */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900">Преподаватель</h2>
              <div className="card mt-4 flex items-center gap-4 p-5">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-purple-600 text-2xl font-extrabold text-white">
                  {course.instructor.charAt(0)}
                </span>
                <div>
                  <div className="font-bold text-slate-900">{course.instructor}</div>
                  <div className="text-sm text-slate-500">
                    Эксперт-практик · {category.label}
                  </div>
                  <div className="mt-1 text-sm text-slate-500">
                    ★ {course.rating} рейтинг · {course.students.toLocaleString('ru-RU')} студентов
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Правая колонка — покупка */}
          <aside className="lg:col-span-1">
            <div className="card sticky top-20 overflow-hidden">
              <div className={`flex h-32 items-center justify-center bg-gradient-to-br text-6xl ${course.gradient}`}>
                {course.image}
              </div>
              <div className="p-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900">{formatPrice(course.price)}</span>
                  {course.oldPrice && (
                    <span className="text-base text-slate-400 line-through">{formatPrice(course.oldPrice)}</span>
                  )}
                </div>
                {discount > 0 && (
                  <Badge className="mt-2 bg-red-100 text-red-700">Скидка {discount}%</Badge>
                )}

                {owned ? (
                  <Link to="/profile" className="btn-primary mt-5 w-full">
                    Продолжить обучение →
                  </Link>
                ) : (
                  <div className="mt-5 space-y-2">
                    <button
                      onClick={() => addToCart(course)}
                      disabled={added}
                      className={added ? 'btn w-full bg-emerald-100 text-emerald-700' : 'btn-primary w-full'}
                    >
                      {added ? '✓ Уже в корзине' : 'Добавить в корзину'}
                    </button>
                    <button onClick={() => navigate('/cart')} className="btn-outline w-full">
                      {added ? 'Перейти в корзину' : 'Купить сейчас'}
                    </button>
                  </div>
                )}

                <ul className="mt-6 space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-2.5"><span>📚</span> {course.lessons} уроков</li>
                  <li className="flex items-center gap-2.5"><span>⏱️</span> {course.duration} материала</li>
                  <li className="flex items-center gap-2.5"><span>📱</span> Доступ с любого устройства</li>
                  <li className="flex items-center gap-2.5"><span>♾️</span> Бессрочный доступ</li>
                  <li className="flex items-center gap-2.5"><span>🏆</span> Сертификат об окончании</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>

        {/* Похожие курсы */}
        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900">Похожие курсы</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
