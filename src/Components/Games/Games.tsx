import { Link, useLocation } from 'react-router-dom';
import { LazyRoutes } from '../routeHook';
import routeDefinitions from './routes';
// import { GamesRouting } from './games.routing';

export function Games() {
  const { pathname } = useLocation();

  console.log('render Games');
  return (
    <div>
      <h1>Games</h1>
      <hr />
      <div>
        <ul>
          <li>
            <Link to={`${pathname}/sales`}>Sales</Link>
          </li>
          {/*  just a try - not used
            <li>
              <Link to={`${url}/sales2`}>Sales 2</Link>
            </li>
           */}
          <li>
            <Link to={`${pathname}/conferences`}>Conferences</Link>
          </li>
        </ul>

        <hr />

        <LazyRoutes routes={routeDefinitions} />
      </div>
    </div>
  );
}
