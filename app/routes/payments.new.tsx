import { LoaderFunctionArgs } from "@remix-run/node";
import { redirect, useNavigate } from "@remix-run/react";
import PaymentForm from "~/components/PaymentForm";
import { addPayment } from "~/data/payments";
import type { Payment } from "~/types/Payment";

export default function PaymentPage() {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold underline">Payment Form</h1>
            <PaymentForm />

            <button type="submit"
                className="mt-4 px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => navigate(-1)}>
                Cancel
            </button>
        </div>
    );
}

export async function action({ request }: LoaderFunctionArgs) {
    const formData = await request.formData();
    const rawData = Object.fromEntries(formData.entries());

    const payment: Payment = {
        id: new Date().toISOString(),
        date: rawData.date as string,
        description: rawData.description as string,
        amount: parseFloat(rawData.amount as string),
        status: rawData.status as string,
        category: rawData.category as string,
        method: rawData.method as string,
    };

    if (!payment.date || !payment.description || !payment.amount) {
        return {
            message: "Please fill in all fields"
        }
    }

    await addPayment(payment);
    return redirect(`/payments/list?year=${new Date(payment.date).getFullYear()}&month=${new Date(payment.date).getMonth() + 1}&category=${payment.category}`);
}