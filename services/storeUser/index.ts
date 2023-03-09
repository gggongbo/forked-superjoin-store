import { doc, DocumentData, getDoc } from 'firebase/firestore';

import { db } from '@services/app';

// TODO : object 타입 store user 타입으로 변경
const findStoreUserInfo = async (
  id: string | null,
): Promise<DocumentData | undefined> => {
  if (!id) return undefined;
  const querySnapshot = await getDoc(doc(db, 'store', id));
  return querySnapshot.data();
};

export const storeUserService = {
  findStoreUserInfo,
};
