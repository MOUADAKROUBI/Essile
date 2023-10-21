import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Loading } from './Loading'; 
import reactGa from 'react-ga4'

const tracking_id = 'G-33WXLKYDKD'
reactGa.initialize(tracking_id)

// Send pageview with a custom path
reactGa.send({ hitType: "pageview", page: window.location.pathname, title: document.title });

function Main() {
  const [loading, setLoading] = useState(true)
  setTimeout(() => {
    setLoading(false);
  }, 2000)

  return (
    <React.StrictMode>
      {window.location.pathname==='/'&&loading ? <Loading /> : <App />}
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('react-app')).render(
  <Main />
);
