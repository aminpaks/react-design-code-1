import dayjs from 'dayjs';
import dayjsTimezone from 'dayjs/plugin/timezone';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Home } from './Home';
import { Navigration } from './Nav';
import { LazyRoutes } from './routeHook';
import { featureRouteDefinitions } from './AppFeatures';

dayjs.extend(dayjsTimezone);
dayjs.tz.setDefault('America/Montreal');

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <Navigration />

          <hr />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <LazyRoutes routes={featureRouteDefinitions} />
          </Switch>
        </div>
      </Router>
    </QueryClientProvider>
  );
}
