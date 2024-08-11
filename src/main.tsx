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
import { PaymentsProvider } from './contexts/PaymentsContext.tsx';
import PaymentsDetails from './routes/PaymentsDetails.tsx';

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
  {
    path: "/payments/:id",
    element: <PaymentsDetails />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PaymentsProvider>
      <RouterProvider router={router} />
    </PaymentsProvider>
  </React.StrictMode>,
)
