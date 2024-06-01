import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";

import type { LinksFunction } from "@remix-run/node";
import stylesheet from "~/tailwind.css?url";
import PaymentsList from "./components/PaymentsList";
import { getPayments } from "./data/payments";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesheet }];
}

export default function App() {
  const { payments } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-200">
        <div className="flex">
          <div className="w-3/4">
            <Link to="/payments/new" className="block bg-blue-500 text-white p-4">
              Add Payment
            </Link>
            <PaymentsList payments={payments} />
          </div>
          <div className="w-1/4 bg-gray-100 text-black">
            <Outlet />
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const loader = async () => {
  const payments = await getPayments();
  return json({ payments });
};