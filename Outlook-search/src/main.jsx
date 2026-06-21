import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const renderApp = () => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
};

// If running inside Outlook, wait for Office to initialize
if (window.Office) {
  Office.onReady(() => {
    renderApp();
  });
} else {
  // If running in a normal web browser for testing
  renderApp();
}
