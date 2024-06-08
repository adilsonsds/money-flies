import { Link, json, useLoaderData } from "@remix-run/react";
import { getPayments } from "~/data/payments";

export default function PaymentsList() {
    const { payments } = useLoaderData<typeof loader>();

    return (
        <div>
            <h1 className="text-3xl font-bold underline">Payments</h1>
            <table className="mt-2">
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
                            <td>{payment.date}</td>
                            <td>{payment.description}</td>
                            <td>{payment.amount}</td>
                            <td>{payment.status}</td>
                            <td>{payment.category}</td>
                            <td>{payment.method}</td>
                            <td>
                                <Link to={`/payments/${payment.id}`} className="text-blue-500">View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export const loader = async ({ params }: any) => {
    const year = parseInt(params.year, 10);
    const month = parseInt(params.month, 10);    
    const payments = await getPayments();

    const filteredPayments = payments.filter(payment => {
        if (params.category) {
            var paymentDate = new Date(payment.date);
            return payment.category === params.category && (paymentDate.getMonth() + 1) === month && paymentDate.getFullYear() === year;
        }

        return true;
    });

    return json({ payments: filteredPayments });
};