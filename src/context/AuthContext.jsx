import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('eduflow_user')
    return saved ? JSON.parse(saved) : null
  })

  // «База» пользователей хранится в localStorage (логика только на фронте)
  const getUsers = () => JSON.parse(localStorage.getItem('eduflow_users') || '[]')
  const saveUsers = (users) => localStorage.setItem('eduflow_users', JSON.stringify(users))

  useEffect(() => {
    if (user) localStorage.setItem('eduflow_user', JSON.stringify(user))
    else localStorage.removeItem('eduflow_user')
  }, [user])

  const register = ({ name, email, password }) => {
    const users = getUsers()
    if (users.some((u) => u.email === email)) {
      return { ok: false, error: 'Пользователь с таким email уже существует' }
    }
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      // Прогресс обучения: id курса -> процент прохождения
      progress: { 1: 65, 3: 30 },
    }
    saveUsers([...users, newUser])
    const { password: _, ...safe } = newUser
    setUser(safe)
    return { ok: true }
  }

  const login = ({ email, password }) => {
    const users = getUsers()
    const found = users.find((u) => u.email === email && u.password === password)
    if (!found) return { ok: false, error: 'Неверный email или пароль' }
    const { password: _, ...safe } = found
    setUser(safe)
    return { ok: true }
  }

  const logout = () => setUser(null)

  const updateProgress = (courseId, percent) => {
    setUser((prev) => {
      if (!prev) return prev
      const next = { ...prev, progress: { ...prev.progress, [courseId]: percent } }
      // синхронизируем с «базой»
      const users = getUsers().map((u) =>
        u.id === prev.id ? { ...u, progress: next.progress } : u
      )
      saveUsers(users)
      return next
    })
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout, updateProgress }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
