import { useRouter } from 'next/router';
import { FC } from 'react';
import styled from 'styled-components';

import Icon from '@components/Icon';

const NotificationItemBlock = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
`;

const ConfirmedIconBlock = styled.div`
  background-color: ${({ theme }) => theme.colors.singletons.green};
  justify-content: center;
  align-items: center;
  padding: 6px;
  border-radius: 8px;
`;

const CanceledIconBlock = styled.div`
  background-color: ${({ theme }) => theme.colors.singletons.statusOrange};
  justify-content: center;
  align-items: center;
  padding: 6px;
  border-radius: 8px;
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 12px;
`;

const MessageBlock = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text[600]};
  margin-bottom: 3px;
`;

const TimeBlock = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text[300]};
`;

interface NotificationItemProps {
  callType: string;
  type: string;
  time: string;
  message: string;
}

const NotificationItem: FC<NotificationItemProps> = function NotificationItem(
  props,
) {
  const { callType, type, time, message } = props;
  const router = useRouter();
  return (
    <NotificationItemBlock
      onClick={() => {
        router.push(
          {
            pathname: '/call',
            query: { callType: callType === 'store' ? 'receive' : 'send' },
          },
          '/call',
        );
      }}
    >
      {type === 'confirmed' && (
        <ConfirmedIconBlock>
          <Icon name="Bell" width={18} height={18} color="white" />
        </ConfirmedIconBlock>
      )}
      {type === 'canceled' && (
        <CanceledIconBlock>
          <Icon name="UserV" width={18} height={18} color="white" />
        </CanceledIconBlock>
      )}
      <TextBlock>
        <MessageBlock>{message}</MessageBlock>
        <TimeBlock>{time}</TimeBlock>
      </TextBlock>
    </NotificationItemBlock>
  );
};

export default NotificationItem;
