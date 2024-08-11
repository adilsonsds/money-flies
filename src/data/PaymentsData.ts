import { Payment, PaymentCreate, PaymentsFilter } from "../types/Payment";

const LOCALSTORAGE_NAME = 'payments';

const getAllPayments = (): Payment[] => {
    try {
        const paymentsStore = localStorage.getItem(LOCALSTORAGE_NAME);
        if (!paymentsStore)
            throw new Error('No payments found');
        return JSON.parse(paymentsStore);
    } catch {
        return [];
    }
}

const savePayments = (payments: Payment[]) => {
    localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(payments));
}

export const getPayments = async (filter?: PaymentsFilter): Promise<Payment[]> => {
    const payments = getAllPayments();

    if (!filter) {
        return payments
    }

    const filteredPayments = payments.filter(payment => (
        (!filter.category || payment.category === filter.category) &&
        (!filter.startDate || payment.date >= filter.startDate.toISOString()) &&
        (!filter.endDate || payment.date <= filter.endDate.toISOString())
    ));

    filteredPayments.sort((a, b) => {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
    });

    return filteredPayments;
}

export const getPaymentById = (id: string): Payment | null => {
    const payments = getAllPayments();
    return payments.find(payment => payment.id === id) || null;
}

export const createPayments = (createPayments: PaymentCreate[]) => {
    const payments = getAllPayments();
    let newId = payments.length;

    createPayments.forEach(createPayment => {
        const payment: Payment = {
            id: (++newId).toString(),
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

export const updatePayment = (payment: Payment) => {
    const payments = getAllPayments();
    const index = payments.findIndex(p => p.id === payment.id);
    if (index === -1) return;

    payments[index] = payment;
    savePayments(payments);
}

export const deletePayment = (payment: Payment) => {
    const payments = getAllPayments();
    const index = payments.findIndex(p => p.id === payment.id);
    if (index === -1) return;

    payments.splice(index, 1);
    savePayments(payments);
}

export const removeAllPayments = () => {
    localStorage.removeItem(LOCALSTORAGE_NAME);
}