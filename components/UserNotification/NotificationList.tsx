import { FC, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import NotificationItem from './NotificationItem';

import Divider from '@components/BasicComponent/Divider';
import IconButton from '@components/BasicComponent/IconButton';
import ListBox from '@components/BasicComponent/ListBox';
import { notificationKeys } from '@constants/queryKeys';
import {
  NotificationItemType,
  NotificationType,
  UpdateUnreadNotificationParamType,
} from '@constants/types/notification';
import { CurrentStoreUserType, ReduxStoreType } from '@constants/types/redux';
import { useReactMutation } from '@hooks/useReactMutation';
import { useReactQuery } from '@hooks/useReactQuery';
import { notificationService } from '@services/notification';
import { storeUserActions } from '@slices/storeUser';
import { useAppDispatch } from '@store/rootStore';
import { getFormattedTime } from '@utils/dateUtils';

const NotificationListBlock = styled.div`
  display: flex;
  overflow-y: auto;
  width: 375px;
  flex-direction: column;
  height: 90vh;
  background-color: ${({ theme }) => theme.colors.singletons.defaultBackground};
  position: absolute;
  margin-top: 8px;
  right: 8px;
  border-radius: 8px;

  -webkit-box-shadow: 0px 2px 10px 0px
    ${props => `${props.theme.colors.singletons.realBlack}20`};
  box-shadow: 0px 2px 10px 0px
    ${props => `${props.theme.colors.singletons.realBlack}20`};
  z-index: 999;
`;

const UnreadTitleBlock = styled.div`
  padding: 20px 20px 8px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const UnreadTextBlock = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text[400]};
`;

const ReadTextBlock = styled.div`
  padding: 20px 20px 8px 20px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text[400]};
`;

const EmptyTextBlock = styled.div`
  padding: 0px 20px 20px 20px;
  align-self: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text[300]};
`;

const CustomDivider = styled(Divider)`
  border-width: 4px;
`;

const customeListBoxStyle = css`
  flex-direction: column;
  display: flex;
`;

const closeButtonStyle = css`
  border-width: 0px;
`;

const NotificationList: FC = function NotificationList() {
  /* eslint-disable no-unused-vars */
  const dispatch = useAppDispatch();
  const { notificationVisible, numOfNotification, currentStoreUser } =
    useSelector<
      ReduxStoreType,
      {
        notificationVisible: boolean;
        numOfNotification: number;
        currentStoreUser: CurrentStoreUserType;
      }
    >(({ storeUser }) => storeUser);

  const [unreadNotificationList, setUnreadNotificationList] = useState<
    NotificationType[]
  >([]);
  const [readNotificationList, setReadNotificationList] = useState<
    NotificationType[]
  >([]);

  const { refetch: unreadRefetch } = useReactQuery(
    notificationKeys.getUnreadNotificationList(currentStoreUser?.id),
    () => notificationService.getUnreadNotificationList(currentStoreUser?.id),
    {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
    (resultData: NotificationType[]) => {
      if (!resultData) return;
      setUnreadNotificationList(resultData);
      dispatch(storeUserActions.setNumOfNotification(resultData.length));
    },
  );

  const { refetch: readRefetch } = useReactQuery(
    notificationKeys.getReadNotificationList(currentStoreUser?.id),
    () => notificationService.getReadNotificationList(currentStoreUser?.id),
    {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
    (resultData: NotificationType[]) => {
      if (!resultData) return;
      setReadNotificationList(resultData);
    },
  );

  const { mutate: updateMutate } =
    useReactMutation<UpdateUnreadNotificationParamType>(
      notificationKeys.updateUnreadNotification,
      notificationService.updateUnreadNotification,
      () => {},
    );

  useEffect(() => {
    if (notificationVisible && unreadNotificationList?.length > 0) {
      updateMutate({
        storeId: currentStoreUser?.id,
        notificationIdList: unreadNotificationList.map(
          (notification: NotificationType) => notification.id,
        ),
      });
      dispatch(storeUserActions.setNumOfNotification(0));
    } else if (numOfNotification === 0) {
      unreadRefetch();
      readRefetch();
    }
  }, [
    currentStoreUser?.id,
    dispatch,
    notificationVisible,
    numOfNotification,
    readRefetch,
    unreadNotificationList,
    unreadRefetch,
    updateMutate,
  ]);

  const renderNotificationItem = useCallback(
    ({ item }: NotificationItemType) => {
      if (!item) return null;
      const { createdAt, type, callInfo } = item;

      const now = new Date();
      const time = getFormattedTime(now, createdAt as Date);
      let message = '';

      switch (type) {
        case 'confirmed':
          message = `'${callInfo.title}'제안이 확정되었습니다.`;
          break;
        case 'canceled':
          message = `'${callInfo.title}'제안이 취소되었습니다.`;
          break;
        case 'needUpdate':
          message = '방문 확인을 하지 않은 제안이 있습니다. 확인해주세요.';
          break;
        default:
          break;
      }

      return (
        <NotificationItem
          callType={callInfo.type}
          type={type}
          time={time}
          message={message}
        />
      );
    },
    [],
  );

  if (!notificationVisible) return null;
  return (
    <NotificationListBlock>
      <UnreadTitleBlock>
        <UnreadTextBlock>새로운 알림</UnreadTextBlock>
        <IconButton
          icon={{ name: 'Close', width: 16, height: 16 }}
          customStyle={closeButtonStyle}
          onClick={() => {
            dispatch(storeUserActions.setNotificationVisible(false));
          }}
        />
      </UnreadTitleBlock>
      <ListBox
        customStyle={customeListBoxStyle}
        data={unreadNotificationList}
        renderItem={renderNotificationItem}
        listEmptyComponent={
          <EmptyTextBlock>새로운 알림이 없습니다.</EmptyTextBlock>
        }
      />
      <CustomDivider isVertical={false} />
      <ReadTextBlock>이전 알림</ReadTextBlock>
      <ListBox
        customStyle={customeListBoxStyle}
        data={readNotificationList}
        renderItem={renderNotificationItem}
        listEmptyComponent={
          <EmptyTextBlock>이전 알림이 없습니다.</EmptyTextBlock>
        }
      />
    </NotificationListBlock>
  );
};

export default NotificationList;
