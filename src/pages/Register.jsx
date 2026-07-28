import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { AuthShell, Field } from './Login'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (form.password.length < 6) return setError('Пароль должен быть не короче 6 символов')
    if (form.password !== form.confirm) return setError('Пароли не совпадают')
    const res = register({ name: form.name, email: form.email, password: form.password })
    if (res.ok) navigate('/profile')
    else setError(res.error)
  }

  return (
    <AuthShell title="Создать аккаунт" subtitle="Начните учиться бесплатно прямо сейчас">
      <form onSubmit={onSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        )}
        <Field label="Имя" name="name" value={form.name} onChange={onChange} placeholder="Иван Иванов" />
        <Field label="Email" name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" />
        <Field label="Пароль" name="password" type="password" value={form.password} onChange={onChange} placeholder="Минимум 6 символов" />
        <Field label="Повторите пароль" name="confirm" type="password" value={form.confirm} onChange={onChange} placeholder="••••••••" />
        <button type="submit" className="btn-primary w-full">Зарегистрироваться</button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        Уже есть аккаунт?{' '}
        <Link to="/login" className="font-semibold text-brand-600 hover:underline">
          Войти
        </Link>
      </p>
    </AuthShell>
  )
}
