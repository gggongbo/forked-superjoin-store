import axios from 'axios';
import { DocumentData } from 'firebase/firestore';

import type { MakeOfferType } from '@constants/types/offer';
import { CurrentStoreUserType } from '@constants/types/redux';

// TODO 도메인 설정 후 url 변경
const createOffer = async (
  data: MakeOfferType,
  storeUser: CurrentStoreUserType,
) => {
  if (!data || !data?.email) return;
  const sendData = { ...data, storeUser };
  await axios.post('http://localhost:3002/store', sendData);
};

const getSendOffer = async (uid: any): Promise<DocumentData | null> => {
  if (!uid) return null;
  return axios.get(`http://localhost:3002/store/sendoffers/${uid}`);
};

const deleteOffer = async (data: { callId: string }) => {
  if (!data) return null;
  return axios.delete('http://localhost:3002/store', { data });
};

export const offerService = {
  createOffer,
  getSendOffer,
  deleteOffer,
};
