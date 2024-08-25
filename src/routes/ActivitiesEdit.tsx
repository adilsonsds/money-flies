import { useNavigate, useParams } from "react-router-dom";
import { FinancialActivity, FinancialTransaction } from "../types/Activity";
import { getActivity, updateActivity } from "../data/ActivitiesData";
import PageTitle from "../components/PageTitle";
import { useEffect, useState } from "react";
import { TransactionsTable } from "../components/TransactionsTable";
import { toDate } from "../utils/TransactionUtils";

export default function ActivitiesEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [transactions, setTransactions] = useState<FinancialTransaction[]>([]);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const activity: FinancialActivity = {
            id: id as string,
            title: title,
            transactions: transactions.map(transaction => ({
                id: transaction.id,
                date: transaction.date,
                category: transaction.category,
                amount: transaction.amount,
                paid: transaction.paid,
                description: transaction.description
            }))
        };

        console.log('Creating activity', activity);

        try {
            updateActivity(activity);
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

    function handleActivityLoad() {
        const activity = getActivity(id as string);
        if (!activity) return;
        setTitle(activity.title);
        setTransactions(activity.transactions);
    }

    useEffect(() => {
        if (!id) return;
        handleActivityLoad();
    }, []);

    return (
        <>
            <PageTitle title="Edit activity" />
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
                            id: transaction.id,
                            date: toDate(transaction.date),
                            category: transaction.category,
                            amount: transaction.amount,
                            paid: transaction.paid,
                            description: transaction.description,
                            financialActivityId: id as string,
                            financialTitle: title
                        }))}
                        onChange={handleTransactionChange}
                        enableEdit={true}
                        onDelete={handleTransactionDelete}
                    />
                </div>
                <div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                </div>
            </form>
        </>
    );
}