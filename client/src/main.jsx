import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Loading } from './Loading'; 

function Main() {
  const [loading, setLoading] = useState(true)

  setTimeout(() => {
    setLoading(false);
  }, 4000);

  return (
    <React.StrictMode>
      {window.location.pathname==='/'&&loading ? <Loading /> : <App />}
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('react-app')).render(
  <Main />
);
