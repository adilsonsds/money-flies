import { Link } from "react-router-dom";
import { Payment } from "../types/Payment";

export default function PaymentsList() {
    const payments: Payment[] = [
        {
            id: '1',
            date: "2021-01-01",
            description: "Payment 1",
            amount: 100,
            status: "Pending",
            category: "Category 1",
        },
        {
            id: '2',
            date: "2021-01-02",
            description: "Payment 2",
            amount: 200,
            status: "Paid",
            category: "Category 2",
        },
        {
            id: "3",
            date: "2021-01-03",
            description: "Payment 3",
            amount: 300,
            status: "Paid",
            category: "Category 3",
        },
    ];
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
