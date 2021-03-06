import React, { useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PageSpinner from '../common/components/PageSpinner';
import { saveUser } from '../store/slices';
import { useQueryString } from '../hooks';

export const Auth = () => {
  const [keycloak] = useKeycloak();
  const { authenticated } = keycloak;
  const { push, location } = useHistory();
  const { authAction } = useParams();
  const dispatch = useDispatch();
  const { queryString } = useQueryString();

  useEffect(() => {
    async function changePassword() {
      const redirect_uri = encodeURIComponent(`${process.env.REACT_APP_BASE_URL}/`);
      const redirectLink = `${process.env.REACT_APP_KEYCLOAK_URL}/realms/${process.env.REACT_APP_KEYCLOAK_REALM}/account/password?referrer_uri=${redirect_uri}&referrer=${process.env.REACT_APP_KEYCLOAK_CLIENTID}`;
      window.location = redirectLink;
    }

    async function loadProfile() {
      const profile = await keycloak.loadUserProfile();
      const { token, tokenParsed } = keycloak;
      const xsrfToken = keycloak.sessionId;
      const { username } = profile;

      if (tokenParsed.aportypes) {
        const aporTypes = tokenParsed.aportypes.split(',').map((a) => a.trim());
        dispatch(saveUser({ username, token, xsrfToken, aporTypes }));
        if (keycloak.realmAccess.roles.includes("INSPECTOR")) {
          push('/checkpoint-devices');
        } else {
          push(queryString.next);
        }
        // @todo This should redirect to ?next=
      } else {
        push('/login', {
          error: true,
        });
      }
    }

    const next = location.state ? location.state.from : '/';

    switch (authAction) {
      case 'verify':
        if (authenticated === true) {
          loadProfile();
        } else {
        }

        break;
      case 'register':
        keycloak.register({
          redirectUri: `${process.env.REACT_APP_BASE_URL}/auth/verify?next=${next}`,
        });

        break;
      case 'logout':
        keycloak.logout({
          redirectUri: `${process.env.REACT_APP_BASE_URL}/login`,
        });

        break;
      case 'change-password':
        changePassword();
        break;
      case 'login':
        keycloak.login({
          redirectUri: `${process.env.REACT_APP_BASE_URL}/auth/verify?next=${next}`,
        });

        break;
      default:
        keycloak.login({
          redirectUri: `${process.env.REACT_APP_BASE_URL}/auth/verify?next=${next}`,
        });

        break;
    }
  }, [push, authenticated, keycloak, dispatch, authAction, location, queryString]);

  return <PageSpinner />;
};
