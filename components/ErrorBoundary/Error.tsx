import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';

import Button from '@components/basicComponent/Button';
import Oval from '@components/basicComponent/Oval';
import logoIcon from '@resources/svg/logo/logo-icon.svg';
import logoTitle from '@resources/svg/logo/logo-title.svg';
import { authService } from '@services/auth';
import { persistor } from '@store/rootStore';

const ErrorBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  color: ${({ theme }) => theme.colors.singletons.black}; //default color
`;

const ErrorTopNavbarBlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  min-width: ${({ theme }) => theme.componentSizes.topNavbar.width}px;
  height: ${({ theme }) => theme.componentSizes.topNavbar.height}px;
  top: 0px;
  padding: 0px 24px 0px 32px;
  background-color: ${props => props.theme.colors.singletons.defaultBackground};
  -webkit-box-shadow: 0px 1px 3px 0px
    ${props => `${props.theme.colors.singletons.realBlack}20`};
  box-shadow: 0px 1px 3px 0px
    ${props => `${props.theme.colors.singletons.realBlack}20`};
  z-index: 999;
`;

const ErrorTopTitleBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LogoIcon = styled.div`
  width: 40px;
  aspect-ratio: 0.9;
  background-image: url(${logoIcon.src});
  background-position: center;
  background-size: cover;
`;

const LogoTitle = styled.div`
  width: 128px;
  aspect-ratio: 4;
  margin-left: 10px;
  background-image: url(${logoTitle.src});
  background-position: center;
  background-size: cover;
`;

const TitleText = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: ${props => props.theme.colors.singletons.realBlack};
  word-break: keep-all;
`;

const TitleOval = styled(Oval)`
  margin: 0px 12px 0px 15px;
  aspect-ratio: 1;
`;

const ErrorContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const ErrorTitleTextBlock = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 500;
`;

const ErrorContentTextBlock = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-top: 20px;
`;

const ButtonBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const buttonStyle = css`
  padding: 10px 20px;
  margin-right: 8px;
`;

const buttonTextStyle = css`
  color: ${props => props.theme.colors.singletons.black};
`;

interface ErrorProps {}

const Error: NextPage<ErrorProps> = function Error() {
  const router = useRouter();

  return (
    <ErrorBlock>
      <Head>
        <title>Superjoin</title>
        <meta name="description" content="Superjoin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ErrorTopNavbarBlock>
        <ErrorTopTitleBlock>
          <LogoIcon />
          <LogoTitle />
          <TitleOval width={4} height={4} />
          <TitleText>셀프 관리 서비스</TitleText>
        </ErrorTopTitleBlock>
      </ErrorTopNavbarBlock>
      <ErrorContentBlock>
        <ErrorTitleTextBlock>페이지를 표시할 수 없습니다.</ErrorTitleTextBlock>
        <ErrorContentTextBlock>
          {`기술적인 문제로 페이지가 표시되지 않았습니다.\n아래 돌아가기 혹은
          로그아웃 버튼 이용 부탁드리며, 이용에 불편을 드려 사과드립니다.`}
        </ErrorContentTextBlock>
        <ButtonBlock>
          <Button
            text="돌아가기"
            color="gray"
            colorIndex={300}
            customStyle={buttonStyle}
            textStyle={buttonTextStyle}
            onClick={() => {
              router.push('/');
            }}
          />
          <Button
            text="로그아웃"
            color="gray"
            colorIndex={300}
            customStyle={buttonStyle}
            textStyle={buttonTextStyle}
            onClick={() => {
              persistor.purge().then(() => {
                sessionStorage.clear();
                authService.logOut();
                router.reload();
              });
            }}
          />
        </ButtonBlock>
      </ErrorContentBlock>
    </ErrorBlock>
  );
};

export default Error;
