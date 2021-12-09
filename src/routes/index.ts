import IRoute from '../interfaces/IRoute'
import Dashboard from '../pages/Admin/Dashboard'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'

const authRoutes: IRoute[] = [
   {
      path: '/login',
      auth: false,
      name: 'Login',
      component: Login,
   },
   {
      path: '/register',
      auth: false,
      name: 'Register',
      component: Register,
   },
]

const adminRoutes: IRoute[] = [
   {
      path: '/admin',
      auth: true,
      name: 'Dashboard',
      component: Dashboard,
   },
]

const mainRoutes: IRoute[] = [
   {
      path: '/',
      auth: false,
      name: 'Home',
      component: Home,
   },
]

const routes: IRoute[] = [...authRoutes, ...adminRoutes, ...mainRoutes]

export default routes
