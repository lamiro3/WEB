import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import ThemeBtn from './ThemeBtn';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeBtn />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
