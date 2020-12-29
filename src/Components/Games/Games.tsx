import { Link } from 'react-router-dom';
import { LazyRoutes } from '../routeHook';
import routeDefinitions from './routes';
import { SalesStateProvider } from './Context';

const gamesRoute = '/games';

export function Games() {
  console.log('Render Games');
  return (
    <div>
      <h1>Games</h1>
      <hr />
      <div>
        <ul>
          <li>
            <Link to={`${gamesRoute}/sales`}>Sales</Link>
          </li>
          <li>
            <Link to={`${gamesRoute}/conferences`}>Conferences</Link>
          </li>
        </ul>

        <hr />

        <SalesStateProvider>
          <LazyRoutes prefixPath={gamesRoute} routes={routeDefinitions} />
        </SalesStateProvider>
      </div>
    </div>
  );
}
