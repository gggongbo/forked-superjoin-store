import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import '@styles/globals.css';
import { theme } from '@styles/theme/index';
import Layout from '@components/Layout';

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

export default MyApp;
