import { Link } from 'react-router-dom'
import './App.css'
import { getFilterURL, getTotalValue } from './utils/PaymentUtils';
import { usePaymentsContext } from './contexts/PaymentsContext';

function App() {
  const { payments, periods, categories } = usePaymentsContext();

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
