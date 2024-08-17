import './App.css'
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import { createActivities, getTransactions, removeAllActivities } from './data/ActivitiesData';
import { FinancialActivityCreate, Period, TransactionItemList } from './types/Activity';
import { SummaryTable, SummaryTableCategory, SummaryTableHeader, SummaryTableTotal } from './components/SummaryTable';

function App() {
  const [periods, setPeriods] = useState<Period[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [transactions, setTransactions] = useState<TransactionItemList[]>([]);

  function handleTransactions() {
    const transactions = getTransactions();
    const year = new Date().getFullYear();
    const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    const periods: Period[] = months.map(month => {
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);
      return { startDate, endDate };
    });

    setTransactions(transactions);
    setPeriods(periods);
    setCategories([...new Set(transactions.map(transaction => transaction.category))]);
  }

  function createFakeData() {

    const fakeActivities: FinancialActivityCreate[] = Array.from({ length: 5 }, (_) => ({
      title: faker.lorem.words({ min: 1, max: 4 }),
      transactions: Array.from({ length: 5 }, (_) => ({
        date: faker.date.between({ from: '2024-01-01', to: '2024-12-31' }).toISOString().split('T')[0],
        category: faker.helpers.arrayElement(['Food', 'Rent', 'Transport', 'Health', 'Education', 'Entertainment', 'Others', 'Salary', 'Investment', 'Gift']),
        amount: parseFloat(faker.finance.amount({ min: 1, max: 1000, dec: 2 })),
        paid: faker.datatype.boolean(),
        description: faker.lorem.words({ min: 1, max: 4 })
      }))
    }));

    createActivities(fakeActivities);
    handleTransactions();
  }

  async function clearData(): Promise<void> {
    removeAllActivities();
    handleTransactions();
  }

  function exportDataToJSON() {
    // const csv = `Date,Category,Amount,Paid,Description\n` + payments.map(payment => {
    //   return `${payment.date},${payment.category},${payment.amount},${payment.paid},${payment.description}`;
    // }).join('\n');

    // const blob = new Blob([csv], { type: 'text/csv' });
    // const url = window.URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.setAttribute('hidden', '');
    // a.setAttribute('href', url);
    // a.setAttribute('download', 'payments.csv');
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
  }

  function readDataFromJSON() {
    // const input = document.createElement('input');
    // input.setAttribute('type', 'file');
    // input.setAttribute('accept', '.csv');
    // input.addEventListener('change', async () => {
    //   const file = input.files?.item(0);
    //   if (file) {
    //     const text = await file.text();
    //     const lines = text.split('\n');
    //     const payments = lines.slice(1).map(line => {
    //       const [date, category, amount, paid, description] = line.split(',');
    //       return {
    //         date,
    //         category,
    //         amount: parseFloat(amount),
    //         paid: paid.toLowerCase() === 'true',
    //         description
    //       };
    //     });
    //     removeAllPayments();
    //     createPayments(payments);
    //     // handlePayments();
    //   }
    // });
    // input.click();
  }

  useEffect(() => {
    handleTransactions();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold py-4">Summary</h1>
      <div className="overflow-x-auto">
        <SummaryTable>
          <SummaryTableHeader
            periods={periods}
          />
          {categories.map((category, index) => (
            <SummaryTableCategory
              key={index}
              category={category}
              periods={periods}
              transactions={transactions}
            />
          ))}
          <SummaryTableTotal
            periods={periods}
            transactions={transactions}
          />
        </SummaryTable>
      </div>
      <button className="mt-20 text-blue-500" onClick={readDataFromJSON}>
        Import data from JSON
      </button>
      <button className="mt-20 ml-4 text-blue-500" onClick={exportDataToJSON}>
        Export data to JSON
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
