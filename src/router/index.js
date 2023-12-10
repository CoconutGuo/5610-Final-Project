import Layout from '@/pages/Layout'
import Login from '@/pages/login'
import Register from '@/pages/register'
import HomeIndex from '@/pages/home'
import Profile from '@/pages/profile'
import ProfileBase from '@/pages/profile/profileBase'
import RequireAuth from '@/components/RequireAuth'
import RequireAuthRole from '@/components/RequireAuthRole'
import Search from '@/pages/search'
import Details from '@/pages/search/details'
import Admin from '@/pages/admin'
import Review from '@/pages/review'

const router = [
  {
    path: '/login',
    title: 'Login',
    element: <Login />,
  },
  {
    path: '/register',
    title: 'Register',
    element: <Register />,
  },
  {
    path: '/',
    title: 'Home',
    element: <Layout />,
    children: [
      { index: true, element: <HomeIndex /> },
      {
        path: '/profile/:uid',
        title: 'Profile',
        element: <ProfileBase />,
      },
      {
        path: '/search',
        title: 'Search',
        element: <Search />,
      },
      {
        path: '/details/:imdbID',
        title: 'Details',
        element: <Details />,
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: '/profile',
            title: 'Profile',
            element: <Profile />,
          },
          {
            path: '/admin',
            title: 'Admin',
            element: (
              <RequireAuthRole role="ADMIN">
                <Admin />
              </RequireAuthRole>
            ),
          },
          {
            path: '/review',
            title: 'Review',
            element: (
              <RequireAuthRole role="REVIEW">
                <Review />
              </RequireAuthRole>
            ),
          },
        ],
      },
    ],
  },
]

export const breadItems = [
  { path: '/', title: 'Home' },
  { path: '/login', title: 'Login' },
  { path: '/register', title: 'Register' },
  { path: '/profile/:uid', title: 'Profile' },
  { path: '/search', title: 'Search' },
  { path: '/details', title: 'Details' },
  { path: '/profile', title: 'Profile' },
  { path: '/admin', title: 'Admin' },
  { path: '/review', title: 'Review' },
]

export default router
