import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '@service/app';

async function getAll() {
  const q = query(collection(db, 'support'));
  const querySnapshot = await getDocs(q);
  return Promise.all(
    querySnapshot.docs.map(async value => {
      return value.data();
    }),
  );
}

export const qaService = {
  getAll,
};
