import { httpsCallable, HttpsCallableResult } from 'firebase/functions';

import {
  ConfirmCallParamType,
  CreateCallParamType,
  RegisterCommentCallParamType,
  AcceptRequestCallParamType,
  RejectRequestCallParamType,
  CommentType,
  CallType,
} from '@constants/types/call';
import { FirebaseTimestamp, LocationType } from '@constants/types/common';
import { functions } from '@services/app';
import { firebaseTimestampToDate } from '@utils/firebaseUtils';

const createCall = async (params: CreateCallParamType) => {
  if (!params || !params.deadline) return;
  await httpsCallable(functions, 'createCall')(params);
};

const confirmCall = async (params: ConfirmCallParamType) => {
  if (!params) return;
  await httpsCallable(functions, 'updateCallConfirmed')(params);
};

const cancelCall = async (callId: string) => {
  if (!callId) return;
  await httpsCallable(functions, 'cancelCall')(callId);
};

const deleteCall = async (callId: string) => {
  if (!callId) return;
  await httpsCallable(functions, 'deleteCall')(callId);
};

const acceptRequestCall = async (params: AcceptRequestCallParamType) => {
  if (!params) return;
  await httpsCallable(functions, 'acceptRequestCall')(params);
};

const rejectRequestCall = async (params: RejectRequestCallParamType) => {
  if (!params) return;
  await httpsCallable(functions, 'rejectRequestCall')(params);
};

const registerCommentCall = async (params: RegisterCommentCallParamType) => {
  if (!params) return;
  await httpsCallable(functions, 'registerCommentCall')(params);
};

const getSendCall = async (storeId: string): Promise<CallType[] | null> => {
  const storeCallList = (await httpsCallable(
    functions,
    'getSendCall',
  )(storeId)) as HttpsCallableResult<CallType[]>;
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

const getReceiveCall = async (params: {
  location: LocationType;
  mainCategory: string;
}): Promise<CallType[] | null> => {
  if (!params) return null;

  const { location, mainCategory } = params;

  const storeCallList = (await httpsCallable(
    functions,
    'getReceiveCall',
  )({
    location: {
      latitude: Number(location.latitude),
      longitude: Number(location.longitude),
    },
    mainCategory,
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
