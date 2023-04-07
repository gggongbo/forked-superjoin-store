import { httpsCallable, HttpsCallableResult } from 'firebase/functions';

import { FirebaseTimestamp } from '@constants/types/common';
import {
  CallsOfUserType,
  StoresOfUserType,
  UpdateReservationMemberParamType,
} from '@constants/types/member';
import { functions } from '@services/app';
import { firebaseTimestampToDate } from '@utils/firebaseUtils';

const updateReservationMember = async (
  params: UpdateReservationMemberParamType,
) => {
  if (!params) return;
  await httpsCallable(functions, 'updateReservationMember')(params);
};

const getVisitedMember = async (): Promise<StoresOfUserType[] | null> => {
  const memberList = (await httpsCallable(
    functions,
    'getVisitedMember',
  )()) as HttpsCallableResult<StoresOfUserType[]>;
  if (!memberList?.data) return null;
  return memberList.data.map((memberData: StoresOfUserType) => ({
    ...memberData,
  }));
};

const getReservedMember = async (): Promise<CallsOfUserType[] | null> => {
  const memberList = (await httpsCallable(
    functions,
    'getVisitedReservationMember',
  )()) as HttpsCallableResult<CallsOfUserType[]>;
  if (!memberList?.data) return null;
  return memberList.data.map((memberData: CallsOfUserType) => {
    return {
      ...memberData,
      deadline: firebaseTimestampToDate(
        memberData.deadline as FirebaseTimestamp,
      ),
      visitedAt:
        memberData.visitedAt === 'none'
          ? memberData.visitedAt
          : firebaseTimestampToDate(memberData.visitedAt as FirebaseTimestamp),
      confirmedAt:
        memberData.confirmedAt === 'none'
          ? memberData.confirmedAt
          : firebaseTimestampToDate(
              memberData.confirmedAt as FirebaseTimestamp,
            ),
      canceledAt:
        memberData.canceledAt === 'none'
          ? memberData.canceledAt
          : firebaseTimestampToDate(memberData.canceledAt as FirebaseTimestamp),
    };
  });
};

export const memberService = {
  updateReservationMember,
  getVisitedMember,
  getReservedMember,
};
