import { Link, useLocation } from "react-router-dom";
import { getFilterObjectFromUrl } from "../utils/TransactionUtils";
import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import { TransactionItemList } from "../types/Activity";
import { getTransactions } from "../data/ActivitiesData";

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
                    <div className="overflow-x-auto">
                        <div className="grid grid-cols-12 gap-px bg-gray-400">
                            <div className="col-span-1 p-2 bg-gray-200 font-bold text-center">#</div>
                            <div className="col-span-2 p-2 bg-gray-200 font-bold text-center">Date</div>
                            <div className="col-span-2 p-2 bg-gray-200 font-bold text-center">Category</div>
                            <div className="col-span-2 p-2 bg-gray-200 font-bold text-center">Amount</div>
                            <div className="col-span-1 p-2 bg-gray-200 font-bold text-center">Paid</div>
                            <div className="col-span-3 p-2 bg-gray-200 font-bold text-center">Description</div>
                            <div className="col-span-1 p-2 bg-gray-200 font-bold text-center">#</div>
                            {transactions.map((transaction, index) => (
                                <TableRow
                                    key={index}
                                    index={index}
                                    transaction={transaction}
                                />
                            ))}
                        </div>
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

type TableRowProps = {
    index: number;
    transaction: TransactionItemList;
}

const TableRow = ({ index, transaction }: TableRowProps) => {
    return (
        <>
            <div className="col-span-1 p-2 bg-white text-center">{index + 1}</div>
            <div className="col-span-2 p-2 bg-white text-center">{transaction.date}</div>
            <div className="col-span-2 p-2 bg-white text-center">{transaction.category}</div>
            <div className="col-span-2 p-2 bg-white text-center align-middle">{transaction.amount}</div>
            <div className="col-span-1 p-2 bg-white text-center">{transaction.paid ? 'Yes' : 'No'}</div>
            <div className="col-span-3 p-2 bg-white text-center">
                {transaction.financialTitle}
                {transaction.description &&
                    <div className="text-sm text-gray-500 dark:text-gray-400">{transaction.description}</div>
                }
            </div>
            <div className="col-span-1 p-2 bg-white text-center">
                <Link to={`/activities/edit/${transaction.financialActivityId}`} className="text-blue-500 dark:text-blue-300 hover:underline">View</Link>
            </div>
        </>
    )
}