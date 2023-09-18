import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Loading } from './Loading'; // Import the Loading component using named import
import { LoadingProvider, useLoading } from './LoadingContext';

function Main() {
  const { loading, startLoading, stopLoading } = useLoading();
  useEffect(() => {
    // Simulate loading or fetching data
    startLoading();

    // After loading or data fetching is complete
    setTimeout(() => {
      stopLoading();
    }, 2000); // Replace with your actual loading logic
  }, []);

  return (
    <React.StrictMode>
      {loading ? <Loading /> : <App />}
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('react-app')).render(
  <LoadingProvider>
    <Main />
  </LoadingProvider>
);
