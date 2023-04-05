import { httpsCallable, HttpsCallableResult } from 'firebase/functions';

// TODO : return Promise<DocumentData>, any 타입 => type 선언해서 변경
import { FirebaseTimestamp } from '@constants/types/common';
import {
  CallsOfUserType,
  StoresOfUserType,
  UpdateReservationCustomerParamType,
} from '@constants/types/customer';
import { functions } from '@services/app';
import { firebaseTimestampToDate } from '@utils/firebaseUtils';

const updateReservationCustomer = async (
  params: UpdateReservationCustomerParamType,
) => {
  if (!params) return;
  await httpsCallable(functions, 'updateReservationMember')(params);
};

const getVisitedCustomer = async (): Promise<any | null> => {
  const customerList = (await httpsCallable(
    functions,
    'getVisitedMember',
  )()) as HttpsCallableResult<StoresOfUserType[]>;
  if (!customerList?.data) return null;
  return customerList.data.map((customerData: StoresOfUserType) => ({
    ...customerData,
  }));
};

const getReservedCustomer = async (): Promise<any | null> => {
  const customerList = (await httpsCallable(
    functions,
    'getVisitedReservationMember',
  )()) as HttpsCallableResult<CallsOfUserType[]>;
  if (!customerList?.data) return null;
  return customerList.data.map((customerData: CallsOfUserType) => {
    return {
      ...customerData,
      deadline: firebaseTimestampToDate(
        customerData.deadline as FirebaseTimestamp,
      ),
      visitedAt:
        customerData.visitedAt === 'none'
          ? customerData.visitedAt
          : firebaseTimestampToDate(
              customerData.visitedAt as FirebaseTimestamp,
            ),
      confirmedAt:
        customerData.confirmedAt === 'none'
          ? customerData.confirmedAt
          : firebaseTimestampToDate(
              customerData.confirmedAt as FirebaseTimestamp,
            ),
      canceledAt:
        customerData.canceledAt === 'none'
          ? customerData.canceledAt
          : firebaseTimestampToDate(
              customerData.canceledAt as FirebaseTimestamp,
            ),
    };
  });
};

export const customerService = {
  updateReservationCustomer,
  getVisitedCustomer,
  getReservedCustomer,
};
