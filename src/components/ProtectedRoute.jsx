import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Пускает на страницу только авторизованных пользователей
export default function ProtectedRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}
