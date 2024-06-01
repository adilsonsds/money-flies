import { redirect, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PaymentForm from "~/components/PaymentForm";
import PaymentsList from "~/components/PaymentsList";
import { addPayment, getPayments } from "~/data/payments";
import { Payment } from "~/types/Payment";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const payments = useLoaderData<Payment[]>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8", padding: "20px" }}>
      <h1 className="text-3xl font-bold underline">Payment Form</h1>
      <PaymentForm />
      <h2 className="text-2xl font-bold underline mt-4">Payments</h2>
      <PaymentsList payments={payments} />
    </div>
  );
}

export async function loader() {
  return await getPayments();
}

export async function action({ request }: any) {
  const formData = await request.formData();
  const paymentData = Object.fromEntries(formData) as Payment;

  if (!paymentData.date || !paymentData.description || !paymentData.amount) {
    return {
      message: "Please fill in all fields"
    }
  }

  await addPayment(paymentData);
  return redirect("/");
}