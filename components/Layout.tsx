import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';

import SideNavbar from './SideNavbar';
import TopNavbar from './TopNavbar';

interface LayoutProps {
  children: React.ReactElement;
}

const LayoutBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  color: ${props => props.theme.colors.singletons.black}; //default color
`;

const MainBlock = styled.div``;

const LoginBlock = styled.div``;

const ContentBlock = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100vw;
  min-height: 89vh;
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
  return (
    <LayoutBlock>
      <Head>
        <title>Superjoin</title>
        <meta name="description" content="Superjoin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children && type?.displayName !== 'Login' ? (
        <MainBlock>
          <TopNavbar />
          <ContentBlock>
            <SideNavbar />
            <MainContentBlock>{children}</MainContentBlock>
          </ContentBlock>
        </MainBlock>
      ) : (
        <LoginBlock>
          <ContentBlock>
            <MainBlock>{children}</MainBlock>
          </ContentBlock>
        </LoginBlock>
      )}
    </LayoutBlock>
  );
};

export default Layout;
