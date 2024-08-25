import { FinancialActivity, FinancialActivityCreate, TransactionItemList, TransactionsFilter } from "../types/Activity";
import { toDate } from "../utils/TransactionUtils";

const LOCALSTORAGE_NAME = 'activities';

const getAllActivities = (): FinancialActivity[] => {
    try {
        const activitiesStore = localStorage.getItem(LOCALSTORAGE_NAME);
        if (!activitiesStore)
            throw new Error('No activities found');
        return JSON.parse(activitiesStore);
    } catch {
        return [];
    }
}

const saveActivities = (activities: FinancialActivity[]) => {
    localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(activities));
}

export const createActivities = (createActivities: FinancialActivityCreate[]) => {
    const activities = getAllActivities();
    let newId = activities.length;

    createActivities.forEach(createActivity => {
        const activity: FinancialActivity = {
            id: (++newId).toString(),
            title: createActivity.title,
            transactions: createActivity.transactions.map((createTransaction, index) => ({
                id: index.toString(),
                date: createTransaction.date,
                category: createTransaction.category,
                amount: createTransaction.amount,
                paid: createTransaction.paid,
                description: createTransaction.description
            }))
        };

        activities.push(activity);
    });

    saveActivities(activities);
}

export const updateActivity = (activity: FinancialActivity) => {
    const activities = getAllActivities();
    const index = activities.findIndex(a => a.id === activity.id);
    activities[index] = activity;
    saveActivities(activities);
}

export const getTransactions = (filter?: TransactionsFilter): TransactionItemList[] => {
    let transactions: TransactionItemList[] = [];

    const activities = getAllActivities();

    activities.forEach(activity => {
        activity.transactions.forEach(transaction => {
            transactions.push({
                id: transaction.id,
                date: toDate(transaction.date),
                amount: transaction.amount,
                paid: transaction.paid,
                description: transaction.description,
                category: transaction.category,
                financialActivityId: activity.id,
                financialTitle: activity.title
            });
        });
    });

    if (filter) {
        transactions = transactions.filter(transaction => (
            (!filter.category || transaction.category === filter.category) &&
            (!filter.startDate || transaction.date >= filter.startDate) &&
            (!filter.endDate || transaction.date <= filter.endDate)
        ));
    }

    transactions.sort((a, b) => {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
    });

    return transactions;
}

export const getActivity = (id: string): FinancialActivity | undefined => {
    const activities = getAllActivities();
    return activities.find(activity => activity.id === id);
}

export const removeAllActivities = () => {
    localStorage.removeItem(LOCALSTORAGE_NAME);
}

export const toggleTransactionPaidValue = (financialActivityId: string, transactionId: string) => {
    const activity = getActivity(financialActivityId);
    if (!activity) return;
    activity.transactions = activity.transactions.map(transaction => {
        if (transaction.id === transactionId) {
            transaction.paid = !transaction.paid;
        }
        return transaction;
    });
    updateActivity(activity);
}

export const getAllCategories = () => {
    const transactions = getTransactions();
    const categories = transactions.map(transaction => transaction.category);
    return Array.from(new Set(categories));
}