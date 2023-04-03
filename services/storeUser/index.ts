import { doc, DocumentData, getDoc, setDoc } from 'firebase/firestore';

import { db } from '@services/app';

const findStoreUserInfo = async (
  id: string | undefined,
): Promise<DocumentData | null> => {
  if (!id) return null;
  const storeDoc = await getDoc(doc(db, 'store', id));
  if (!storeDoc.exists) return null;
  return storeDoc.data() ?? null;
};

const updatePushToken = async (userId: string, token: string) => {
  return setDoc(
    doc(db, 'account', userId),
    { pushToken: token },
    { merge: true },
  );
};

const resetPushToken = async (userId: string) => {
  return setDoc(
    doc(db, 'account', userId),
    { pushToken: null },
    { merge: true },
  );
};

export const storeUserService = {
  findStoreUserInfo,
  updatePushToken,
  resetPushToken,
};
