import { FirebaseTimestamp } from '@constants/types/common';

const firebaseTimestampToDate = (timestamp: FirebaseTimestamp) => {
  // eslint-disable-next-line no-underscore-dangle
  if (timestamp._seconds) return new Date(timestamp._seconds * 1000);
  return new Date(timestamp.seconds * 1000);
};

export { firebaseTimestampToDate };
