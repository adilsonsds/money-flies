import { Link } from 'react-router-dom'
import './App.css'
import { Payment } from './types/Payment';
import { getFilterURL, getTotalValue } from './utils/PaymentUtils';
import { Payments } from './data/PaymentsData';

type Period = {
  startDate: Date;
  endDate: Date;
}

function App() {
  let payments: Payment[] = Payments;

  const year = new Date().getFullYear();
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const periods: Period[] = months.map(month => {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    return { startDate, endDate };
  });

  const categories = [...new Set(payments.map(summary => summary.category))];

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
                      {totalValue}
                    </Link>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
        <tbody>
          <tr>
            <td>Total</td>
            {periods.map((period, index) => {
              const totalValue = getTotalValue(payments, { startDate: period.startDate, endDate: period.endDate });
              return (
                <td key={index} className="text-right">
                  <Link to={`/payments/list?${getFilterURL({ startDate: period.startDate, endDate: period.endDate })}`} className="text-blue-500">
                    {totalValue}
                  </Link>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App
