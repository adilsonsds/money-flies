import { Category, FinancialTransactionCreate } from "../types/Activity";

type TransactionsTableProps = {
    transactions: FinancialTransactionCreate[];
    categoriesOptions: Category[];
    onChange: (index: number, key: string, value: string | number | boolean) => void;
}

export const TransactionsTable = ({ transactions, categoriesOptions, onChange }: TransactionsTableProps) => {
    return (
        <div className="overflow-x-auto">
            <div className="grid grid-cols-7 gap-px bg-gray-400">
                <div className="p-2 bg-gray-200 font-bold">#</div>
                <div className="p-2 bg-gray-200 font-bold">Date</div>
                <div className="p-2 bg-gray-200 font-bold">Category</div>
                <div className="p-2 bg-gray-200 font-bold">Amount</div>
                <div className="p-2 bg-gray-200 font-bold">Paid</div>
                <div className="p-2 bg-gray-200 font-bold">Description</div>
                <div className="p-2 bg-gray-200 font-bold">#</div>
                {transactions.map((transaction, index) => (
                    <TableRow
                        key={index}
                        index={index}
                        transaction={transaction}
                        onChange={onChange}
                        categoriesOptions={categoriesOptions}
                    />
                ))}
            </div>
        </div>
    );
}

type TableRowProps = {
    index: number;
    transaction: FinancialTransactionCreate;
    onChange: (index: number, key: string, value: string | number | boolean) => void;
    categoriesOptions: Category[];
}

export const TableRow = ({ index, transaction, onChange, categoriesOptions }: TableRowProps) => {
    return (
        <>
            <div className="p-2 bg-white">{index + 1}</div>
            <div className="p-2 bg-white">
                <input
                    type="date"
                    name={`transactions[${index}].date`}
                    className="w-36 border rounded px-3 py-1"
                    value={transaction.date}
                    onChange={event => onChange(index, 'date', event.target.value)}
                />
            </div>
            <div className="p-2 bg-white">
                <select
                    name={`transactions[${index}].category`}
                    className="w-36 border rounded px-3 py-1"
                    value={transaction.category}
                    onChange={event => onChange(index, 'category', event.target.value)}
                >
                    <option value="">Select category</option>
                    {categoriesOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
            <div className="p-2 bg-white">
                <input
                    type="number"
                    name={`transactions[${index}].amount`}
                    className="w-24 border rounded px-3 py-1"
                    value={transaction.amount}
                    onChange={event => onChange(index, 'amount', parseFloat(event.target.value))}
                />
            </div>
            <div className="p-2 bg-white">
                <input
                    type="checkbox"
                    name={`transactions[${index}].paid`}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    checked={transaction.paid}
                    onChange={event => onChange(index, 'paid', event.target.checked)}
                />
            </div>
            <div className="p-2 bg-white">
                <input
                    type="text"
                    name={`transactions[${index}].description`}
                    className="w-60 border rounded px-3 py-1"
                    value={transaction.description}
                    onChange={event => onChange(index, 'description', event.target.value)}
                />
            </div>
            <div className="p-2 bg-white">
                <button className="text-red-600 hover:text-red-800">Remove</button>
            </div>
        </>
    );
}
