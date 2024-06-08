import { json, useLoaderData, useNavigate } from "@remix-run/react";
import { findPaymentById } from "~/data/payments";

export default function PaymentDetailsPage() {
    const navigate = useNavigate();
    const { payment } = useLoaderData<typeof loader>();

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold underline">Payment Details</h1>
            {
                payment &&
                <div className="mt-4">
                    <div>
                        <strong>Date:</strong> {payment.date}
                    </div>
                    <div>
                        <strong>Description:</strong> {payment.description}
                    </div>
                    <div>
                        <strong>Amount:</strong> {payment.amount}
                    </div>
                    <div>
                        <strong>Status:</strong> {payment.status}
                    </div>
                    <div>
                        <strong>Category:</strong> {payment.category}
                    </div>
                    <div>
                        <strong>Method:</strong> {payment.method}
                    </div>
                </div>
            }

            <div className="mt-4">
                <button type="submit"
                    className="mt-4 px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={() => navigate(-1)}>
                    Back
                </button>
            </div>
        </div>
    )
}

export const loader = async ({ params }: any) => {
    const payment = await findPaymentById(params.id);

    // if (!payment) {
    //     throw json(
    //         { message: "Could not find payment for id " + params.paymentId },
    //         { status: 404 }
    //     )
    // }

    return json({ payment });
}