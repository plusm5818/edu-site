import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { courses, categories, levels } from '../data/courses'
import CourseCard from '../components/CourseCard'

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCat, setActiveCat] = useState(searchParams.get('cat') || 'all')
  const [activeLevel, setActiveLevel] = useState('all')
  const [sort, setSort] = useState('popular')
  const [query, setQuery] = useState(searchParams.get('q') || '')

  // Синхронизация с URL (категория из ссылок и поиск из навбара)
  useEffect(() => {
    setActiveCat(searchParams.get('cat') || 'all')
    setQuery(searchParams.get('q') || '')
  }, [searchParams])

  const filtered = useMemo(() => {
    let list = [...courses]
    if (activeCat !== 'all') list = list.filter((c) => c.category === activeCat)
    if (activeLevel !== 'all') list = list.filter((c) => c.level === activeLevel)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.instructor.toLowerCase().includes(q)
      )
    }
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating)
    if (sort === 'popular') list.sort((a, b) => b.students - a.students)
    return list
  }, [activeCat, activeLevel, sort, query])

  const selectCat = (id) => {
    setActiveCat(id)
    const params = new URLSearchParams(searchParams)
    if (id === 'all') params.delete('cat')
    else params.set('cat', id)
    setSearchParams(params, { replace: true })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Каталог курсов</h1>
        <p className="mt-1 text-slate-500">
          {query ? `Результаты по запросу «${query}» — ` : ''}
          найдено курсов: {filtered.length}
        </p>
      </div>

      {/* Фильтры по категориям */}
      <div className="mb-4 flex flex-wrap gap-2">
        <FilterChip active={activeCat === 'all'} onClick={() => selectCat('all')}>
          Все направления
        </FilterChip>
        {categories.map((cat) => (
          <FilterChip key={cat.id} active={activeCat === cat.id} onClick={() => selectCat(cat.id)}>
            {cat.icon} {cat.label}
          </FilterChip>
        ))}
      </div>

      {/* Уровень + сортировка */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <FilterChip active={activeLevel === 'all'} onClick={() => setActiveLevel('all')} small>
            Любой уровень
          </FilterChip>
          {Object.entries(levels).map(([id, lvl]) => (
            <FilterChip key={id} active={activeLevel === id} onClick={() => setActiveLevel(id)} small>
              {lvl.label}
            </FilterChip>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="input w-full sm:w-56"
        >
          <option value="popular">Сначала популярные</option>
          <option value="rating">По рейтингу</option>
          <option value="price-asc">Сначала дешёвые</option>
          <option value="price-desc">Сначала дорогие</option>
        </select>
      </div>

      {/* Сетка курсов */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      ) : (
        <div className="card flex flex-col items-center justify-center py-20 text-center">
          <span className="text-5xl">🔍</span>
          <h3 className="mt-4 text-lg font-bold text-slate-900">Ничего не найдено</h3>
          <p className="mt-1 text-slate-500">Попробуйте изменить фильтры или поисковый запрос</p>
        </div>
      )}
    </div>
  )
}

function FilterChip({ children, active, onClick, small }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border font-medium transition-colors ${
        small ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'
      } ${
        active
          ? 'border-brand-600 bg-brand-600 text-white'
          : 'border-slate-300 bg-white text-slate-600 hover:border-brand-400 hover:text-brand-600'
      }`}
    >
      {children}
    </button>
  )
}
