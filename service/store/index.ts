import { collection, getDocs, query, where } from 'firebase/firestore';

import { db } from '@service/app';

const findStoreInfo = async (email: string | null): Promise<object | null> => {
  if (!email) return null;
  const q = query(collection(db, 'store'), where('storeEmail', '==', email));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(value => value.data())[0];
};

// const findStoreInfo = async (email: string) => {
//   // @ts-ignore
//   const { user, location } = await offerService.findStoreInfo(email);
//   return { uid: user.uid, location };
// };

export const storeService = {
  findStoreInfo,
};
