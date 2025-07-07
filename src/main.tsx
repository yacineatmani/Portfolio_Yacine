import React from 'react';
import ReactDOM from 'react-dom/client';
import WorkingPortfolio from './WorkingPortfolio';
import './style.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <WorkingPortfolio />
  </React.StrictMode>
);
