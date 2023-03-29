const callKeys = {
  getStoreCallList: (storeUserId: string) =>
    ['getStoreCallList', storeUserId] as const,
};

export { callKeys };
