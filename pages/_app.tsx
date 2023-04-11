import type { AppProps } from 'next/app';
import { withAuthUser, AuthAction } from 'next-firebase-auth';
import { Hydrate, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';

import '@styles/globals.css';
import ErrorBoundary from '@components/ErrorBoundary';
import Error from '@components/ErrorBoundary/Error';
import Layout from '@components/Layout';
import { authService } from '@services/auth';
import store, { persistor } from '@store/rootStore';
import { theme } from '@styles/theme';
import queryClient from '@utils/queryUtils';
// firebase emulator 테스트 시 아래 주석 해제
// import '../debug.config';

authService.initAuth();

// TODO-redux-wrapper 관련 로직 추가
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeProvider theme={theme}>
              <ErrorBoundary fallback={<Error />}>
                <Layout>
                  {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                  <Component {...pageProps} />
                </Layout>
              </ErrorBoundary>
            </ThemeProvider>
          </Hydrate>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  // @ts-ignore
})(MyApp);
