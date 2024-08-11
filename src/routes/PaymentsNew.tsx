import { useNavigate } from "react-router-dom";
import { createPayments } from "../data/PaymentsData";
import { PaymentCreate } from "../types/Payment";
import { BackButton } from "../components/BackButton";

export default function PaymentsNew() {
    const navigate = useNavigate();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const payment: PaymentCreate = {
            date: formData.get('date') as string,
            amount: Number(formData.get('amount')),
            status: formData.get('status') as string,
            description: formData.get('description') as string,
            category: formData.get('category') as string
        };

        try {
            createPayments([payment]);
            navigate(-1);
        }
        catch (error) {
            console.error('Error creating payment', error);
            alert('Error creating payment');
        }
    }

    return (
        <>
            <BackButton />
            <h1 className="text-3xl font-bold">Payment Form</h1>
            <form method="post" className="space-y-4 mt-4" onSubmit={handleSubmit}>
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
                <button type="submit" className="mt-4 px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Submit
                </button>
            </form>
        </>
    );
}