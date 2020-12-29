import dayjs from 'dayjs';
import dayjsUtc from 'dayjs/plugin/utc';
import dayjsTimezone from 'dayjs/plugin/timezone';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Home } from './Home';
import { Navigration } from './Nav';
import { LazyRoutes } from './LazyRoutes';
import { featureRouteDefinitions } from './AppFeatures';

dayjs.extend(dayjsUtc);
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
