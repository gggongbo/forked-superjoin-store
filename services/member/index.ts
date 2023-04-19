import { httpsCallable, HttpsCallableResult } from 'firebase/functions';

import errorMessage from '@constants/errorMessage';
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
  try {
    await httpsCallable(functions, 'updateReservationMember')(params);
  } catch (error: any) {
    if (error?.message === errorMessage.firebase.internal['already-visited']) {
      throw new Error('이미 방문 확인되었습니다.');
    } else if (
      error?.message === errorMessage.firebase.internal['invalid-status']
    ) {
      throw new Error('제안 상태가 바뀌어 방문 확인이 불가합니다.');
    } else if (
      error?.message ===
      errorMessage.firebase.internal['calls-of-users-not-found']
    ) {
      throw new Error(error);
    } else {
      throw new Error('방문 확인하는 도중 오류가 발생하였습니다.');
    }
  }
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
