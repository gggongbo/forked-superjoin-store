// TODO : missing permison 발생하므로 function 호출로 로직 변경
// TODO : return Promise<DocumentData>, any 타입 => type 선언해서 변경
// TODO : CallChatRoom 관련 요구사항 확인후 추가
// TODO : 로직 테스트
const createOffer = async (data: any, storeUserInfo: any) => {
  console.log('create offer', data, storeUserInfo);
  // if (!data || !storeUserInfo) return null;
  // // eslint-disable-next-line no-unused-vars
  // const { storeInfo, deadline, content, userNum, title } = data;
  // const { address, category, location, geohash, user, name, image } =
  //   storeUserInfo;
  // const now = new Date();
  // const callDocRef = doc(collection(superjoinDb, 'calls'));
  // const currentCallOfUserDocRef = doc(
  //   collection(superjoinDb, 'currentCallOfUser', user.uid),
  // );
  // const callInfo = {
  //   callId: callDocRef.id,
  //   callHostId: user.uid,
  //   callHost: {
  //     userId: user.uid,
  //     userName: name || '',
  //     userPhoto: image,
  //   },
  //   deadline: deadline.getTime(),
  //   viewedUserList: [user.uid],
  //   callMemberList: [],
  //   callMemberIdList: [],
  //   commentList: [],
  //   requestList: [],
  //   address,
  //   location,
  //   geohash,
  //   category,
  //   maxNumOfUser: parseInt(userNum, 10),
  //   status: 'proceeding', // ENUM으로 변경
  //   updatedAt: now,
  //   createdAt: now,
  // };
  // return runTransaction(superjoinDb, async (transaction: Transaction) => {
  //   const currentCallOfUserDoc = await transaction.get(currentCallOfUserDocRef);
  //   const currentCallOfUserData = currentCallOfUserDoc.data();
  //   if (currentCallOfUserData?.callId) {
  //     const currentCallDoc = await getDoc(
  //       doc(superjoinDb, 'calls', currentCallOfUserData.callId),
  //     );
  //     const currentCallData = currentCallDoc.data();
  //     if (currentCallData?.status === 'proceeding')
  //       transaction.update(currentCallDoc.ref, {
  //         status: 'expired',
  //       });
  //   }
  //   transaction.set(callDocRef, callInfo);
  //   transaction.set(
  //     currentCallOfUserDocRef,
  //     { callId: callInfo.callId, timestamp: now },
  //     { merge: true },
  //   );
  // });
};

const reopenOffer = async (callId: string, storeUserInfo: any) => {
  console.log('reopen offer', callId, storeUserInfo);
  // const userId = storeUserInfo.user.uid;
  // const callDocRef = doc(collection(superjoinDb, 'calls', callId));
  // const now = new Date();
  // const currentCallOfUserDocRef = doc(
  //   collection(superjoinDb, 'currentCallOfUser', userId),
  // );
  // return runTransaction(superjoinDb, async (transaction: Transaction) => {
  //   try {
  //     const callDoc = await transaction.get(callDocRef);
  //     if (!callDoc.exists) Promise.reject(new Error('no call data'));
  //     const currentCallOfUserDoc = await transaction.get(
  //       currentCallOfUserDocRef,
  //     );
  //     const currentCallOfUserData = currentCallOfUserDoc.data();
  //     if (currentCallOfUserData?.callId) {
  //       const currentCallDocRef = doc(
  //         collection(superjoinDb, 'calls', currentCallOfUserData.callId),
  //       );
  //       const currentCallDoc = await transaction.get(currentCallDocRef);
  //       // if (currentCallDoc.exists) {
  //       const {
  //         status,
  //         callMemberIdList,
  //         callId: currentCallId,
  //         callHostId: currentCallHost,
  //       } = currentCallDoc.data() as any;
  //       if (status === 'proceeding') {
  //         const { callHostId, title } = callDoc.data() as any;
  //         const callNotification = {
  //           type: 'expiredCall',
  //           userInfo: {
  //             userId: currentCallHost,
  //             name: storeUserInfo.name || '',
  //             image: storeUserInfo.image,
  //           },
  //           callInfo: { callId, title },
  //           timestamp: now,
  //           deleted: false,
  //           unread: true,
  //         };
  //         transaction.update(currentCallDocRef, { status: 'expired' });
  //         callMemberIdList?.forEach((memberUserId: string) => {
  //           const callNotificationsOfUserDocRef = doc(
  //             collection(
  //               doc(
  //                 collection(
  //                   superjoinDb,
  //                   'callNotificationsOfUser',
  //                   memberUserId,
  //                 ),
  //               ),
  //               'callNotificationId',
  //               `expiredCall@${currentCallId}${callHostId}}`,
  //             ),
  //           );
  //           transaction.set(callNotificationsOfUserDocRef, callNotification, {
  //             merge: true,
  //           });
  //         });
  //       }
  //     }
  //     const callDocData = callDoc.data();
  //     const deadline = firebaseTimestampToDate(callDocData?.deadline);
  //     const newDeadline =
  //       now.getTime() >= deadline.getTime() ? addHours(now, 1) : deadline;
  //     transaction.set(
  //       currentCallOfUserDocRef,
  //       { callId, timestamp: now },
  //       { merge: true },
  //     );
  //     transaction.update(callDocRef, {
  //       status: 'proceeding',
  //       deadline: newDeadline,
  //       updatedAt: now,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     // do nothing
  //   }
  // });
};

