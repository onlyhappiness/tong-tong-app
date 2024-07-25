import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import Navigation from './Navigation';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
      {/* <Toast /> */}
    </QueryClientProvider>
  );
};

export default App;
