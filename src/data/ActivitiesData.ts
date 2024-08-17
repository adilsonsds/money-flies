import { FinancialActivity, FinancialActivityCreate } from "../types/Activity";

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

export const getPaymentsFromTransactions = () => {
    const activities = getAllActivities();
    const payments = activities.flatMap(activity => activity.transactions.map(transaction => ({
        date: transaction.date,
        amount: transaction.amount,
        paid: transaction.paid,
        description: transaction.description,
        category: activity.category
    })));

    return payments;
}
