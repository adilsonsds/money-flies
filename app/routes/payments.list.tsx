import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, json, useLoaderData } from "@remix-run/react";
import { getFilterURL, getFilteredPayments, getPayments } from "~/data/payments";
import { PaymentsFilter } from "~/types/Payment";

export default function PaymentsList() {
    const { payments, filter } = useLoaderData<typeof loader>();

    return (
        <div>
            <h1 className="text-3xl font-bold">Payments</h1>
            <table className="w-full">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Category</th>
                        <th>Method</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map(payment => (
                        <tr key={payment.id}>
                            <td className="text-center">{payment.date}</td>
                            <td className="text-center">{payment.description}</td>
                            <td className="text-center">{payment.amount}</td>
                            <td className="text-center">{payment.status}</td>
                            <td className="text-center">{payment.category}</td>
                            <td className="text-center">{payment.method}</td>
                            <td className="text-center">
                                <Link to={`/payments/${payment.id}`} className="text-blue-500">View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="py-4">
                <Link type="submit"
                    className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    to={`/payments/new?${getFilterURL({ startDate: new Date(filter.startDate), endDate: new Date(filter.endDate), category: filter.category })}`}>
                    Add payment
                </Link>

                <Link type="submit"
                    className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ml-2"
                    to="/">
                    Close
                </Link>
            </div>
        </div>
    )
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const today = new Date();

    const startDate: Date = url.searchParams.has("startDate") ? new Date(url.searchParams.get("startDate") as string) : today;
    const endDate: Date = url.searchParams.has("endDate") ? new Date(url.searchParams.get("endDate") as string) : today;
    const category: string = url.searchParams.get("category") || '';
    const filter: PaymentsFilter = { startDate, endDate, category };

    const payments = await getPayments();
    const filteredPayments = getFilteredPayments(payments, filter);

    return json({ payments: filteredPayments, filter });
};