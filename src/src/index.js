import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './routes/Login/Login.js';
import Past from "./routes/Past/Past.js";
import reportWebVitals from './reportWebVitals.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Login/>
    <Past/>
  </React.StrictMode>
);
