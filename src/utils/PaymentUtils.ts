import type { Payment, PaymentsFilter, PaymentsList } from "../types/Payment";

export function getFilteredPayments(payments: PaymentsList, filter: PaymentsFilter): PaymentsList {
    return payments.filter(payment =>
        new Date(payment.date) >= new Date(filter.startDate) &&
        new Date(payment.date) <= new Date(filter.endDate) &&
        (!filter.category || payment.category === filter.category)
    );
}

export function getTotalValue(payments: PaymentsList, filter: PaymentsFilter): number {
    return getFilteredPayments(payments, filter).reduce((acc, payment) => acc + payment.amount, 0);
}

export function getFilterURL({ startDate, endDate, category }: PaymentsFilter): string {
    return category && category.length > 0
        ? `startDate=${startDate.toISOString().split('T')[0]}&endDate=${endDate.toISOString().split('T')[0]}&category=${category}`
        : `startDate=${startDate.toISOString().split('T')[0]}&endDate=${endDate.toISOString().split('T')[0]}`;
}

export function getFilterUrlFromPayment(payment: Payment): string {
    const paymentDate = new Date(payment.date);
    const firstDayOfMonth = new Date(paymentDate.getFullYear(), paymentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(paymentDate.getFullYear(), paymentDate.getMonth() + 1, 0);
    return `startDate=${firstDayOfMonth.toISOString().split('T')[0]}&endDate=${lastDayOfMonth.toISOString().split('T')[0]}&category=${payment.category}`;
}