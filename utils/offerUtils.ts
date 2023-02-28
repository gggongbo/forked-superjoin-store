import { DocumentData } from 'firebase/firestore';

import { firebaseTimestampToDate } from './firebaseUtils';

const firebaseDataToOfferData = (data: DocumentData) => {
  return data.map(
    (value: { deadline: any; createdAt: any; callMemberList: [] }) => {
      const { deadline, createdAt } = value;
      const convertDeadline = firebaseTimestampToDate(deadline);
      const callEndTime = Math.floor(
        (convertDeadline.getTime() - new Date().getTime()) / 1000 / 60,
      );
      return {
        ...value,
        deadline: convertDeadline,
        callSendTime: firebaseTimestampToDate(createdAt),
        callEndTime,
      };
    },
  );
};

export { firebaseDataToOfferData };
