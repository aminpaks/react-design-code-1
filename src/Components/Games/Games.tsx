import { Link } from 'react-router-dom';
import { LazyRoutes } from '../LazyRoutes';
import routeDefinitions from './routes';
import { SalesStateProvider, ConferencesStateProvider } from './Context';

const gamesRoute = '/games';

export function Games() {
  console.log('Render Games');
  return (
    <div className="position--relative">
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

        <ConferencesStateProvider>
          <SalesStateProvider>
            <LazyRoutes prefixPath={gamesRoute} routes={routeDefinitions} />
          </SalesStateProvider>
        </ConferencesStateProvider>
      </div>
    </div>
  );
}
