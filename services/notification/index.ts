import {
  collection,
  doc,
  DocumentData,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

// TODO : return Promise<DocumentData>, any 타입 => type 선언해서 변경
import { FirebaseTimestamp } from '@constants/types/common';
import { db } from '@services/app';
import { firebaseTimestampToDate } from '@utils/firebaseUtils';
import { UpdateUnreadNotificationParamType } from '~/constants/types/notification';

const updateUnreadNotification = async (
  params: UpdateUnreadNotificationParamType,
) => {
  if (!params) return null;

  const { storeId, notificationIdList } = params;

  const storeDocRef = doc(db, 'store', storeId);
  return notificationIdList.map(notificationId => {
    return updateDoc(doc(storeDocRef, 'notifications', notificationId), {
      unread: false,
    });
  });
};

const getUnreadNotificationList = async (
  storeId: string,
): Promise<any | null> => {
  const storeDocRef = doc(db, 'store', storeId);
  const q = query(
    collection(storeDocRef, 'notifications'),
    where('unread', '==', true),
    where('deleted', '==', false),
    orderBy('createdAt', 'desc'),
  );
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) return [];

  return querySnapshot.docs.map((docItem: DocumentData) => {
    const notificationData = docItem.data();
    return {
      ...notificationData,
      createdAt: firebaseTimestampToDate(
        notificationData.createdAt as FirebaseTimestamp,
      ),
    };
  });
};

const getReadNotificationList = async (
  storeId: string,
): Promise<any | null> => {
  const storeDocRef = doc(db, 'store', storeId);
  const q = query(
    collection(storeDocRef, 'notifications'),
    where('unread', '==', false),
    where('deleted', '==', false),
    orderBy('createdAt', 'desc'),
  );
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) return [];

  return querySnapshot.docs.map((docItem: DocumentData) => {
    const notificationData = docItem.data();
    return {
      ...notificationData,
      createdAt: firebaseTimestampToDate(
        notificationData.createdAt as FirebaseTimestamp,
      ),
    };
  });
};

export const notificationService = {
  updateUnreadNotification,
  getUnreadNotificationList,
  getReadNotificationList,
};
