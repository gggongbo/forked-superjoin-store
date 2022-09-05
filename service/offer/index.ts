import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@service/app';
import axios from 'axios';
import type { MakeOffer } from '~/types/offer';

const findStoreInfo = async (email: string): Promise<object> => {
  const q = query(collection(db, 'store'), where('storeEmail', '==', email));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(value => value.data())[0];
};

// TODO 도메인 설정 후 url 변경
const creatOffer = async (data: MakeOffer) => {
  const { email } = data;
  if (email != null) {
    const sendData = { ...data, storeInfo: await findStoreInfo(email) };
    await axios.post('http://localhost:3001/store', sendData);
  }
};

// TODO 도메인 설정 후 url 변경
const findCallsByEmail = (email: string) => {
  return axios.get(`http://localhost:3001/store/${email}`);
};

export const offerService = {
  creatOffer,
  findCallsByEmail,
};
