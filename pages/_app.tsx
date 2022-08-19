import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import '@styles/globals.css';
import { theme } from '@styles/theme';
import Layout from '@components/Layout';
import { withAuthUser, AuthAction } from 'next-firebase-auth';
import initAuth from '@service/login/initAuth';

initAuth();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

// export default MyApp;

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: '/login',
  // @ts-ignore
})(MyApp);
