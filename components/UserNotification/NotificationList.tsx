import { differenceInMinutes } from 'date-fns';
import { FC, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import NotificationItem from './NotificationItem';

import Divider from '@components/basicComponent/Divider';
import ListBox from '@components/basicComponent/ListBox';
import {
  NotificationItemType,
  NotificationType,
} from '@constants/types/common';
import { ReduxStoreType } from '@constants/types/redux';
import { useAppDispatch } from '@store/rootStore';

const NotificationListBlock = styled.div`
  display: flex;
  flex: 1;
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

const TextBlock = styled.div`
  padding: 20px 20px 8px 20px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text[400]};
`;

const EmptyTextBlock = styled.div`
  padding: 20px 100px;
  align-self: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text[300]};
`;

const CustomDivider = styled(Divider)`
  border-width: 2px;
`;

const customeListBoxStyle = css`
  flex-direction: column;
  display: flex;
`;

// TODO : 알림 배지 개수 리덕스로 관리 + 새로운 제안, 이전제안 분리
const NotificationList: FC = function NotificationList() {
  /* eslint-disable no-unused-vars */
  const dispatch = useAppDispatch();
  const notificationVisible = useSelector<ReduxStoreType, boolean>(
    ({ storeUser }) => storeUser.notificationVisible,
  );

  // TODO: store notification fetching
  const [unreadNotificationList, setUnreadNotificationList] = useState<
    NotificationType[]
  >([]);
  const [readNotificationList, setReadNotificationList] = useState<
    NotificationType[]
  >([]);

  const testData = useMemo(() => {
    return [
      {
        type: 'confirmed',
        createdAt: new Date(),
        unread: true,
        deleted: false,
        callInfo: {
          callId: '1',
          title: 'test',
        },
      },
      {
        type: 'canceled',
        createdAt: new Date(),
        unread: true,
        deleted: false,
        callInfo: {
          callId: '2',
          title: 'test2',
        },
      },
      {
        type: 'needUpdate',
        createdAt: new Date(),
        unread: true,
        deleted: false,
        callInfo: {
          callId: '3',
          title: 'test3',
        },
      },
    ];
  }, []);

  const renderNotificationItem = useCallback(
    ({ item }: NotificationItemType) => {
      if (!item) return null;
      const { createdAt, type, callInfo } = item;

      const now = new Date();
      // TODO : 방금 전 표시 기준 확인
      const time = `${differenceInMinutes(now, createdAt)}분 전`;
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
          id={callInfo.callId}
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
      <TextBlock>새로운 알림</TextBlock>
      <ListBox
        customStyle={customeListBoxStyle}
        data={testData}
        renderItem={renderNotificationItem}
        listEmptyComponent={
          <EmptyTextBlock>새로운 알림이 없습니다.</EmptyTextBlock>
        }
      />
      <CustomDivider isVertical={false} />
      <TextBlock>이전 알림</TextBlock>
      <ListBox
        customStyle={customeListBoxStyle}
        data={testData}
        renderItem={renderNotificationItem}
        listEmptyComponent={
          <EmptyTextBlock>이전 알림이 없습니다.</EmptyTextBlock>
        }
      />
    </NotificationListBlock>
  );
};

export default NotificationList;
