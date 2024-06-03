import fs from "fs/promises";
import type { Payment, PaymentsList } from "~/types/Payment";

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

export async function getSummaries(): Promise<string[][]> {
    const payments = await getPayments();

    let result: string[][] = [];

    let categories = [...new Set(payments.map(payment => payment.category))];
    var monthsOfYear = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    result.push(['#', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);

    for (let i = 0; i < categories.length; i++) {

        let totals: string[] = [];

        totals.push(categories[i]);

        for (let j = 0; j < monthsOfYear.length; j++) {
            let totalAmount = 0;

            var paymentsOfCategoryAndMonth = payments.filter(payment => payment.category === categories[i] && new Date(payment.date).getMonth() + 1 === monthsOfYear[j]);

            for (let k = 0; k < paymentsOfCategoryAndMonth.length; k++) {
                totalAmount += paymentsOfCategoryAndMonth[k].amount;
            }

            totals.push(totalAmount.toString());
        }

        result.push(totals);
    }

    return result;
}