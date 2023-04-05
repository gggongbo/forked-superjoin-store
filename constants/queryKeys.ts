import { LocationType } from '@constants/types/common';

const callKeys = {
  createCall: ['createCall'] as const,
  getSendCall: (storeUserId: string) => ['getSendCall', storeUserId] as const,
  getReceiveCall: (params: Omit<LocationType, 'geohash'>) =>
    ['getReceiveCall', params] as const,
  cancelCall: ['cancelCall'] as const,
  confirmCall: ['confirmCall'] as const,
  deleteCall: ['deleteCall'] as const,
  acceptRequestCall: ['acceptRequestCall'] as const,
  rejectRequestCall: ['rejectRequestCall'] as const,
  registerCommentCall: ['registerCommentCall'] as const,
};

const customerKeys = {
  updateReservationCustomer: ['updateReservationCustomer'] as const,
  getVisitedCustomer: ['getVisitedCustomer'] as const,
  getReservedCustomer: ['getReservedCustomer'] as const,
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

export { callKeys, customerKeys, rewardKeys, supportKeys };
