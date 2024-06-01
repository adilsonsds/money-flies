import fs from "fs/promises";
import { Payment } from "~/types/Payment";

export async function getPayments() : Promise<Payment[]> {
    const rawFileContent = await fs.readFile("payments.json", "utf-8");
    const payments: Array<Payment> = JSON.parse(rawFileContent ?? []);
    return payments;
}

export async function addPayment(payment: Payment) : Promise<void> {
    const payments = await getPayments();
    payment.id = new Date().toISOString();
    payments.push(payment);
    await fs.writeFile("payments.json", JSON.stringify(payments, null, 2));
}