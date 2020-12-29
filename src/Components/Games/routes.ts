import { lazy } from 'react';
import { RouteDefinitions } from '../routeHook';

const routeDefinitions: RouteDefinitions = Object.entries({
  '/sales': lazy(() => import('./Sales')),
  '/conferences': lazy(() => import('./Conferences')),
});

export default routeDefinitions;
