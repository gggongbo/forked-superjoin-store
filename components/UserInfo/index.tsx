import { useRouter } from 'next/router';
import { FC, useState, useCallback, useRef, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import SubTextButton from '@components/basicComponent/SubTextButton';
import Icon from '@components/Icon';
import { CurrentUserType, ReduxStoreType } from '@constants/types/redux';
import { useConfirm } from '@hooks/useConfirm';
import { useInClick } from '@hooks/useInClick';
import { authService } from '@services/auth';
import { storeUserService } from '@services/storeUser';
import { persistor } from '@store/rootStore';

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
  background-color: ${({ theme }) => theme.colors.gray[400]};
  background-position: center;
  background-size: cover;
  @media ${({ theme }) => theme.media.mobile} {
    width: 15px;
  }
`;

const UserEmail = styled.div`
  margin: 0 16px;
  font-size: 14px;
  color: ${({ theme }) => `${theme.colors.singletons.realBlack}84`};
  word-break: keep-all;
  @media ${({ theme }) => theme.media.tablet} {
    margin: 0 8px;
  }
  @media ${({ theme }) => theme.media.mobile} {
    margin: 0 2px;
    font-size: 10px;
  }
`;

const IconBlock = styled.div<{ inClicked: boolean }>`
  border-radius: 100px;
  border-style: solid;
  border-width: 0px;
  padding: 8px;
  background-color: ${({ inClicked, theme }) =>
    inClicked
      ? `${theme.colors.green[100]}60`
      : theme.colors.singletons.defaultBackground};

  :hover {
    background-color: ${({ theme }) => `${theme.colors.green[100]}24`};
  }

  :active,
  :visited {
    background-color: ${({ theme }) => `${theme.colors.green[100]}60`};
  }
`;

const UserBlock = styled.div<{ contentHeight?: number }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 0px;
  top: ${({ contentHeight }) => (contentHeight || 0) + 2}px;
  width: 155px;
  aspect-ratio: 2.9;
`;

const UserInfo: FC = function UserInfo() {
  const router = useRouter();
  const currentUser = useSelector<ReduxStoreType, CurrentUserType>(
    ({ auth }) => auth.currentUser,
  );
  const userEmail = currentUser?.email || 'unknown';
  const userImage = currentUser?.avatar || null;
  const [contentHeight, setContentHeight] = useState<number>(0);
  const contentRef = useRef(null);
  const { inClicked, setInClicked } = useInClick(contentRef);
  const { confirm } = useConfirm();

  useLayoutEffect(() => {
    if (contentRef.current) {
      const { clientHeight } = contentRef.current;
      setContentHeight(clientHeight);
    }
  }, []);

  const onLogout = useCallback(() => {
    persistor.purge().then(() => {
      sessionStorage.clear();
      storeUserService
        .resetPushToken(currentUser.id)
        .finally(() => authService.logOut())
        .finally(() => router.reload());
    });
  }, [currentUser.id, router]);

  const onUpdatePassword = useCallback(() => {
    if (!userEmail) return;
    confirm('비밀번호를 초기화 하시겠습니까?', () => {
      authService
        .updatePassword(userEmail)
        .then(() => {
          alert(`${userEmail} 으로 재설정 메일을 보냈습니다.`);
        })
        .catch(e => console.log(e));
    });
  }, [confirm, userEmail]);

  return (
    <UserInfoBlock onClick={() => setInClicked(prev => !prev)} ref={contentRef}>
      <UserImage userImage={userImage} />
      <UserEmail>{userEmail}</UserEmail>
      <IconBlock inClicked={inClicked}>
        <Icon name="ChevronDown" width={18} height={18} color="black" />
      </IconBlock>
      {inClicked && (
        <UserBlock contentHeight={contentHeight}>
          <SubTextButton
            title="로그아웃"
            icon={{ name: 'Out', width: 18, height: 18 }}
            onClick={onLogout}
          />
          <SubTextButton
            title="비밀번호 초기화"
            icon={{ name: 'Out', width: 18, height: 18 }}
            onClick={onUpdatePassword}
          />
        </UserBlock>
      )}
    </UserInfoBlock>
  );
};

export default UserInfo;
