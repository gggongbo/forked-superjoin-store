import { QueryFunction, useQuery } from 'react-query';

const useReactQuery = <T>(
  queryKey: string,
  queryFn: QueryFunction,
  onSuccess?: Function,
) => {
  useQuery(queryKey, queryFn, {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess(item: T) {
      onSuccess?.(item);
    },

    refetchInterval: 1000 * 60 * 60,
  });
};

export { useReactQuery };
