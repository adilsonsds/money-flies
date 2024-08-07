import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import ErrorPage from './ErrorPage.tsx';
import PaymentsList from './routes/PaymentsList.tsx';
import PaymentsNew from './routes/PaymentsNew.tsx';

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/payments/list",
    element: <PaymentsList />,
  },
  {
    path: "/payments/new",
    element: <PaymentsNew />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
