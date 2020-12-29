import { FC, ReactNode, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { RouteDefinitions } from '../types';

const defaultFallbackSpinner = <div>Loading...</div>;

export const LazyRoutes: FC<{
  routes: RouteDefinitions;
  prefixPath?: string;
  fallback?: ReactNode;
}> = ({ routes, prefixPath = '', fallback = defaultFallbackSpinner }) => {
  const switchStatement = (
    <Switch>
      {routes.map(([path, Component]) => (
        <Route key={path} path={prefixPath + path}>
          <Component />
        </Route>
      ))}
    </Switch>
  );

  // In case we wanna catch in upper bound we don't provide a Suspense at this level
  if (fallback === null) {
    return switchStatement;
  }

  return <Suspense fallback={fallback}>{switchStatement}</Suspense>;
};
