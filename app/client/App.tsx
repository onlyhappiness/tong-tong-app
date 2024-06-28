import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import Toast from 'react-native-toast-message';
import Navigation from './Navigation';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
      <Toast />
    </QueryClientProvider>
  );
};

export default App;
