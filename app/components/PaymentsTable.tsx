import { Payment } from "~/types/Payment";

type PaymentTableType = {
  payments: Payment[];
};

export default function PaymentsTable({ payments }: PaymentTableType) {
  return (
    <table className="mt-2">
      <thead>
        <tr>
          <th>Payment Date</th>
          <th>Title</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        {payments.map(payment => (
          <tr key={payment.id}>
            <td>{payment.date}</td>
            <td>{payment.description}</td>
            <td>{payment.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
};