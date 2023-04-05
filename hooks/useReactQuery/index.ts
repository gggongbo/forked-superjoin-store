import { QueryFunction, useQuery } from 'react-query';

// TODO queryKey type add
const useReactQuery = <T>(
  queryKey: any,
  queryFn: QueryFunction,
  onSuccess?: Function,
  onError?: Function,
) => {
  const { data, isLoading, isError, isSuccess } = useQuery(queryKey, queryFn, {
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    onSuccess(item: T) {
      onSuccess?.(item);
    },
    onError(error: Error) {
      onError?.(error);
      console.log('react-query error : ', error);
    },
  });

  return { data, isLoading, isError, isSuccess };
};

export { useReactQuery };
