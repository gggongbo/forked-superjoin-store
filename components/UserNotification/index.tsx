import { FC } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import IconButton from '@components/BasicComponent/IconButton';
import { ReduxStoreType } from '@constants/types/redux';
import { storeUserActions } from '@slices/storeUser';
import { useAppDispatch } from '@store/rootStore';

const UserNotificationBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const BadgeBlock = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.singletons.green};
  border-radius: 20px;
  padding: 1px 7px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.singletons.white};

  margin-top: -8px;
  margin-left: 12px;
`;

const defaultIconButtonStyle = css`
  border-radius: 20px;
  border-width: 0px;
`;

const visibleIconButtonStyle = css`
  border-radius: 20px;
  border-width: 0px;
  background-color: ${({ theme }) => `${theme.colors.green[100]}60`};
`;

const UserNotification: FC = function UserNotification() {
  const dispatch = useAppDispatch();
  const { notificationVisible, numOfNotification } = useSelector<
    ReduxStoreType,
    { notificationVisible: boolean; numOfNotification: number }
  >(({ storeUser }) => storeUser);

  return (
    <UserNotificationBlock>
      <IconButton
        icon={{
          name: !notificationVisible ? 'Bell' : 'BellSurface',
          width: 20,
          height: 20,
          color: !notificationVisible ? 'black' : 'green',
        }}
        customStyle={
          !notificationVisible ? defaultIconButtonStyle : visibleIconButtonStyle
        }
        onClick={() => {
          dispatch(
            storeUserActions.setNotificationVisible(!notificationVisible),
          );
        }}
      />
      {numOfNotification > 0 && <BadgeBlock>{numOfNotification}</BadgeBlock>}
    </UserNotificationBlock>
  );
};

export default UserNotification;
