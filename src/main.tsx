import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import ErrorPage from './ErrorPage.tsx';
import TransactionsList from './routes/TransactionsList.tsx';
import ActivitiesNew from './routes/ActivitiesNew.tsx';
import ActivitiesEdit from './routes/ActivitiesEdit.tsx';

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/transactions/list",
    element: <TransactionsList />,
  },
  {
    path: "/activities/edit/:id",
    element: <ActivitiesEdit />,
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
