import { useNavigate } from "react-router-dom";
import { FinancialActivityCreate, FinancialTransactionCreate } from "../types/Activity";
import { createActivities } from "../data/ActivitiesData";
import PageTitle from "../components/PageTitle";
import { useEffect, useState } from "react";

export default function ActivitiesNew() {
    const navigate = useNavigate();

    const [category, setCategory] = useState('food');
    const [description, setDescription] = useState('');
    const [transactions, setTransactions] = useState<FinancialTransactionCreate[]>([]);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const activity: FinancialActivityCreate = {
            category: category,
            description: description,
            transactions: transactions.map(transaction => ({
                date: transaction.date,
                amount: transaction.amount,
                paid: transaction.paid,
                description: transaction.description
            }))
        };

        console.log('Creating activity', activity);

        try {
            createActivities([activity]);
            navigate(-1);
        }
        catch (error) {
            console.error('Error creating activity', error);
            alert('Error creating activity');
        }
    }

    function handleTransactionChange(index: number, key: string, value: string | number | boolean) {
        setTransactions(transactions.map((transaction, i) => {
            if (i !== index) return transaction;
            return {
                ...transaction,
                [key]: value
            };
        }));
    }

    useEffect(() => {
        setTransactions([
            {
                date: new Date().toISOString().split('T')[0],
                amount: 0,
                paid: true,
                description: ''
            }
        ]);
    }, []);

    return (
        <>
            <PageTitle title="New activity" />
            <form method="post" className="space-y-4 mt-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="activityCategory" className="block">Category</label>
                    <input
                        id="activityCategory"
                        type="text"
                        name="category"
                        className="mt-1 block w-full border rounded px-3 py-1"
                        value={category}
                        onChange={event => setCategory(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="activityDescription" className="block">Description</label>
                    <input
                        id="activityDescription"
                        type="text"
                        name="description"
                        className="mt-1 block w-full border rounded px-3 py-1"
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />
                </div>
                <div className="overflow-x-auto">
                    <table id="transactions" className="min-w-full bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-200 dark:bg-gray-500">
                            <tr>
                                <th className="w-16 text-center">#</th>
                                <th className="w-36 p-4 text-center dark:text-white">Date</th>
                                <th className="w-24 p-4 text-center dark:text-white">Amount</th>
                                <th className="w-24 p-4 text-center dark:text-white">Paid</th>
                                <th className="w-60 p-4 text-center dark:text-white">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) =>
                                <tr key={index} className="border-b hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600">
                                    <td className="text-center">
                                        {index + 1}
                                    </td>
                                    <td className="p-4 text-center dark:text-white">
                                        <input
                                            type="date"
                                            name={`transactions[${index}].date`}
                                            className="w-36 border rounded px-3 py-1"
                                            value={transaction.date}
                                            onChange={event => handleTransactionChange(index, 'date', event.target.value)}
                                        />
                                    </td>
                                    <td className="p-4 text-center dark:text-white">
                                        <input
                                            type="number"
                                            name={`transactions[${index}].amount`}
                                            className="w-24 border rounded px-3 py-1"
                                            value={transaction.amount}
                                            onChange={event => handleTransactionChange(index, 'amount', parseFloat(event.target.value))}
                                        />
                                    </td>
                                    <td className="p-4 text-center">
                                        <input
                                            type="checkbox"
                                            name={`transactions[${index}].paid`}
                                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                            checked={transaction.paid}
                                            onChange={event => handleTransactionChange(index, 'paid', event.target.checked)}
                                        />
                                    </td>
                                    <td className="p-4 text-center dark:text-white">
                                        <input
                                            type="text"
                                            name={`transactions[${index}].description`}
                                            className="w-60 border rounded px-3 py-1"
                                            value={transaction.description}
                                            onChange={event => handleTransactionChange(index, 'description', event.target.value)}
                                        />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                </div>
            </form>
        </>
    );
}