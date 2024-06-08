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
import { getFilterURL, getPayments, getTotalValue } from "./data/payments";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesheet }];
}

type Period = {
  startDate: Date;
  endDate: Date;
}

export default function App() {
  const { payments } = useLoaderData<typeof loader>();

  const year = new Date().getFullYear();
  const header = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const periods: Period[] = months.map(month => {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    return { startDate, endDate };
  });

  const categories = [...new Set(payments.map(summary => summary.category))];

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
            <h1 className="text-3xl font-bold underline">Summary</h1>
            <table className="mt-2">
              <thead>
                <tr>
                  <th>#</th>
                  {months.map((col, index) => (
                    <th key={index} className="border px-4 py-2">
                      {header[col]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{category}</td>
                    {periods.map((period, index) => {
                      const totalValue = getTotalValue(payments, { startDate: period.startDate, endDate: period.endDate, category: category });
                      return (
                        <td key={index} className="border px-4 py-2">
                          <Link to={`/payments/list?${getFilterURL({ startDate: period.startDate, endDate: period.endDate, category })}`} className="text-blue-500">
                            {totalValue}
                          </Link>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
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