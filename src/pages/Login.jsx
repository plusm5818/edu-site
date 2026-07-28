import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    const res = login(form)
    if (res.ok) navigate('/profile')
    else setError(res.error)
  }

  return (
    <AuthShell title="С возвращением 👋" subtitle="Войдите, чтобы продолжить обучение">
      <form onSubmit={onSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        )}
        <Field label="Email" name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" />
        <Field label="Пароль" name="password" type="password" value={form.password} onChange={onChange} placeholder="••••••••" />
        <button type="submit" className="btn-primary w-full">Войти</button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        Нет аккаунта?{' '}
        <Link to="/register" className="font-semibold text-brand-600 hover:underline">
          Зарегистрироваться
        </Link>
      </p>
    </AuthShell>
  )
}

export function AuthShell({ title, subtitle, children }) {
  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16">
      <div className="card p-8">
        <div className="mb-6 text-center">
          <span className="text-4xl">🎓</span>
          <h1 className="mt-2 text-2xl font-extrabold text-slate-900">{title}</h1>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  )
}

export function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      <input className="input" required {...props} />
    </label>
  )
}
