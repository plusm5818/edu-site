import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { courses, categories, levels } from '../data/courses'
import Badge from '../components/Badge'

export default function Profile() {
  const { user, updateProgress } = useAuth()

  // Курсы, по которым есть прогресс — «мои курсы»
  const myCourses = courses
    .filter((c) => user.progress[c.id] !== undefined)
    .map((c) => ({ ...c, percent: user.progress[c.id] }))

  const completed = myCourses.filter((c) => c.percent >= 100).length
  const avgProgress = myCourses.length
    ? Math.round(myCourses.reduce((s, c) => s + c.percent, 0) / myCourses.length)
    : 0

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      {/* Шапка профиля */}
      <div className="card flex flex-col items-center gap-5 p-8 sm:flex-row sm:items-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-purple-600 text-3xl font-extrabold text-white">
          {user.name.charAt(0).toUpperCase()}
        </span>
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-extrabold text-slate-900">{user.name}</h1>
          <p className="text-slate-500">{user.email}</p>
        </div>
      </div>

      {/* Статистика обучения */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <StatCard value={myCourses.length} label="Курсов в обучении" />
        <StatCard value={completed} label="Завершено" />
        <StatCard value={`${avgProgress}%`} label="Средний прогресс" />
      </div>

      {/* Мои курсы и прогресс */}
      <h2 className="mb-4 mt-10 text-xl font-bold text-slate-900">Мои курсы</h2>

      {myCourses.length === 0 ? (
        <div className="card flex flex-col items-center py-16 text-center">
          <span className="text-5xl">📚</span>
          <p className="mt-4 text-slate-500">Вы ещё не начали ни одного курса</p>
          <Link to="/catalog" className="btn-primary mt-4">Выбрать курс</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {myCourses.map((c) => {
            const cat = categories.find((x) => x.id === c.category)
            return (
              <div key={c.id} className="card p-5">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-2xl ${c.gradient}`}
                  >
                    {c.image}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-slate-900">{c.title}</h3>
                      <Badge className={levels[c.level].color}>{levels[c.level].label}</Badge>
                    </div>
                    <p className="mt-0.5 text-sm text-slate-500">
                      {cat.icon} {cat.label} · {c.lessons} уроков
                    </p>

                    {/* Прогресс-бар */}
                    <div className="mt-3">
                      <div className="mb-1 flex justify-between text-xs font-medium">
                        <span className="text-slate-600">
                          {c.percent >= 100 ? '✅ Завершён' : 'Прогресс'}
                        </span>
                        <span className="text-brand-600">{c.percent}%</span>
                      </div>
                      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-purple-600 transition-all duration-500"
                          style={{ width: `${c.percent}%` }}
                        />
                      </div>
                    </div>

                    {/* Демо-кнопки изменения прогресса */}
                    {c.percent < 100 && (
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => updateProgress(c.id, Math.min(100, c.percent + 10))}
                          className="btn-outline px-3 py-1.5 text-xs"
                        >
                          + Пройти урок
                        </button>
                        <button
                          onClick={() => updateProgress(c.id, 100)}
                          className="btn-outline px-3 py-1.5 text-xs"
                        >
                          Завершить курс
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function StatCard({ value, label }) {
  return (
    <div className="card p-5 text-center">
      <div className="text-2xl font-extrabold text-brand-600 sm:text-3xl">{value}</div>
      <div className="mt-1 text-xs text-slate-500 sm:text-sm">{label}</div>
    </div>
  )
}
