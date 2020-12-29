import { ComponentType, lazy } from 'react';

const routesCollection: Record<string, ComponentType<unknown>> = {
  '/games': lazy(() => import('./Games')),
  '/books': lazy(() => import('./Books')),
};
export const featureRouteDefinitions = Object.entries(routesCollection);
