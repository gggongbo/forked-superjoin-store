import { collection, getDocs, query, where } from 'firebase/firestore';

import { db } from '@services/app';

// TODO : object 타입 store user 타입으로 변경
const findStoreUserInfo = async (
  email: string | null,
): Promise<object | null> => {
  if (!email) return null;
  const q = query(collection(db, 'store'), where('storeEmail', '==', email));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(value => value.data())[0];
};

export const storeUserService = {
  findStoreUserInfo,
};
