import { Payment, PaymentCreate, PaymentsFilter } from "../types/Payment";

const getAllPayments = (): Payment[] => {
    try {
        const paymentsStore = localStorage.getItem('payments');
        if (!paymentsStore)
            throw new Error('No payments found');
        return JSON.parse(paymentsStore);
    } catch {
        return [];
    }
}

const savePayments = (payments: Payment[]) => {
    localStorage.setItem('payments', JSON.stringify(payments));
}

export const getPayments = async (filter?: PaymentsFilter): Promise<Payment[]> => {
    const payments = getAllPayments();

    if (!filter) {
        return payments
    }

    const filteredPayments = payments.filter(payment => {
        if (filter.category && payment.category !== filter.category) {
            return false;
        }
        return payment.date >= filter.startDate.toISOString() && payment.date <= filter.endDate.toISOString();
    });

    return filteredPayments;
}

export const createPayments = (createPayments: PaymentCreate[]) => {
    const payments = getAllPayments();

    createPayments.forEach(createPayment => {
        const payment: Payment = {
            id: new Date().getTime().toString(),
            date: createPayment.date,
            amount: createPayment.amount,
            status: createPayment.status,
            description: createPayment.description,
            category: createPayment.category
        };

        payments.push(payment);
    });

    savePayments(payments);
}

export const removeAllPayments = () => {
    localStorage.removeItem('payments');
}