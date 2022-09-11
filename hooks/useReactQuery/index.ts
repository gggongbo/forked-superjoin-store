import { useQuery } from 'react-query';
import * as QueryList from '../../constants/query';

interface QueryListType {
  [key: string]: any;
}

const queryList: QueryListType = {
  ...QueryList,
};

const ArrayToString = (array: any[]) => {
  return array
    .map((item: any) => {
      return JSON.stringify(item.status);
    })
    .toString();
};

const firebaseTimestampToDate = (timestamp: { _seconds: number }) => {
  // eslint-disable-next-line no-underscore-dangle
  return new Date(timestamp._seconds * 1000);
};

const useReactQuery = (queryType: string, arg: string, fc?: any) => {
  useQuery(arg, queryList[queryType], {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess(item: any) {
      fc((pre: any) => {
        if (ArrayToString(pre) !== ArrayToString(item.data)) {
          return item.data.map(
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
        }
        return pre;
      });
    },

    refetchInterval: 1000 * 1,
  });
};

export { useReactQuery };
