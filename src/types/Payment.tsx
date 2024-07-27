export type Payment = {
    id: string;
    date: string;
    amount: number;
    status: string;
    description: string;
    category: string;
};

export type PaymentCreate = Omit<Payment, 'id'>;

export type PaymentsList = Payment[];

export type PaymentsFilter = {
    startDate: Date;
    endDate: Date;
    category?: string | null;
};