import { FinancialActivity, FinancialActivityCreate, TransactionsFilter, TransactionsResult } from "../types/Activity";

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
            description: createActivity.description,
            category: createActivity.category,
            transactions: createActivity.transactions.map((createTransaction, index) => ({
                id: index.toString(),
                date: createTransaction.date,
                amount: createTransaction.amount,
                paid: createTransaction.paid,
                description: createTransaction.description
            }))
        };

        activities.push(activity);
    });

    saveActivities(activities);
}

export const getTransactions = (filter?: TransactionsFilter): TransactionsResult => {
    const result: TransactionsResult = {
        transactions: [],
        total: 0
    };

    const activities = getAllActivities();

    activities.forEach(activity => {
        activity.transactions.forEach(transaction => {
            result.transactions.push({
                id: transaction.id,
                date: transaction.date,
                amount: transaction.amount,
                paid: transaction.paid,
                description: transaction.description,
                category: activity.category,
                financialActivityId: activity.id
            });
        });
    });

    if (filter) {
        result.transactions = result.transactions.filter(transaction => (
            (!filter.category || transaction.category === filter.category) &&
            (!filter.startDate || transaction.date >= filter.startDate.toISOString()) &&
            (!filter.endDate || transaction.date <= filter.endDate.toISOString())
        ));
    }

    result.transactions.sort((a, b) => {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
    });

    return result;
}
