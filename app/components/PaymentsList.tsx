import { Link } from "@remix-run/react";
import type { PaymentsList } from "~/types/Payment";

type PaymentsListType = {
  payments: PaymentsList;
};

export default function PaymentsList({ payments }: PaymentsListType) {
  return (
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
  )
};