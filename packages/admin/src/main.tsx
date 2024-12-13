import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Global } from '@emotion/react';
import { GlobalStyle } from './style/globalStyle.style';
import { ToastContainer } from 'react-toastify';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      staleTime: 5000,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <QueryClientProvider client={queryClient}>
      <Global styles={GlobalStyle} />
      <App />
      <ToastContainer />
    </QueryClientProvider>
  </>,
)
