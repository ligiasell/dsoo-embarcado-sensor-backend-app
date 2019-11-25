// Components

import Login from '../containers/Login';
import Carteirinha from '../containers/Carteirinha';
import NotFoundRoute from '../containers/NotFoundRoute';
import Carteiras from '../containers/Carteiras/Carteiras'


// Routes
import carteirinhaRoutes from '../containers/Carteirinha/routes';

const routes = [
  {
    component: Login,
    name: 'Login',
    path: '/login',
  },{
    name: 'Carteirinha',
    path: ['/carteirinha/:tab?','/'],
    component: Carteirinha,
    exact:true,
    beforeReturn: (props) => {
    const appHomeUrl = `/carteirinha/capa`;
      if (props.location.pathname === `/carteirinha`  ||
          props.location.pathname === `/carteirinha/` ||
          props.location.pathname === `/` ) {
        props.history.replace(appHomeUrl);
      }
    },
    routes: carteirinhaRoutes,
  },{
    name: 'Carteiras',
    path: '/carteiras',
    component: Carteiras
  },{
    name: 'Not Found Route',
    path: '/:anything',
    component: NotFoundRoute
  }
];

export default routes;
