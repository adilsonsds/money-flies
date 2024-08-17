import { Link } from 'react-router-dom'
import './App.css'
import { getFilterURL, getTotalValue } from './utils/TransactionUtils';
import { useEffect, useState } from 'react';
import { Payment, PaymentCreate } from './types/Payment';
import { createPayments, getPayments, removeAllPayments } from './data/PaymentsData';
import { faker } from '@faker-js/faker';

type Period = {
  startDate: Date;
  endDate: Date;
}

function MetricsColumns({ totalValue, periodsCount, urlParams }: { totalValue: number; periodsCount: number; urlParams: string }) {
  return (
    <>
      <td className="p-2 text-right dark:text-white">
        <Link to={`/payments/list?${urlParams}`} className="dark:text-blue-300">
          {totalValue.toFixed(2)}
        </Link>
      </td>
      <td className="p-2 text-right dark:text-white">
        <Link to={`/payments/list?${urlParams}`} className="dark:text-blue-300">
          {(totalValue / periodsCount).toFixed(2)}
        </Link>
      </td>
    </>
  )
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
      paid: faker.datatype.boolean(),
      description: faker.lorem.words({ min: 1, max: 4 })
    }));

    createPayments(fakePayments);
    handlePayments();
  }

  async function clearData(): Promise<void> {
    removeAllPayments();
    handlePayments();
  }

  function exportDataToCSV() {
    const csv = `Date,Category,Amount,Paid,Description\n` + payments.map(payment => {
      return `${payment.date},${payment.category},${payment.amount},${payment.paid},${payment.description}`;
    }).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'payments.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function readDataFromCSV() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', '.csv');
    input.addEventListener('change', async () => {
      const file = input.files?.item(0);
      if (file) {
        const text = await file.text();
        const lines = text.split('\n');
        const payments = lines.slice(1).map(line => {
          const [date, category, amount, paid, description] = line.split(',');
          return {
            date,
            category,
            amount: parseFloat(amount),
            paid: paid.toLowerCase() === 'true',
            description
          };
        });
        removeAllPayments();
        createPayments(payments);
        handlePayments();
      }
    });
    input.click();
  }

  useEffect(() => {
    handlePayments();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold p-4">Summary</h1>
      <div className="overflow-x-auto">

        <table className="min-w-full bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 dark:bg-gray-500">
            <tr>
              <th className="w-36 p-4 text-center dark:text-white">#</th>
              {periods.map((period, index) => (
                <th key={index} className="w-72 p-4 text-center dark:text-white">
                  {period.startDate.toLocaleString('pt-BR', { month: 'short' })} {period.startDate.toLocaleString('default', { year: "2-digit" })}
                </th>
              ))}
              <th className="w-36 p-4 text-center dark:text-white">Total</th>
              <th className="w-36 p-4 text-center dark:text-white">Average</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index} className="border-b hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600">
                <td className="p-2 text-left dark:text-white">{category}</td>
                {periods.map((period, index) => {
                  const totalValue = getTotalValue(payments, { startDate: period.startDate, endDate: period.endDate, category: category });
                  return (
                    <td key={index} className="p-2 text-right dark:text-white">
                      <Link to={`/transactions/list?${getFilterURL({ startDate: period.startDate, endDate: period.endDate, category })}`} className="dark:text-blue-300">
                        {totalValue.toFixed(2)}
                      </Link>
                    </td>
                  );
                })}
                <MetricsColumns
                  totalValue={getTotalValue(payments, { category })}
                  periodsCount={periods.length}
                  urlParams={getFilterURL({ category })}
                />
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="p-2 text-left dark:text-white">Total</td>
              {periods.map((period, index) => {
                const totalValue = getTotalValue(payments, { startDate: period.startDate, endDate: period.endDate });
                return (
                  <td key={index} className="p-2 text-right dark:text-white">
                    <Link to={`/transactions/list?${getFilterURL({ startDate: period.startDate, endDate: period.endDate })}`} className="dark:text-blue-300">
                      {totalValue.toFixed(2)}
                    </Link>
                  </td>
                );
              })}
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <button className="mt-20 text-blue-500" onClick={readDataFromCSV}>
        Import data from CSV
      </button>
      <button className="mt-20 ml-4 text-blue-500" onClick={exportDataToCSV}>
        Export data to CSV
      </button>
      <button className="mt-20 ml-4 text-blue-500" onClick={createFakeData}>
        Add fake payments to test
      </button>
      <button className="mt-20 ml-4 text-red-500" onClick={clearData}>
        Clear all data
      </button>
    </div>
  );
}

export default App
