import { useNavigate } from "react-router-dom";
import { FinancialActivityCreate, FinancialTransactionCreate } from "../types/Activity";
import { createActivities } from "../data/ActivitiesData";
import PageTitle from "../components/PageTitle";
import { useEffect, useState } from "react";
import { TransactionsTable } from "../components/TransactionsTable";
import { toDate } from "../utils/TransactionUtils";

export default function ActivitiesNew() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [transactions, setTransactions] = useState<FinancialTransactionCreate[]>([]);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const activity: FinancialActivityCreate = {
            title: title,
            transactions: transactions.map(transaction => ({
                date: transaction.date,
                category: transaction.category,
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

    function handleTransactionDelete(index: number) {
        setTransactions(transactions.filter((_, i) => i !== index));
    }

    function handleAddTransaction() {
        const lastTransaction = transactions[transactions.length - 1];
        if (lastTransaction)
            setTransactions([
                ...transactions,
                {
                    date: lastTransaction.date,
                    category: lastTransaction.category,
                    amount: lastTransaction.amount,
                    paid: lastTransaction.paid,
                    description: lastTransaction.description
                }
            ]);
        else
            setTransactions([
                {
                    date: new Date().toISOString().split('T')[0],
                    category: '',
                    amount: 0,
                    paid: true,
                    description: ''
                }
            ]);
    }

    function handleOnLoad() {
        setTransactions([
            {
                date: new Date().toISOString().split('T')[0],
                category: '',
                amount: 0,
                paid: true,
                description: ''
            }
        ]);
    }

    useEffect(() => {
        handleOnLoad();
    }, []);

    return (
        <>
            <PageTitle title="New activity" />
            <form method="post" className="space-y-4 mt-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="activityTitle" className="block">Title</label>
                    <input
                        id="activityTitle"
                        type="text"
                        name="description"
                        className="mt-1 block w-full border rounded px-3 py-1"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                </div>
                <div className="overflow-x-auto">
                    <TransactionsTable
                        transactions={transactions.map((transaction) => ({
                            id: '',
                            date: toDate(transaction.date),
                            category: transaction.category,
                            amount: transaction.amount,
                            paid: transaction.paid,
                            description: transaction.description,
                            financialActivityId: '',
                            financialTitle: ''
                        }))}
                        onChange={handleTransactionChange}
                        enableEdit={true}
                        onDelete={handleTransactionDelete}
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleAddTransaction}
                    >
                        Add transaction
                    </button>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                </div>
            </form >
        </>
    );
}
