import { useEffect, useState } from "react";
import { Payment } from "../types/Payment";
import { useNavigate, useParams } from "react-router-dom";
import { getPaymentById } from "../data/PaymentsData";

export default function PaymentsDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [payment, setPayment] = useState<Payment | null>(null);

    useEffect(() => {
        if (!id) return;
        setPayment(getPaymentById(id));
    }, []);

    if (!payment) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1 className="text-3xl font-bold">Payment Details</h1>
            <div>
                <label>Date:</label>
                <span>{payment.date}</span>
            </div>
            <div>
                <label>Description:</label>
                <span>{payment.description}</span>
            </div>
            <div>
                <label>Amount:</label>
                <span>{payment.amount}</span>
            </div>
            <div>
                <label>Status:</label>
                <span>{payment.status}</span>
            </div>
            <div>
                <label>Category:</label>
                <span>{payment.category}</span>
            </div>
            <button
                className="mt-4 px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => navigate(-1)}>
                Close
            </button>
        </div>
    );
} 