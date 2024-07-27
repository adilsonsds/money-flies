import { createContext, useContext, useEffect, useState } from "react";
import { Payment } from "../types/Payment";
import { getPayments } from "../data/PaymentsData";

type Period = {
    startDate: Date;
    endDate: Date;
}

type PaymentContextType = {
    payments: Payment[];
    periods: Period[];
    categories: string[];
};

const PaymentsContext = createContext<PaymentContextType>({
    payments: [],
    periods: [],
    categories: []
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

    useEffect(() => {
        handlePayments();
    }, []);

    return (
        <PaymentsContext.Provider value={{ payments, periods, categories }}>
            {children}
        </PaymentsContext.Provider>
    );
}

export const usePaymentsContext = () => useContext(PaymentsContext);