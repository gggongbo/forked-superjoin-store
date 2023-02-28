const firebaseTimestampToDate = (timestamp: { _seconds: number }) => {
  // eslint-disable-next-line no-underscore-dangle
  return new Date(timestamp._seconds * 1000);
};

export { firebaseTimestampToDate };
