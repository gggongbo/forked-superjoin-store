import { FC, useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useAuthUser } from 'next-firebase-auth';
import { userService } from '@service/user';
import Icon from '../Icon';
import SubText from '../basicComponent/SubText';

const UserInfoBlock = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
`;

const UserImage = styled.div<{ userImage?: string | null }>`
  width: 36px;
  aspect-ratio: 1;
  border-radius: 8px;
  background-image: url(${props => props.userImage});
  background-color: gray;
  background-position: center;
  background-size: cover;
  @media ${({ theme }) => theme.media.mobile} {
    width: 15px;
  }
`;

const UserId = styled.div`
  margin: 0 16px;
  /* opacity: 0.84; */
  font-size: 14px;
  color: ${props => `${props.theme.colors.singletons.realBlack}84`};
  word-break: keep-all;
  @media ${({ theme }) => theme.media.tablet} {
    margin: 0 8px;
  }
  @media ${({ theme }) => theme.media.mobile} {
    margin: 0 2px;
    font-size: 10px;
  }
`;

const IconBlock = styled.div<{ logoutVisible: boolean }>`
  border-radius: 100px;
  border-style: solid;
  border-width: 0px;
  padding: 8px;
  background-color: ${props =>
    props.logoutVisible
      ? `${props.theme.colors.singletons.pressGreen}60`
      : props.theme.colors.singletons.defaultBackground};

  :hover {
    background-color: ${props =>
      `${props.theme.colors.singletons.pressGreen}24`};
  }

  :active,
  :visited {
    background-color: ${props =>
      `${props.theme.colors.singletons.pressGreen}60`};
  }
`;

const UserBlock = styled.div<{ contentHeight?: number }>`
  position: absolute;
  display: flex;
  right: 0px;
  top: ${props => (props.contentHeight || 0) + 2}px;
  width: 155px;
  aspect-ratio: 2.9;
`;

const UserInfo: FC = function UserInfo() {
  const AuthUser = useAuthUser();
  const userId = AuthUser?.email || 'unknown';
  const userImage = AuthUser?.photoURL || null;
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);
  const onUserInfoPress = useCallback(
    () => setLogoutVisible(prev => !prev),
    [],
  );
  useEffect(() => {
    if (contentRef.current) {
      const { clientHeight } = contentRef.current;
      setContentHeight(clientHeight);
    }

    const preventClose = () => {
      // TODO reload 시에도 동작을 함
      const auto = localStorage.getItem('autoLogin');
      if (auto === 'false') {
        AuthUser.signOut();
      }
    };

    (() => {
      window.addEventListener('beforeunload', preventClose);
    })();
    return () => {
      window.removeEventListener('beforeunload', preventClose);
    };
  }, [AuthUser, userId]);

  // TODO: outside click event
  return (
    <UserInfoBlock onClick={onUserInfoPress} ref={contentRef}>
      <UserImage userImage={userImage} />
      <UserId>{userId}</UserId>
      <IconBlock logoutVisible={logoutVisible}>
        <Icon name="ChevronDown" width={18} height={18} color="black" />
      </IconBlock>
      {logoutVisible && (
        <>
          <UserBlock contentHeight={contentHeight}>
            <SubText
              title="로그아웃"
              icon={{ name: 'Out', width: 18, height: 18 }}
              onClick={() => AuthUser.signOut()}
            />
          </UserBlock>
          <UserBlock contentHeight={contentHeight + 58}>
            <SubText
              title="비밀번호 초기화"
              icon={{ name: 'Out', width: 18, height: 18 }}
              onClick={() => userService.updatePassword(userId)}
            />
          </UserBlock>
        </>
      )}
    </UserInfoBlock>
  );
};

export default UserInfo;
