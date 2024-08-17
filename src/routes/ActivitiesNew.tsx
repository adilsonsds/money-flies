import { useNavigate } from "react-router-dom";
import { FinancialActivityCreate, FinancialTransactionCreate } from "../types/Activity";
import { createActivities } from "../data/ActivitiesData";
import PageTitle from "../components/PageTitle";
import { useEffect, useState } from "react";
import { TransactionsTable } from "../components/TransactionsTable";

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
                            ...transaction,
                            id: '',
                            financialActivityId: ''
                        }))}
                        onChange={handleTransactionChange}
                        enableEdit={true}
                    />
                </div>
                <div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                </div>
            </form >
        </>
    );
}
