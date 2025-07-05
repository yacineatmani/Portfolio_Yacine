import React from 'react';
import ReactDOM from 'react-dom/client';
import StaticPortfolio from './StaticPortfolio';
import './style.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <StaticPortfolio />
  </React.StrictMode>
);
