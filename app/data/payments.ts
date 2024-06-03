import fs from "fs/promises";
import type { Payment, PaymentsList } from "~/types/Payment";
import type { SummaryList } from "~/types/Summary";

export async function getPayments(): Promise<PaymentsList> {
    const rawFileContent = await fs.readFile("payments.json", "utf-8");
    const payments: Array<Payment> = JSON.parse(rawFileContent ?? []);
    return payments;
}

export async function addPayment(payment: Payment): Promise<void> {
    const payments = await getPayments();
    payment.id = new Date().toISOString();
    payments.push(payment);
    await fs.writeFile("payments.json", JSON.stringify(payments, null, 2));
}

export async function findPaymentById(paymentId: string): Promise<Payment | undefined> {
    const payments = await getPayments();
    return payments.find(payment => payment.id === paymentId);
}

export async function getSummaries(): Promise<SummaryList> {
    const payments = await getPayments();
    const categories = [...new Set(payments.map(payment => payment.category))];
    const summaries: SummaryList = [];

    const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    for (var i = 0; i < categories.length; i++) {

        for (var j = 0; j < months.length; j++) {

            let startOfMonth = new Date(new Date().getFullYear(), months[j], 1);
            let endOfMonth = new Date(new Date().getFullYear(), months[j] + 1, 0);

            let paymentsOfCategoryAndMonth = payments.filter(payment => payment.category === categories[i] && new Date(payment.date) >= startOfMonth && new Date(payment.date) <= endOfMonth);

            if (paymentsOfCategoryAndMonth.length === 0) continue;

            let totalAmount = paymentsOfCategoryAndMonth.reduce((acc, payment) => acc + payment.amount, 0);

            summaries.push({ category: categories[i], startDate: startOfMonth, endDate: endOfMonth, amount: totalAmount });
        }
    }

    return summaries;
}