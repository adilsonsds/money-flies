import { Link, useLocation } from "react-router-dom";
import { getPayments, updatePayment } from "../data/PaymentsData";
import { getFilterObjectFromUrl } from "../utils/PaymentUtils";
import { useEffect, useState } from "react";
import { Payment } from "../types/Payment";
import { Checkbox } from "../components/Checkbox";
import PageTitle from "../components/PageTitle";

export default function PaymentsList() {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [payments, setPayments] = useState<Payment[]>([]);

    const fetchPayments = async () => {
        const filter = getFilterObjectFromUrl(location.search);
        const payments = await getPayments(filter);
        setPayments(payments);
        setIsLoading(false);
    };

    function handlePaymentStatusChange(payment: Payment) {
        payment.paid = !payment.paid;
        updatePayment(payment);
    }

    useEffect(() => {
        console.log('PaymentsList rendered');
        fetchPayments();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <PageTitle title="Payments" />
            {
                payments.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-gray-200 dark:bg-gray-500">
                                <tr>
                                    <th className="w-36 p-4 text-center dark:text-white">Date</th>
                                    <th className="w-48 p-4 text-center dark:text-white">Category</th>
                                    <th className="w-24 p-4 text-center dark:text-white">Amount</th>
                                    <th className="w-24 p-4 text-center dark:text-white">Paid</th>
                                    <th className="w-60 p-4 text-center dark:text-white">Description</th>
                                    <th className="w-24 p-4 text-center dark:text-white">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map(payment => (
                                    <tr key={payment.id} className="border-b hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600">
                                        <td className="p-4 text-center dark:text-white">{payment.date}</td>
                                        <td className="p-4 text-center dark:text-white">{payment.category}</td>
                                        <td className="p-4 text-center dark:text-white">{payment.amount}</td>
                                        <td className="p-4 text-center">
                                            <Checkbox
                                                checked={payment.paid}
                                                onChange={() => handlePaymentStatusChange(payment)}
                                            />
                                        </td>
                                        <td className="p-4 text-center dark:text-white">{payment.description}</td>
                                        <td className="p-4 text-center">
                                            <Link to={`/payments/${payment.id}`} className="text-blue-500 dark:text-blue-300 hover:underline">View</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400">No payments found.</p>
                )
            }

            <div className="py-4">
                <Link type="submit"
                    className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    // to={`/payments/new?${getFilterURL({ startDate: new Date(filter.startDate), endDate: new Date(filter.endDate), category: filter.category })}`}
                    to="/payments/new"
                >
                    Add payment
                </Link>
            </div>
        </div>
    )
}
