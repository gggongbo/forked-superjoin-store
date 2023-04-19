import { QueryKey, useMutation } from 'react-query';

const useReactMutation = <T>(
  queryKey: QueryKey,
  queryFn: Function,
  onSuccess?: Function,
  onError?: Function,
) => {
  const { isLoading, isError, isSuccess, mutate, mutateAsync } = useMutation(
    queryKey,
    (params: T) => queryFn(params),
    {
      retry: 0,
      onSuccess(data: T) {
        onSuccess?.(data);
      },
      /* eslint-disable no-console */
      /* eslint-disable no-alert */
      onError(error: Error) {
        onError?.(error);
        alert(error.message);
        console.log('react-mutation error : ', error);
      },
    },
  );

  return { isLoading, isError, isSuccess, mutate, mutateAsync };
};

export { useReactMutation };
