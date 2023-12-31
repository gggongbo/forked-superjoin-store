import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import SideNavbar from './SideNavbar';
import TopNavbar from './TopNavbar';

import NotificationList from '@components/UserNotification/NotificationList';
import { ReduxStoreType, CurrentUserType } from '@constants/types/redux';
import { usePushNotification } from '@hooks/usePushNotification';
import { useWindowSize } from '@hooks/useWindowSize';
import { authService } from '@services/auth';
import { storeUserService } from '@services/storeUser';
import { persistor } from '@store/rootStore';

interface LayoutProps {
  children: React.ReactElement;
}

const LayoutBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  color: ${({ theme }) => theme.colors.singletons.black}; //default color
`;

const MainBlock = styled.div``;

const LoginBlock = styled.div``;

const ContentBlock = styled.div<{ height: number }>`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100vw;
  height: ${({ height, theme }) =>
    height - theme.componentSizes.topNavbar.height}px;
`;

const MainContentBlock = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
`;

const Layout: NextPage<LayoutProps> = function Layout(props) {
  const { children } = props;
  // eslint-disable-next-line no-undef
  const { type } = children as JSX.Element;
  const { autoLogin, currentUser } = useSelector<
    ReduxStoreType,
    { autoLogin: boolean; currentUser: CurrentUserType }
  >(({ auth }) => auth);
  const { windowSize } = useWindowSize();
  const { getToken, onMessage } = usePushNotification();

  useLayoutEffect(() => {
    const sessionStart = Boolean(sessionStorage.getItem('sessionStart'));
    if (!sessionStart && !autoLogin) {
      persistor.purge().then(() => {
        sessionStorage.clear();
        authService.logOut();
      });
    }
  }, [autoLogin]);

  useLayoutEffect(() => {
    let subscriber: (() => void) | null = null;
    if (currentUser?.id) {
      (async () => {
        const token = await getToken();
        if (token) {
          storeUserService.updatePushToken(currentUser.id, token);
        } else {
          // TODO: push notification permission 허용해야 한다는 안내 표시
          console.log('need push notification permission');
        }
      })();
      subscriber = onMessage();
    }
    return () => {
      subscriber?.();
    };
  }, [currentUser, getToken, onMessage]);

  return (
    <LayoutBlock>
      <Head>
        <title>Superjoin</title>
        <meta name="description" content="Superjoin" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children && type?.displayName !== 'Login' ? (
        <MainBlock>
          <TopNavbar />
          <ContentBlock height={windowSize.height}>
            <SideNavbar />
            <MainContentBlock>{children}</MainContentBlock>
            <NotificationList />
          </ContentBlock>
        </MainBlock>
      ) : (
        <LoginBlock>
          <ContentBlock height={windowSize.height}>
            <MainBlock>{children}</MainBlock>
          </ContentBlock>
        </LoginBlock>
      )}
    </LayoutBlock>
  );
};

export default Layout;
