import { lazy } from 'react';
import { RouteDefinitions } from './routeHook';

export const featureRouteDefinitions: RouteDefinitions = Object.entries({
  '/games': lazy(() => import('./Games')),
  '/books': lazy(() => import('./Books')),
});
