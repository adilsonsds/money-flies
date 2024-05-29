export type Payment = {
    id: number;
    date: string;
    amount: number;
    type: string;
    description: string;
    status: string;
    tags: Array<string>;
};