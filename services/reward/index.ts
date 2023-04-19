import {
  collection,
  doc,
  DocumentData,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

import { FirebaseTimestamp } from '@constants/types/common';
import { RewardInfo, RewardType } from '@constants/types/reward';
import { auth, db } from '@services/app';
import store from '@store/rootStore';
import { firebaseTimestampToDate } from '@utils/firebaseUtils';

const createReward = async (rewardName: string) => {
  if (!rewardName) return;
  const rewardDocId = doc(collection(db, 'reward')).id;
  const storeId = auth.currentUser?.uid;
  const now = new Date();
  try {
    await setDoc(doc(db, 'reward', rewardDocId), {
      id: rewardDocId,
      name: rewardName,
      storeId,
      deleted: false,
      createdAt: now,
      updatedAt: now,
    });
  } catch (error: any) {
    throw new Error('리워드를 추가하는 도중 오류가 발생하였습니다.');
  }
};

const updateReward = async (reward: RewardInfo) => {
  if (!reward || !reward?.id || !reward?.name) return;

  const now = new Date();
  try {
    await updateDoc(doc(db, 'reward', reward.id), {
      name: reward.name,
      updatedAt: now,
    });
  } catch (error: any) {
    throw new Error('리워드를 수정하는 도중 오류가 발생하였습니다.');
  }
};

const deleteReward = async (rewardId: string) => {
  if (!rewardId) return;

  const now = new Date();
  try {
    await updateDoc(doc(db, 'reward', rewardId), {
      deleted: true,
      updatedAt: now,
    });
  } catch (error: any) {
    throw new Error('리워드를 삭제하는 도중 오류가 발생하였습니다.');
  }
};

const getRewardList = async (): Promise<RewardType[] | null> => {
  const {
    storeUser: { currentStoreUser },
  } = store.getState();

  if (!currentStoreUser || !currentStoreUser?.id) return [];

  const q = query(
    collection(db, 'reward'),
    where('storeId', '==', currentStoreUser.id),
    where('deleted', '==', false),
  );
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) return [];

  return querySnapshot.docs.map((docItem: DocumentData) => {
    const rewardData: RewardType = docItem.data();
    return {
      ...rewardData,
      updatedAt: firebaseTimestampToDate(
        rewardData.updatedAt as FirebaseTimestamp,
      ),
      createdAt: firebaseTimestampToDate(
        rewardData.createdAt as FirebaseTimestamp,
      ),
    };
  });
};

export const rewardService = {
  createReward,
  updateReward,
  deleteReward,
  getRewardList,
};
