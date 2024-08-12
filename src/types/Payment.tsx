export type Payment = {
    id: string;
    date: string;
    amount: number;
    paid: boolean;
    description: string;
    category: string;
};

export type PaymentCreate = Omit<Payment, 'id'>;

export type PaymentsList = Payment[];

export type PaymentsFilter = {
    startDate?: Date | null;
    endDate?: Date | null;
    category?: string | null;
};