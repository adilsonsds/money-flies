import { redirect, type MetaFunction } from "@remix-run/node";
import PaymentForm from "~/components/PaymentForm";
import { addPayment } from "~/data/payments";
import { Payment } from "~/types/Payment";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8", padding: "20px" }}>
      <h1 className="text-3xl font-bold underline">Payment Form</h1>
      <PaymentForm />
    </div>
  );
}

export async function action({ request }: any) {
  const formData = await request.formData();
  const paymentData = Object.fromEntries(formData) as Payment;
  // Add validation ...
  await addPayment(paymentData);
  return redirect("/");
}