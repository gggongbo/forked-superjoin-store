import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import TopNavbar from './TopNavbar';
import SideNavbar from './SideNavbar';

interface LayoutProps {
  children: React.ReactElement;
}

const LayoutBlock = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  position: relative;
  width: 100vw;
  min-height: 100vh;
  color: ${props => props.theme.colors.singletons.black}; //default color
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
      {children && children.props.pathname !== '/login' ? (
        <>
          <TopNavbar />
          <ContentBlock>
            <SideNavbar />
            <MainBlock>{children}</MainBlock>
          </ContentBlock>
        </>
      ) : (
        <ContentBlock>
          <MainBlock>{children}</MainBlock>
        </ContentBlock>
      )}
    </LayoutBlock>
  );
};

export default Layout;
