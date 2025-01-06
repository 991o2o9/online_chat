import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './App/Styles/normalize.scss';
import './App/Styles/styles.scss';
import { Router } from './App/Router/Router';

createRoot(document.getElementById('root')).render(
  <RouterProvider router={Router} future={{ v7_startTransition: true }} />
);
