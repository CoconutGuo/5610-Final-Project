import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from '@/router'
import { UserProvider } from '@/store/useUser'
import './App.css'

function App() {
  const router = createBrowserRouter(routes)

  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  )
}

export default App
