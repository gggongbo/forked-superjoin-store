import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: false,
      retry: 0,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
    mutations: {
      useErrorBoundary: false,
    },
  },
});

export default queryClient;
