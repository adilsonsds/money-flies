import { Link, useLocation } from "react-router-dom";
import { getFilterObjectFromUrl } from "../utils/TransactionUtils";
import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import { TransactionItemList } from "../types/Activity";
import { getTransactions } from "../data/ActivitiesData";
import { TransactionsTable } from "../components/TransactionsTable";

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
                    <TransactionsTable
                        transactions={transactions}
                        enableEdit={false}
                    />
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