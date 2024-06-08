import { Link, json, useLoaderData } from "@remix-run/react";
import { findPaymentById } from "~/data/payments";

export default function PaymentDetailsPage() {
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
                <Link to="/payments/list" className="text-blue-500">Back to Payments</Link>
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