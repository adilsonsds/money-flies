import { Link, useLocation } from "react-router-dom";
import { getPayments } from "../data/PaymentsData";
import { getFilterObjectFromUrl } from "../utils/PaymentUtils";

export default function PaymentsList() {
    const location = useLocation();
    const filter = getFilterObjectFromUrl(location.search);
    const payments = getPayments(filter);

    return (
        <div>
            <h1 className="text-3xl font-bold">Payments</h1>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="w-24">Date</th>
                        <th className="w-48">Description</th>
                        <th className="w-24">Amount</th>
                        <th className="w-24">Status</th>
                        <th className="w-24">Category</th>
                        <th className="w-24">Actions</th>
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
                    // to={`/payments/new?${getFilterURL({ startDate: new Date(filter.startDate), endDate: new Date(filter.endDate), category: filter.category })}`}
                    to="/"
                >
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
