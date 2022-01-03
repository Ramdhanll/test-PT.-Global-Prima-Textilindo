import IRoute from '../interfaces/IRoute'
import Home from '../pages/Home'

const mainRoutes: IRoute[] = [
   {
      path: '/',
      auth: false,
      name: 'Home',
      component: Home,
   },
]

const routes: IRoute[] = [...mainRoutes]

export default routes
