import { Link } from 'react-router-dom'
import './App.css'
import { getFilterURL, getTotalValue } from './utils/PaymentUtils';
import { useEffect, useState } from 'react';
import { Payment, PaymentCreate } from './types/Payment';
import { createPayments, getPayments, removeAllPayments } from './data/PaymentsData';
import { faker } from '@faker-js/faker';

type Period = {
  startDate: Date;
  endDate: Date;
}

function App() {
  const [periods, setPeriods] = useState<Period[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  async function handlePayments() {
    const payments = await getPayments();
    const year = new Date().getFullYear();
    const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    const periods: Period[] = months.map(month => {
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);
      return { startDate, endDate };
    });

    setPayments(payments);
    setPeriods(periods);
    setCategories([...new Set(payments.map(summary => summary.category))]);
  }

  async function createFakeData() {
    const fakePayments: PaymentCreate[] = Array.from({ length: 5 }, (_) => ({
      date: faker.date.between({ from: '2024-01-01', to: '2024-12-31' }).toISOString().split('T')[0],
      category: faker.helpers.arrayElement(['Food', 'Rent', 'Transport', 'Health', 'Education', 'Entertainment', 'Others', 'Salary', 'Investment', 'Gift']),
      amount: parseFloat(faker.finance.amount({ min: 1, max: 1000, dec: 2 })),
      status: faker.helpers.arrayElement(['paid', 'unpaid']),
      description: faker.lorem.words({ min: 3, max: 6 })
    }));

    createPayments(fakePayments);
    handlePayments();
  }

  async function clearData(): Promise<void> {
    removeAllPayments();
    handlePayments();
  }
  
  useEffect(() => {
    handlePayments();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold p-4">Summary</h1>
      <table className="mt-2 w-full">
        <thead>
          <tr>
            <th className="text-left">#</th>
            {periods.map((period, index) => (
              <th key={index} className="text-right w-72">
                {period.startDate.toLocaleString('pt-BR', { month: 'short' })} {period.startDate.toLocaleString('default', { year: "2-digit" })}
              </th>
            ))}
            <th className="text-right w-72">Total</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index}>
              <td className="text-left">{category}</td>
              {periods.map((period, index) => {
                const totalValue = getTotalValue(payments, { startDate: period.startDate, endDate: period.endDate, category: category });
                return (
                  <td key={index} className="text-right">
                    <Link to={`/payments/list?${getFilterURL({ startDate: period.startDate, endDate: period.endDate, category })}`} className="text-blue-500">
                      {totalValue.toFixed(2)}
                    </Link>
                  </td>
                );
              })}
              <td className="text-right">
                <Link to={`/payments/list?${getFilterURL({ category })}`} className="text-blue-500">
                  {getTotalValue(payments, { category }).toFixed(2)}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
        <tbody>
          <tr>
            <td className="text-left">Total</td>
            {periods.map((period, index) => {
              const totalValue = getTotalValue(payments, { startDate: period.startDate, endDate: period.endDate });
              return (
                <td key={index} className="text-right">
                  <Link to={`/payments/list?${getFilterURL({ startDate: period.startDate, endDate: period.endDate })}`} className="text-blue-500">
                    {totalValue.toFixed(2)}
                  </Link>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>

      <button className="mt-20 text-blue-500" onClick={createFakeData}>
        Add fake payments to test
      </button>
      <button className="mt-20 ml-4 text-red-500" onClick={clearData}>
        Clear all data
      </button>
    </div>
  );
}

export default App
