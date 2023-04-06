import { FirebaseTimestamp } from '@constants/types/common';

export type UpdateUnreadNotificationParamType = {
  storeId: string;
  notificationIdList: string[];
};

export type NotificationType = {
  type: 'confirmed' | 'canceled' | 'needUpdate';
  createdAt: Date | FirebaseTimestamp;
  unread: boolean;
  deleted: boolean;
  callInfo: {
    callId: string;
    title: string;
    type: 'user' | 'store';
  };
  id: string;
};

export type NotificationItemType = {
  item: NotificationType;
  index: number;
};
