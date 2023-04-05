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

// TODO : return Promise<DocumentData>, any 타입 => type 선언해서 변경
import { FirebaseTimestamp } from '@constants/types/common';
import { RewardInfo } from '@constants/types/reward';
import { auth, db } from '@services/app';
import { firebaseTimestampToDate } from '@utils/firebaseUtils';

const createReward = async (rewardName: string) => {
  if (!rewardName) return null;
  const rewardDocId = doc(collection(db, 'reward')).id;
  const storeId = auth.currentUser?.uid;
  const now = new Date();

  return setDoc(doc(db, 'reward', rewardDocId), {
    id: rewardDocId,
    name: rewardName,
    storeId,
    deleted: false,
    createdAt: now,
    updatedAt: now,
  });
};

const updateReward = async (reward: RewardInfo) => {
  if (!reward) return null;

  const now = new Date();

  return updateDoc(doc(db, 'reward', reward.id), {
    name: reward.name,
    updatedAt: now,
  });
};

const deleteReward = async (rewardId: string) => {
  if (!rewardId) return null;

  const now = new Date();

  return updateDoc(doc(db, 'reward', rewardId), {
    deleted: true,
    updatedAt: now,
  });
};

const getRewardList = async (storeId: string): Promise<any | null> => {
  if (!storeId) return [];

  const q = query(
    collection(db, 'reward'),
    where('storeId', '==', storeId),
    where('deleted', '==', false),
  );
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) return [];

  return querySnapshot.docs.map((docItem: DocumentData) => {
    const rewardData = docItem.data();
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
