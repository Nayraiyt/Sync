import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Login from './routes/Login/Login.tsx';
import Past from './routes/Past/Past.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Login />
  </StrictMode>,
)
