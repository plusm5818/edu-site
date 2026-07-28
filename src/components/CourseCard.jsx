import { Link } from 'react-router-dom'
import { categories, levels } from '../data/courses'
import { useCart } from '../context/CartContext'
import Badge from './Badge'

export default function CourseCard({ course }) {
  const { addToCart, inCart } = useCart()
  const category = categories.find((c) => c.id === course.category)
  const level = levels[course.level]
  const added = inCart(course.id)

  const formatPrice = (n) => n.toLocaleString('ru-RU') + ' ₽'

  return (
    <article className="card group flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      {/* Обложка */}
      <Link
        to={`/course/${course.id}`}
        className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${course.gradient}`}
      >
        <span className="text-6xl drop-shadow-sm transition-transform group-hover:scale-110">
          {course.image}
        </span>
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge className={category.color}>
            {category.icon} {category.label}
          </Badge>
        </div>
      </Link>

      {/* Контент */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2">
          <Badge className={level.color}>{level.label}</Badge>
          <span className="text-xs text-slate-400">{course.duration}</span>
        </div>

        <Link to={`/course/${course.id}`} className="group/title">
          <h3 className="mb-1.5 text-lg font-bold leading-snug text-slate-900 group-hover/title:text-brand-600">
            {course.title}
          </h3>
        </Link>
        <p className="mb-4 line-clamp-2 flex-1 text-sm text-slate-500">{course.description}</p>

        <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <span className="text-amber-500">★</span>
            <span className="font-semibold text-slate-700">{course.rating}</span>
            <span>({course.students.toLocaleString('ru-RU')})</span>
          </span>
          <span>{course.lessons} уроков</span>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-slate-900">{formatPrice(course.price)}</span>
            {course.oldPrice && (
              <span className="text-sm text-slate-400 line-through">{formatPrice(course.oldPrice)}</span>
            )}
          </div>
          <button
            onClick={() => addToCart(course)}
            disabled={added}
            className={added ? 'btn bg-emerald-100 text-emerald-700' : 'btn-primary'}
          >
            {added ? '✓ В корзине' : 'В корзину'}
          </button>
        </div>
      </div>
    </article>
  )
}
