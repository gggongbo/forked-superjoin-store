import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import TopNavbar from './TopNavbar';
import SideNavbar from './SideNavbar';

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100vw;
  min-height: 100vh;
`;

const ContentBlock = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100vw;
`;

const MainBlock = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
`;

const Layout: NextPage<LayoutProps> = function Layout(props) {
  const { children } = props;
  return (
    <LayoutBlock>
      <Head>
        <title>Superjoin</title>
        <meta name="description" content="Superjoin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* TODO: session, cookie 있으면 login render  */}
      <TopNavbar />
      <ContentBlock>
        <SideNavbar />
        <MainBlock>{children}</MainBlock>
      </ContentBlock>
    </LayoutBlock>
  );
};

export default Layout;