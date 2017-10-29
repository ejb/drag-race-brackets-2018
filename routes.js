import AppComponent from './components/app';
import IndexComponent from './components/index';
import AboutComponent from './components/about';
import UserPage from './components/user';

const routes = {
  path: '',
  component: AppComponent,
  childRoutes: [
    {
      path: '/',
      component: IndexComponent
    },
    {
      path: '/u/:id',
      component: UserPage
    },
    {
      path: '/about',
      component: AboutComponent
    }
  ]
}

export { routes };
