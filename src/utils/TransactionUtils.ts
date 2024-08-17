import { TransactionsFilter } from "../types/Activity";
import type { PaymentsFilter, PaymentsList } from "../types/Payment";

export function getFilteredPayments(payments: PaymentsList, filter: PaymentsFilter): PaymentsList {
    return payments.filter(payment =>
        (!filter.startDate || new Date(payment.date) >= new Date(filter.startDate)) &&
        (!filter.endDate || new Date(payment.date) <= new Date(filter.endDate)) &&
        (!filter.category || payment.category === filter.category)
    );
}

export function getTotalValue(payments: PaymentsList, filter: PaymentsFilter): number {
    return getFilteredPayments(payments, filter).reduce((acc, payment) => acc + payment.amount, 0);
}

export function getFilterURL({ startDate, endDate, category }: PaymentsFilter): string {
    var queryParams = new URLSearchParams();

    if (startDate) queryParams.set('startDate', startDate.toISOString().split('T')[0]);
    if (endDate) queryParams.set('endDate', endDate.toISOString().split('T')[0]);
    if (category) queryParams.set('category', category);

    return queryParams.toString();
}

export function getFilterObjectFromUrl(search: string): TransactionsFilter {
    const queryParams = new URLSearchParams(search);
    const startDate = queryParams.get('startDate');
    const endDate = queryParams.get('endDate');
    const category = queryParams.get('category');
    console.log(queryParams.toString())
    return {
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        category: category || null
    };
}