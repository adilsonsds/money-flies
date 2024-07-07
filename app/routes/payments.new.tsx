import { LoaderFunctionArgs } from "@remix-run/node";
import { Form, redirect, useActionData, useNavigate, useNavigation } from "@remix-run/react";
import { addPayment, getFilterUrlFromPayment } from "~/data/payments";
import type { Payment } from "~/types/Payment";

export default function PaymentPage() {
    const data: any = useActionData();
    const navigation = useNavigation();

    const isSubmitting = navigation.state === "submitting";
    const navigate = useNavigate();

    return (
        <>
            <h1 className="text-3xl font-bold">Payment Form</h1>
            <Form method="post" className="space-y-4 mt-4">
                {data?.message && <p className="text-red-500">{data.message}</p>}
                <div>
                    <label htmlFor="paymentDate" className="block">Date</label>
                    <input id="paymentDate" type="date" name="date" className="mt-1 block w-full border rounded px-3 py-1" />
                </div>
                <div>
                    <label htmlFor="paymentAmount" className="block">Amount</label>
                    <input id="paymentAmount" type="number" name="amount" className="mt-1 block w-full border rounded px-3 py-1" />
                </div>
                <div>
                    <label htmlFor="paymentStatus" className="block">Status</label>
                    <select id="paymentStatus" name="status" className="mt-1 block w-full border rounded px-3 py-1">
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="paymentDescription" className="block">Description</label>
                    <input id="paymentDescription" type="text" name="description" className="mt-1 block w-full border rounded px-3 py-1" />
                </div>
                <div>
                    <label htmlFor="paymentCategory" className="block">Category</label>
                    <select id="paymentCategory" name="category" className="mt-1 block w-full border rounded px-3 py-1">
                        <option value="food">Food</option>
                        <option value="transport">Transport</option>
                        <option value="housing">Housing</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="health">Health</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <button type="submit" className="mt-4 px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </Form>

            <button type="submit"
                className="mt-4 px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => navigate(-1)}>
                Cancel
            </button>
        </>
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
    };

    if (!payment.date || !payment.description || !payment.amount) {
        return {
            message: "Please fill in all fields"
        }
    }

    await addPayment(payment);
    return redirect(`/payments/list?${getFilterUrlFromPayment(payment)}`);
}