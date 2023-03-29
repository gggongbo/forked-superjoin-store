import { QueryFunction, useQuery } from 'react-query';

// TODO queryKey type add
const useReactQuery = <T>(
  queryKey: any,
  queryFn: QueryFunction,
  onSuccess?: Function,
) => {
  const { data, isLoading, isError, isSuccess } = useQuery(queryKey, queryFn, {
    onSuccess(item: T) {
      onSuccess?.(item);
    },
    onError(error: Error) {
      console.log('react-query error : ', error);
    },
  });

  return { data, isLoading, isError, isSuccess };
};

export { useReactQuery };
