import { lazy, ComponentType } from 'react';
import { RouteDefinitions } from '../routeHook';

const routeCollection: Record<string, ComponentType> = {
  '/sales': lazy(() => import('./Sales')),
  '/conferences': lazy(() => import('./Conferences')),
};
const routeDefinitions: RouteDefinitions = Object.entries(routeCollection);

export default routeDefinitions;
