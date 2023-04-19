import { httpsCallable, HttpsCallableResult } from 'firebase/functions';

import errorMessage from '@constants/errorMessage';
import {
  ConfirmCallParamType,
  CreateCallParamType,
  RegisterCommentCallParamType,
  AcceptRequestCallParamType,
  RejectRequestCallParamType,
  CommentType,
  CallType,
} from '@constants/types/call';
import { FirebaseTimestamp } from '@constants/types/common';
import { functions } from '@services/app';
import store from '@store/rootStore';
import { firebaseTimestampToDate } from '@utils/firebaseUtils';

const createCall = async (params: CreateCallParamType) => {
  if (!params || !params.deadline) return;
  try {
    await httpsCallable(functions, 'createCall')(params);
  } catch (error: any) {
    throw new Error('제안을 생성하는 도중 오류가 발생하였습니다.');
  }
};

const confirmCall = async (params: ConfirmCallParamType) => {
  if (!params) return;
  try {
    await httpsCallable(functions, 'updateCallConfirmed')(params);
  } catch (error: any) {
    if (
      error?.message === errorMessage.firebase.internal['already-confirmed']
    ) {
      throw new Error('이미 확정되었습니다.');
    } else if (
      error?.message === errorMessage.firebase.internal['invalid-status']
    ) {
      throw new Error('제안 상태가 바뀌어 확정이 불가합니다.');
    } else {
      throw new Error('제안을 확정하는 도중 오류가 발생하였습니다.');
    }
  }
};

const cancelCall = async (callId: string) => {
  if (!callId) return;
  try {
    await httpsCallable(functions, 'cancelCall')(callId);
  } catch (error: any) {
    if (error?.message === errorMessage.firebase.internal['already-canceled']) {
      throw new Error('이미 취소되었습니다.');
    } else if (
      error?.message === errorMessage.firebase.internal['invalid-status']
    ) {
      throw new Error('제안 상태가 바뀌어 취소가 불가합니다.');
    } else {
      throw new Error('제안을 취소하는 도중 오류가 발생하였습니다.');
    }
  }
};

const deleteCall = async (callId: string) => {
  if (!callId) return;
  try {
    await httpsCallable(functions, 'deleteCall')(callId);
  } catch (error: any) {
    if (error?.message === errorMessage.firebase.internal['already-deleted']) {
      throw new Error('이미 삭제되었습니다.');
    } else if (
      error?.message === errorMessage.firebase.internal['invalid-status']
    ) {
      throw new Error('제안 상태가 바뀌어 삭제가 불가합니다.');
    } else {
      throw new Error('제안을 삭제하는 도중 오류가 발생하였습니다.');
    }
  }
};

const acceptRequestCall = async (params: AcceptRequestCallParamType) => {
  if (!params) return;
  try {
    await httpsCallable(functions, 'acceptRequestCall')(params);
  } catch (error: any) {
    if (
      error?.message === errorMessage.firebase.internal['exceeded-num-of-user']
    ) {
      throw new Error('모집 인원이 초과되어 더 이상 수락할 수 없습니다.');
    } else if (
      error?.message === errorMessage.firebase.internal['invalid-status']
    ) {
      throw new Error('제안 상태가 바뀌어 참여 수락이 불가합니다.');
    } else {
      throw new Error('참여 수락하는 도중 오류가 발생하였습니다.');
    }
  }
};

const rejectRequestCall = async (params: RejectRequestCallParamType) => {
  if (!params) return;
  try {
    await httpsCallable(functions, 'rejectRequestCall')(params);
  } catch (error: any) {
    if (error?.message === errorMessage.firebase.internal['invalid-status']) {
      throw new Error('제안 상태가 바뀌어 참여 거절이 불가합니다.');
    } else {
      throw new Error('참여 거절하는 도중 오류가 발생하였습니다.');
    }
  }
};

const registerCommentCall = async (params: RegisterCommentCallParamType) => {
  if (!params) return;
  try {
    await httpsCallable(functions, 'registerCommentCall')(params);
  } catch (error: any) {
    if (error?.message === errorMessage.firebase.internal['invalid-status']) {
      throw new Error('제안 상태가 바뀌어 어필이 불가합니다.');
    } else {
      throw new Error('어필하는 도중 오류가 발생하였습니다.');
    }
  }
};

const getSendCall = async (): Promise<CallType[] | null> => {
  const storeCallList = (await httpsCallable(
    functions,
    'getSendCall',
  )()) as HttpsCallableResult<CallType[]>;
  if (!storeCallList?.data) return null;
  return storeCallList.data.map((callData: CallType) => {
    return {
      ...callData,
      deadline: firebaseTimestampToDate(callData.deadline as FirebaseTimestamp),
      updatedAt: firebaseTimestampToDate(
        callData.updatedAt as FirebaseTimestamp,
      ),
      createdAt: firebaseTimestampToDate(
        callData.createdAt as FirebaseTimestamp,
      ),
    };
  });
};

const getReceiveCall = async (): Promise<CallType[] | null> => {
  const {
    storeUser: { currentStoreUser },
  } = store.getState();

  if (
    !currentStoreUser ||
    !currentStoreUser?.location ||
    !currentStoreUser?.category
  )
    return null;

  const { location, category } = currentStoreUser;

  const storeCallList = (await httpsCallable(
    functions,
    'getReceiveCall',
  )({
    location: {
      latitude: Number(location.latitude),
      longitude: Number(location.longitude),
    },
    mainCategory: category,
  })) as HttpsCallableResult<CallType[]>;
  if (!storeCallList?.data) return null;
  return storeCallList.data.map((callData: CallType) => {
    return {
      ...callData,
      deadline: firebaseTimestampToDate(callData.deadline as FirebaseTimestamp),
      updatedAt: firebaseTimestampToDate(
        callData.updatedAt as FirebaseTimestamp,
      ),
      createdAt: firebaseTimestampToDate(
        callData.createdAt as FirebaseTimestamp,
      ),
      commentList:
        callData.commentList?.length > 0
          ? callData.commentList.map((comment: CommentType) => ({
              ...comment,
              createdAt: !comment.createdAt
                ? undefined
                : firebaseTimestampToDate(
                    comment.createdAt as FirebaseTimestamp,
                  ),
              updatedAt: !comment.updatedAt
                ? undefined
                : firebaseTimestampToDate(
                    comment.updatedAt as FirebaseTimestamp,
                  ),
            }))
          : [],
    } as CallType;
  });
};

export const callService = {
  createCall,
  confirmCall,
  cancelCall,
  deleteCall,
  acceptRequestCall,
  rejectRequestCall,
  registerCommentCall,
  getSendCall,
  getReceiveCall,
};
