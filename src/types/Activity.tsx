export type FinancialActivity = {
    id: string;
    description: string;
    category: string;
    transactions: FinancialTransaction[];
};

export type FinancialTransaction = {
    id: string;
    date: string;
    amount: number;
    paid: boolean;
    description: string;
};

export type FinancialTransactionCreate = Omit<FinancialTransaction, 'id'>;

export type FinancialActivityCreate = {
    description: string;
    category: string;
    transactions: FinancialTransactionCreate[];
}
