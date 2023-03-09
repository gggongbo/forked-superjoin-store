import { doc, DocumentData, getDoc } from 'firebase/firestore';

import { db } from '@services/app';

const findStoreUserInfo = async (
  id: string | undefined,
): Promise<DocumentData | null> => {
  if (!id) return null;
  const storeDoc = await getDoc(doc(db, 'store', id));
  if (!storeDoc.exists) return null;
  return storeDoc.data() ?? null;
};

export const storeUserService = {
  findStoreUserInfo,
};
