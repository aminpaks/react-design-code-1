import { ComponentType, createElement, FC, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

export type RouteDefinition = [string, ComponentType];
export type RouteDefinitions = RouteDefinition[];

export const LazyRoutes: FC<{
  routes: RouteDefinitions;
}> = ({ routes }) => {
  return createElement(
    Suspense,
    { fallback: createElement('div', null, 'Loading...') },
    createElement(
      Switch,
      null,
      routes.map(([path, Component]) =>
        createElement(Route, { key: path, path, component: Component }, null)
      )
    )
  );
};
