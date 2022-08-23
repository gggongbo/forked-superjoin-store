import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@service/app';

async function getByEmailPhotoURL(email: string): Promise<object> {
  const q = query(collection(db, 'store'), where('storeEmail', '==', email));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data())[0] || null;
}

export default getByEmailPhotoURL;
