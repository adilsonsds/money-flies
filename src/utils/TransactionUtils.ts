import { TransactionItemList, TransactionsFilter } from "../types/Activity";

export function getFilteredTransactions(transactions: TransactionItemList[], filter: TransactionsFilter): TransactionItemList[] {
    return transactions.filter(transaction =>
        (!filter.startDate || new Date(transaction.date) >= new Date(filter.startDate)) &&
        (!filter.endDate || new Date(transaction.date) <= new Date(filter.endDate)) &&
        (!filter.category || transaction.category === filter.category)
    );
}

export function getTotalValue(transactions: TransactionItemList[], filter: TransactionsFilter): number {
    return getFilteredTransactions(transactions, filter).reduce((acc, transaction) => acc + transaction.amount, 0);
}

export function getFilterURL({ startDate, endDate, category }: TransactionsFilter): string {
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

export function toDate(date: string) {
    const [year, month, day] = date.split('-').map(Number);
    return new Date(year, month - 1, day);
}