import React from 'react';
import ReactDOM from 'react-dom/client';
import HomeStatic from './HomeStatic';
import './style.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <HomeStatic />
  </React.StrictMode>
);
// Force GitHub Pages redeploy lun.  7 juil. 2025 15:11:16
