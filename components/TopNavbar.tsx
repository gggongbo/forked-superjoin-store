import { FC } from 'react';
import styled from 'styled-components';

import Divider from '@components/BasicComponent/Divider';
import Oval from '@components/BasicComponent/Oval';
import UserInfo from '@components/UserInfo';
import UserNotification from '@components/UserNotification';
import logoIcon from '@resources/svg/logo/logo-icon.svg';
import logoTitle from '@resources/svg/logo/logo-title.svg';

const NavbarBlock = styled.div`
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

const TitleBlock = styled.div`
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

const UserBlock = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
`;

const UserNotificationBlock = styled.div`
  padding: 0px 18px;
`;

const UserInfoBlock = styled.div`
  padding-left: 24px;
  @media ${({ theme }) => theme.media.mobile} {
    padding-left: 5px;
  }
`;

const TopNavbar: FC = function TopNavbar() {
  return (
    <NavbarBlock>
      <TitleBlock>
        <LogoIcon />
        <LogoTitle />
        <TitleOval width={4} height={4} />
        <TitleText>셀프 관리 서비스</TitleText>
      </TitleBlock>
      <UserBlock>
        <Divider isVertical />
        <UserNotificationBlock>
          <UserNotification />
        </UserNotificationBlock>
        <Divider isVertical />
        <UserInfoBlock>
          <UserInfo />
        </UserInfoBlock>
      </UserBlock>
    </NavbarBlock>
  );
};

export default TopNavbar;
