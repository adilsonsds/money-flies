import fs from "fs/promises";
import type { Payment, PaymentsFilter, PaymentsList } from "~/types/Payment";

export async function getPayments(): Promise<PaymentsList> {
    const rawFileContent = await fs.readFile("payments.json", "utf-8");
    const payments: Array<Payment> = JSON.parse(rawFileContent ?? []);
    return payments;
}

export function getFilteredPayments(payments: PaymentsList, filter: PaymentsFilter): PaymentsList {
    return payments.filter(payment =>
        new Date(payment.date) >= new Date(filter.startDate) &&
        new Date(payment.date) <= new Date(filter.endDate) &&
        payment.category === filter.category
    );
}

export function getTotalValue(payments: PaymentsList, filter: PaymentsFilter): number {
    return getFilteredPayments(payments, filter).reduce((acc, payment) => acc + payment.amount, 0);
}

export async function findPaymentById(paymentId: string): Promise<Payment | undefined> {
    const payments = await getPayments();
    return payments.find(payment => payment.id === paymentId);
}

export async function addPayment(payment: Payment): Promise<void> {
    const payments = await getPayments();
    payments.push(payment);
    await fs.writeFile("payments.json", JSON.stringify(payments, null, 2));
}

export function getFilterURL({ startDate, endDate, category }: PaymentsFilter): string {
    return `startDate=${startDate.toISOString().split('T')[0]}&endDate=${endDate.toISOString().split('T')[0]}&category=${category}`;
}