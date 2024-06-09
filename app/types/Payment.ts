export type Payment = {
    id: string;
    date: string;
    amount: number;
    status: string;
    description: string;
    category: string;
    method: string;
};

export type PaymentsList = Payment[];

export type PaymentsFilter = {
    startDate: Date;
    endDate: Date;
    category?: string;
};