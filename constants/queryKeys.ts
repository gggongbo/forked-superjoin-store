import { LocationType } from '@constants/types/common';

const callKeys = {
  createCall: ['createCall'] as const,
  getSendCall: (storeId: string) => ['getSendCall', storeId] as const,
  getReceiveCall: (params: Omit<LocationType, 'geohash'>) =>
    ['getReceiveCall', params] as const,
  cancelCall: ['cancelCall'] as const,
  confirmCall: ['confirmCall'] as const,
  deleteCall: ['deleteCall'] as const,
  acceptRequestCall: ['acceptRequestCall'] as const,
  rejectRequestCall: ['rejectRequestCall'] as const,
  registerCommentCall: ['registerCommentCall'] as const,
};

const memberKeys = {
  updateReservationMember: ['updateReservationMember'] as const,
  getVisitedMember: ['getVisitedMember'] as const,
  getReservedMember: ['getReservedMember'] as const,
};

const rewardKeys = {
  createReward: ['createReward'] as const,
  updateReward: ['updateReward'] as const,
  deleteReward: ['deleteReward'] as const,
  getRewardList: ['getRewardList'] as const,
};

const supportKeys = {
  getAllQa: ['getAllQa'] as const,
};

const notificationKeys = {
  updateUnreadNotification: ['updateUnreadNotification'] as const,
  getUnreadNotificationList: (storeId: string) =>
    ['getUnreadNotificationList', storeId] as const,
  getReadNotificationList: (storeId: string) =>
    ['getReadNotificationList', storeId] as const,
};

export { callKeys, memberKeys, rewardKeys, supportKeys, notificationKeys };
