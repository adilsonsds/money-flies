import { createContext, useContext, useEffect, useState } from "react";
import { Payment, PaymentCreate } from "../types/Payment";
import { createPayments, getPayments, removeAllPayments } from "../data/PaymentsData";
import { faker } from '@faker-js/faker';

type Period = {
    startDate: Date;
    endDate: Date;
}

type PaymentContextType = {
    payments: Payment[];
    periods: Period[];
    categories: string[];
    createFakeData: () => Promise<void>;
    clearData: () => Promise<void>;
};

const PaymentsContext = createContext<PaymentContextType>({
    payments: [],
    periods: [],
    categories: [],
    createFakeData: async () => { },
    clearData: async () => { }
});

export function PaymentsProvider({ children }: { children: React.ReactNode }) {
    const [periods, setPeriods] = useState<Period[]>([]);
    const [payments, setPayments] = useState<Payment[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    async function handlePayments() {
        const payments = await getPayments();
        const year = new Date().getFullYear();
        const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

        const periods: Period[] = months.map(month => {
            const startDate = new Date(year, month, 1);
            const endDate = new Date(year, month + 1, 0);
            return { startDate, endDate };
        });

        setPayments(payments);
        setPeriods(periods);
        setCategories([...new Set(payments.map(summary => summary.category))]);
    }

    async function createFakeData() {
        const fakePayments: PaymentCreate[] = Array.from({ length: 5 }, (_) => ({
            date: faker.date.between({ from: '2024-01-01', to: '2024-12-31' }).toISOString().split('T')[0],
            category: faker.helpers.arrayElement(['Food', 'Rent', 'Transport', 'Health', 'Education', 'Entertainment', 'Others', 'Salary', 'Investment', 'Gift']),
            amount: parseFloat(faker.finance.amount({ min: 1, max: 1000, dec: 2 })),
            status: faker.helpers.arrayElement(['Pending', 'Paid']),
            description: faker.lorem.words({ min: 3, max: 6 })
        }));

        createPayments(fakePayments);
        handlePayments();
    }

    async function clearData(): Promise<void> {
        removeAllPayments();
        handlePayments();
    }

    useEffect(() => {
        handlePayments();
    }, []);

    return (
        <PaymentsContext.Provider value={{ payments, periods, categories, createFakeData, clearData }}>
            {children}
        </PaymentsContext.Provider>
    );
}

export const usePaymentsContext = () => useContext(PaymentsContext);