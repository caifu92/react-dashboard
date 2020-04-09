import React from 'react';
import { Switch, Route, Redirect as ReactRouterRedirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Dashboard } from './dashboard/pages/Dashboard';
import { BulkUpload } from './bulkUpload/BulkUpload';
import { Login } from './pages/Login';
import { ActivateUser } from './pages/ActivateUser';
import { getUserToken } from './store/slices';

/** catch-all */
const NotFoundRoute = ({ fallback = '/' }) => <ReactRouterRedirect to={fallback} />;

export function Redirect(props) {
  return props.to ? <ReactRouterRedirect {...props} /> : null;
}

function ProtectedRoute({ component: Component, accessCode, ...rest }) {
  const authenticated = !!accessCode;

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <>
            <Component {...props} />
          </>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );
}

export const PROTECTED_ROUTES = [
  {
    path: '/access-passes',
    exact: true,
    title: 'Approvals',
    component: Dashboard,
  },
  {
    path: '/bulk-upload',
    exact: true,
    title: 'Bulk Upload',
    component: BulkUpload,
  },
];

export function AppRoutes() {
  const token = useSelector(getUserToken);
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to={{ pathname: '/access-passes' }} />} />
      <Route exact path="/login" render={({ history }) => <Login history={history} />} />
      <Route exact path="/activate-user" render={() => <ActivateUser />} />

      {PROTECTED_ROUTES.map(({ path, component, exact }) => (
        <ProtectedRoute
          accessCode={token}
          key="path"
          path={path}
          component={component}
          exact={exact}
        />
      ))}
      <Route component={NotFoundRoute} />
    </Switch>
  );
}

export default AppRoutes;
