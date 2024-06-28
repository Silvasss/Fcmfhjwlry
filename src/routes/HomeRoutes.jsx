import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import Home from '../layout/Home';
import { loader } from '../pages/home/index';

const HomeDefault = Loadable(lazy(() => import('../pages/home/index')));

// ==============================|| MAIN ROUTING ||============================== //

const HomeRoutes = {
  path: '/',
  element: <Home />,
  children: [
    {
      path: '/',
      element: <HomeDefault />,
      loader: loader()
    }
  ]
};

export default HomeRoutes;
