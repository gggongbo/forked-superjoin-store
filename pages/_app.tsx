import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import '@styles/globals.css';
import { theme } from '@styles/theme';
import Layout from '@components/Layout';
import { withAuthUser, AuthAction } from 'next-firebase-auth';
import initAuth from '@service/login/initAuth';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClientProvider } from 'react-query';
import queryClient from '@utils/queryUtils';
import store, { persistor } from '../store';

initAuth();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <Layout>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: '/login',
  // @ts-ignore
})(MyApp);
