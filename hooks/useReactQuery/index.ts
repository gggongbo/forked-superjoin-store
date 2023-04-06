import { QueryFunction, useQuery, UseQueryOptions } from 'react-query';

// TODO queryKey type add
const useReactQuery = (
  queryKey: any,
  queryFn: QueryFunction,
  option?: Omit<UseQueryOptions, 'onSuccess' | 'onError'>,
  onSuccess?: Function,
  onError?: Function,
) => {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery(
    queryKey,
    queryFn,
    {
      onSuccess(item) {
        onSuccess?.(item);
      },
      onError(error) {
        onError?.(error);
        console.log('react-query error : ', error);
      },
      ...option,
      retry: 0,
    },
  );

  return { data, isLoading, isError, isSuccess, refetch };
};

export { useReactQuery };
