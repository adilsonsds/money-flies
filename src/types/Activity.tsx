export type FinancialActivity = {
    id: string;
    title: string;
    transactions: FinancialTransaction[];
};

export type FinancialTransaction = {
    id: string;
    category: string;
    date: string;
    amount: number;
    paid: boolean;
    description: string;
};

export type FinancialTransactionCreate = Omit<FinancialTransaction, 'id'>;

export type FinancialActivityCreate = {
    title: string;
    transactions: FinancialTransactionCreate[];
}

export type TransactionsResult = {
    transactions: TransactionItemList[];
    total: number;
}

export type TransactionItemList = FinancialTransaction & {
    category: string;
    financialActivityId: string;
}

export type TransactionsFilter = {
    startDate?: Date | null;
    endDate?: Date | null;
    category?: string | null;
}