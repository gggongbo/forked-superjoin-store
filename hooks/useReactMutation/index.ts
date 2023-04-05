import { useMutation } from 'react-query';

// TODO queryKey type add
const useReactMutation = <T>(
  queryKey: any,
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
      onError(error: Error) {
        onError?.(error);
        console.log('react-mutation error : ', error);
      },
    },
  );

  return { isLoading, isError, isSuccess, mutate, mutateAsync };
};

export { useReactMutation };
