import { FC, useState, useCallback } from 'react';
import styled from 'styled-components';
import logoIcon from '@resources/svg/logo/logo-icon.svg';
import logoTitle from '@resources/svg/logo/logo-title.svg';
import Divider from './basicComponent/Divider';
import Oval from './basicComponent/Oval';
import UserInfo from './UserInfo';
import SubText from './basicComponent/SubText';

const NavbarBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  aspect-ratio: 26;
  min-height: 50px;
  /* position: fixed; */
  top: 0px;
  padding: 0px 32px;
  background: ${props => props.theme.colors.singletons.defaultBackground};
  -webkit-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2);
  z-index: 999;
  @media ${({ theme }) => theme.media.mobile} {
    padding: 0px 20px;
  }
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
  @media ${({ theme }) => theme.media.mobile} {
    font-size: 15px;
  }
`;

const TitleOval = styled(Oval)`
  margin: 0px 12px 0px 15px;
  aspect-ratio: 1;
`;

const UserInfoBlock = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
`;

const VerticalDivider = styled(Divider)`
  margin-right: 30px;
  @media ${({ theme }) => theme.media.mobile} {
    margin-right: 5px;
  }
`;

const LogoutBlock = styled(SubText)`
  /* width: 100px;
  height: 100px; */
  position: absolute;
  margin-top: 30px;
`;

const TopNavbar: FC = function TopNavbar() {
  const [logoutVisible, setLogoutVisible] = useState(false);

  const onUserInfoPress = useCallback(
    () =>
      setLogoutVisible(prev => {
        console.log('p', prev);
        return !prev;
      }),
    [],
  );

  return (
    <NavbarBlock>
      <TitleBlock>
        <LogoIcon />
        <LogoTitle />
        <TitleOval width={4} height={4} />
        <TitleText>셀프 관리 서비스</TitleText>
      </TitleBlock>
      <UserInfoBlock>
        <VerticalDivider isVertical />
        <UserInfo
          userId="testId@test.com"
          logoutVisible={logoutVisible}
          onClick={onUserInfoPress}
        />
      </UserInfoBlock>
      <LogoutBlock
        title="logout"
        icon={{ name: 'Out', width: 18, height: 18 }}
        onClick={() => {
          console.log('log out clicked');
        }}
      />
    </NavbarBlock>
  );
};

export default TopNavbar;
