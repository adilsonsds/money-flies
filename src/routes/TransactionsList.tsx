import { Link, useLocation } from "react-router-dom";
import { getFilterObjectFromUrl } from "../utils/TransactionUtils";
import { useEffect, useState } from "react";
import { Checkbox } from "../components/Checkbox";
import PageTitle from "../components/PageTitle";
import { TransactionItemList } from "../types/Activity";
import { getTransactions, toggleTransactionPaidValue } from "../data/ActivitiesData";

export default function TransactionsList() {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<TransactionItemList[]>([]);

    const fetchTransactions = () => {
        const filter = getFilterObjectFromUrl(location.search);
        const result = getTransactions(filter);
        setTransactions(result);
        setIsLoading(false);
    };

    function handleTransactionStatusChange(transaction: TransactionItemList) {
        transaction.paid = !transaction.paid;
        toggleTransactionPaidValue(transaction.financialActivityId, transaction.id);
    }

    useEffect(() => {
        console.log('PaymentsList rendered');
        fetchTransactions();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <PageTitle title="Transactions" />
            {
                transactions.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-gray-200 dark:bg-gray-500">
                                <tr>
                                    <th className="w-36 p-4 text-center dark:text-white">Date</th>
                                    <th className="w-48 p-4 text-center dark:text-white">Category</th>
                                    <th className="w-24 p-4 text-center dark:text-white">Amount</th>
                                    <th className="w-24 p-4 text-center dark:text-white">Paid</th>
                                    <th className="w-60 p-4 text-center dark:text-white">Description</th>
                                    <th className="w-24 p-4 text-center dark:text-white">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map(transaction => (
                                    <tr key={transaction.id} className="border-b hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600">
                                        <td className="p-4 text-center dark:text-white">{transaction.date}</td>
                                        <td className="p-4 text-center dark:text-white">{transaction.category}</td>
                                        <td className="p-4 text-center dark:text-white">{transaction.amount}</td>
                                        <td className="p-4 text-center">
                                            <Checkbox
                                                checked={transaction.paid}
                                                onChange={() => handleTransactionStatusChange(transaction)}
                                            />
                                        </td>
                                        <td className="p-4 text-center dark:text-white">{transaction.description}</td>
                                        <td className="p-4 text-center">
                                            <Link to={`/activities/edit/${transaction.financialActivityId}`} className="text-blue-500 dark:text-blue-300 hover:underline">View</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400">No payments found.</p>
                )
            }

            <div className="py-4">
                <Link type="submit"
                    className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    // to={`/payments/new?${getFilterURL({ startDate: new Date(filter.startDate), endDate: new Date(filter.endDate), category: filter.category })}`}
                    to="/activities/new"
                >
                    Add payment
                </Link>
            </div>
        </div>
    )
}
