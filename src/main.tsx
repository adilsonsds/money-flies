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
import PaymentsDetails from './routes/PaymentsDetails.tsx';
import ActivitiesNew from './routes/ActivitiesNew.tsx';

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
    path: "/payments/:id",
    element: <PaymentsDetails />,
  },
  {
    path: "activities/new",
    element: <ActivitiesNew />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
