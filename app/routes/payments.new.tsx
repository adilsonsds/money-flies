import { redirect } from "@remix-run/react";
import PaymentForm from "~/components/PaymentForm";
import { addPayment } from "~/data/payments";
import type { Payment } from "~/types/Payment";

export default function PaymentPage() {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold underline">Payment Form</h1>
            <PaymentForm />
        </div>
    );
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