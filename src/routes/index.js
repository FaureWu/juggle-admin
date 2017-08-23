import Home from './home';
import Product from './product';
import New from './new';
import Database from './database';
import Config from './config';
import Login from './login';
import Main from './main';
import NotFound from './notFound';

/*
 *  Route config definition example
 *    path{String}
 *    exact{Bool}
 *    strict{Bool}
 *    component{React Element}
 *    routes{Route definition}
 */

export const loginRoute = {
  key: 'login',
  path: '/login',
  title: '登陆',
  component: Login,
};

export const rootRoute = {
  key: 'main',
  path: '/',
  title: '管理系统',
  component: Main,
};

export const mainRoutes = [
  {
    key: 'home',
    path: '/home',
    icon: 'home',
    title: '首页',
    component: Home,
  },
  {
    key: 'product',
    path: '/product',
    icon: 'inbox',
    title: '产品',
    component: Product,
  },
  {
    key: 'new',
    path: '/new',
    icon: 'global',
    title: '新闻',
    component: New,
  },
  {
    key: 'database',
    path: '/database',
    icon: 'database',
    title: '数据库',
    component: Database,
  },
  {
    key: 'config',
    path: '/config',
    icon: 'setting',
    title: '基本信息',
    component: Config,
  },
];

export const notFound = {
  key: 'notFound',
  component: NotFound,
};