const cancelOffer = async (callId: string, storeUserInfo: any) => {
  console.log('cancel offer', callId, storeUserInfo);
  // const userId = storeUserInfo.user.uid;
  // const now = new Date();
  // const callDocRef = doc(collection(superjoinDb, 'calls', callId));
  // const currentCallOfUserDocRef = doc(
  //   collection(superjoinDb, 'currentCallOfUser', userId),
  // );
  // return runTransaction(superjoinDb, async (transaction: Transaction) => {
  //   try {
  //     const callDoc = await transaction.get(callDocRef);
  //     const currentCallOfUserDoc = await transaction.get(
  //       currentCallOfUserDocRef,
  //     );
  //     const currentCallOfUserData = currentCallOfUserDoc.data();
  //     if (currentCallOfUserData?.callId === callId) {
  //       transaction.set(
  //         currentCallOfUserDocRef,
  //         { callId: null, timestamp: null },
  //         { merge: true },
  //       );
  //     }
  //     const { callHostId, callMemberIdList, title } = callDoc.data() as any;
  //     const callNotification = {
  //       type: 'canceledCall',
  //       userInfo: {
  //         userId: callHostId,
  //         name: storeUserInfo.name || '',
  //         image: storeUserInfo.image,
  //       },
  //       callInfo: { callId, title },
  //       timestamp: now,
  //       deleted: false,
  //       unread: true,
  //     };
  //     callMemberIdList?.forEach((memberUserId: string) => {
  //       const callNotificationsOfUserDocRef = doc(
  //         collection(
  //           doc(
  //             collection(superjoinDb, 'callNotificationsOfUser', memberUserId),
  //           ),
  //           'callNotificationId',
  //           `canceledCall@${callId}${callHostId}}`,
  //         ),
  //       );
  //       transaction.set(callNotificationsOfUserDocRef, callNotification, {
  //         merge: true,
  //       });
  //     });
  //   } catch (error) {
  //     // do nothing
  //   }
  //   transaction.update(callDocRef, {
  //     status: 'canceled',
  //     updatedAt: now,
  //   });
  // });
};

const deleteOffer = async (callId: string, userId: string) => {
  console.log('delete offer', callId, userId);
  // if (!callId) return null;
  // const callDocRef = doc(collection(superjoinDb, 'calls', callId));
  // const currentCallOfUserDocRef = doc(
  //   collection(superjoinDb, 'currentCallOfUser', userId),
  // );
  // return runTransaction(superjoinDb, async (transaction: Transaction) => {
  //   try {
  //     const currentCallOfUserDoc = await transaction.get(
  //       currentCallOfUserDocRef,
  //     );
  //     const currentCallOfUserData = currentCallOfUserDoc.data();
  //     if (currentCallOfUserData?.callId === callId)
  //       transaction.set(
  //         currentCallOfUserDocRef,
  //         { callId: null, timestamp: null },
  //         { merge: true },
  //       );
  //   } catch (error) {
  //     // do nothing
  //   }
  //   transaction.delete(callDocRef);
  // });
};

// const findUserById = async (userId: string) => {
// const userRef = doc(collection(superjoinDb, 'users', userId));
// const userDoc = await getDoc(userRef);
// return userDoc.data();
// };

const getSendOffer = async (userId: any): Promise<any | null> => {
  console.log('get sendOffer', userId);
  // if (!userId) return null;
  // const callQuery = query(
  //   collection(superjoinDb, 'calls'),
  //   where('callHostId', '==', userId),
  // );
  // const querySnapshot = await getDocs(callQuery);
  // return querySnapshot.docs.map(async (callDoc: DocumentData) => {
  //   const callData = callDoc.data();
  //   const { deadline, createdAt, updatedAt, callMemberList } = callData;
  //   const convertDeadline = firebaseTimestampToDate(deadline);
  //   const callEndTime = Math.floor(
  //     (convertDeadline.getTime() - new Date().getTime()) / 1000 / 60,
  //   );
  //   if (callMemberList.length !== 0) {
  //     const userList = await Promise.all(
  //       callMemberList.map(async (memberId: string) => {
  //         return findUserById(memberId);
  //       }),
  //     );
  //     return {
  //       ...callData,
  //       callMemberList: userList,
  //       deadline: convertDeadline,
  //       callSendTime: firebaseTimestampToDate(createdAt),
  //       callEndTime,
  //       callUpdateTime: firebaseTimestampToDate(updatedAt),
  //     };
  //   }
  //   return {
  //     ...callData,
  //     deadline: convertDeadline,
  //     callSendTime: firebaseTimestampToDate(createdAt),
  //     callEndTime,
  //     callUpdateTime: firebaseTimestampToDate(updatedAt),
  //   };
  // });
};

export const offerService = {
  createOffer,
  reopenOffer,
  cancelOffer,
  deleteOffer,
  getSendOffer,
};
