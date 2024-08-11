import { Link, useLocation } from "react-router-dom";
import { getPayments } from "../data/PaymentsData";
import { getFilterObjectFromUrl } from "../utils/PaymentUtils";
import { useEffect, useState } from "react";
import { Payment } from "../types/Payment";
import { BackButton } from "../components/BackButton";

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

    useEffect(() => {
        console.log('PaymentsList rendered');
        fetchPayments();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>            
            <BackButton />
            <h1 className="text-3xl font-bold">Payments</h1>
            {
                payments.length > 0 && (
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
                )
            }

            {
                payments.length === 0 && (
                    <div>No payments found</div>
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
