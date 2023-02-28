import { DocumentData } from 'firebase/firestore';
import { useQuery } from 'react-query';

import * as QueryList from './query';

// react-query 이용 로직 미사용
interface QueryListType {
  [key: string]: any;
}

const queryList: QueryListType = {
  ...QueryList,
};

const useReactQuery = (
  queryName: string,
  arg: string,
  onSuccess?: Function,
) => {
  useQuery(arg, queryList[queryName], {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess(item: DocumentData) {
      onSuccess?.(item);
    },

    refetchInterval: 1000 * 60 * 60,
  });
};

export { useReactQuery };
