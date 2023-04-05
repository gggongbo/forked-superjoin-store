import { httpsCallable } from 'firebase/functions';

// TODO : return Promise<DocumentData>, any 타입 => type 선언해서 변경
import {
  ConfirmCallParamType,
  CreateCallParamType,
  RegisterCommentCallParamType,
  AcceptRequestCallParamType,
  RejectRequestCallParamType,
  CommentType,
} from '@constants/types/call';
import { FirebaseTimestamp, LocationType } from '@constants/types/common';
import { functions } from '@services/app';
import { firebaseTimestampToDate } from '@utils/firebaseUtils';

// TODO : 로직 테스트
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

// TODO: functions name change
const getSendCall = async (storeId: any): Promise<any | null> => {
  const storeCallList: any = await httpsCallable(
    functions,
    'getSendCall',
  )(storeId);
  if (!storeCallList?.data) return null;
  return storeCallList.data.map((callData: any) => {
    return {
      ...callData,
      deadline: firebaseTimestampToDate(callData.deadline),
      updatedAt: firebaseTimestampToDate(callData.updatedAt),
      createdAt: firebaseTimestampToDate(callData.createdAt),
    };
  });
};

// TODO: getReciveOffer callHostId보내주고 비교하게해야함
const getReceiveCall = async (params: LocationType): Promise<any | null> => {
  const storeCallList: any = await httpsCallable(
    functions,
    'getReceiveCall',
  )(params);
  if (!storeCallList?.data) return null;
  return storeCallList.data.map((callData: any) => {
    return {
      ...callData,
      deadline: firebaseTimestampToDate(callData.deadline),
      updatedAt: firebaseTimestampToDate(callData.updatedAt),
      createdAt: firebaseTimestampToDate(callData.createdAt),
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
    };
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
