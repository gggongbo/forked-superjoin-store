import type { AppProps } from 'next/app';
import { withAuthUser, AuthAction } from 'next-firebase-auth';
import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';

import '@styles/globals.css';
import Layout from '@components/Layout';
import { authService } from '@services/auth';
import store, { persistor } from '@store/rootStore';
import { theme } from '@styles/theme';
import queryClient from '@utils/queryUtils';
// firebase emulator 테스트 시 아래 주석 해제
// import '../debug.config';

authService.initAuth();

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
  // @ts-ignore
})(MyApp);
