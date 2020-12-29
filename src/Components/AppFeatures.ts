import { lazy } from 'react';
import { RouteDefinitions } from '../types';

export const featureRouteDefinitions: RouteDefinitions = Object.entries({
  '/games': lazy(() => import('./Games')),
  '/books': lazy(() => import('./Books')),
});
