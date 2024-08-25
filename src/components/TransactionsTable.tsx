import { useEffect, useState } from "react";
import { Category, TransactionItemList } from "../types/Activity";
import { getAllCategories } from "../data/ActivitiesData";
import { Link } from "react-router-dom";

type TransactionsTableProps = {
    transactions: TransactionItemList[];
    onChange?: (index: number, key: string, value: string | number | boolean) => void;
    enableEdit: boolean;
    onDelete?: (index: number) => void;
}

export const TransactionsTable = ({ transactions, onChange, enableEdit, onDelete }: TransactionsTableProps) => {
    const [categoriesOptions, setCategoriesOptions] = useState<Category[]>([]);

    useEffect(() => {
        if (!enableEdit) return;
        const categories = getAllCategories();
        setCategoriesOptions(categories.map(category => ({
            value: category,
            label: category
        })));
    }, []);

    return (
        <div className="overflow-x-auto">
            <div className="grid grid-cols-12 gap-px bg-gray-400">
                <div className="col-span-1 p-2 bg-gray-200 font-bold text-center">#</div>
                <div className="col-span-2 p-2 bg-gray-200 font-bold text-center">Date</div>
                <div className="col-span-2 p-2 bg-gray-200 font-bold text-center">Category</div>
                <div className="col-span-2 p-2 bg-gray-200 font-bold text-center">Amount</div>
                <div className="col-span-1 p-2 bg-gray-200 font-bold text-center">Paid</div>
                <div className="col-span-3 p-2 bg-gray-200 font-bold text-center">Description</div>
                <div className="col-span-1 p-2 bg-gray-200 font-bold text-center">#</div>
                {transactions.map((transaction, index) => (
                    <TableRow
                        key={index}
                        index={index}
                        transaction={transaction}
                        onChange={onChange}
                        categoriesOptions={categoriesOptions}
                        enableEdit={enableEdit}
                        financialActivityId={transaction.financialActivityId}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
}

type TableRowProps = {
    index: number;
    transaction: TransactionItemList;
    onChange?: (index: number, key: string, value: string | number | boolean) => void;
    categoriesOptions: Category[];
    enableEdit: boolean;
    financialActivityId?: string;
    onDelete?: (index: number) => void;
}

export const TableRow = ({ index, transaction, onChange, categoriesOptions, enableEdit, financialActivityId, onDelete }: TableRowProps) => {
    const [isNewCategory, setIsNewCategory] = useState(false);

    if (!enableEdit) {
        return (
            <>
                <div className="col-span-1 p-2 bg-white text-center">{index + 1}</div>
                <div className="col-span-2 p-2 bg-white text-center">{transaction.date.toLocaleDateString()}</div>
                <div className="col-span-2 p-2 bg-white text-center">{transaction.category}</div>
                <div className="col-span-2 p-2 bg-white text-center">{transaction.amount}</div>
                <div className="col-span-1 p-2 bg-white text-center">{transaction.paid ? 'Yes' : 'No'}</div>
                <div className="col-span-3 p-2 bg-white text-center">{transaction.description}</div>
                <div className="col-span-1 p-2 bg-white text-center">
                    <Link to={`/activities/edit/${financialActivityId}`} className="text-blue-500 dark:text-blue-300 hover:underline">View</Link>
                </div>
            </>
        )
    }
    return (
        <>
            <div className="col-span-1 p-2 bg-white text-center">{index + 1}</div>
            <div className="col-span-2 p-2 bg-white text-center">
                <input
                    type="date"
                    name={`transactions[${index}].date`}
                    className="w-36 border rounded px-3 py-1"
                    value={transaction.date.toLocaleDateString('en-CA')}
                    onChange={event => onChange?.(index, 'date', event.target.value)}
                />
            </div>
            <div className="col-span-2 p-2 bg-white text-center">
                {
                    isNewCategory ? (
                        <>
                            <input
                                type="text"
                                name={`transactions[${index}].category`}
                                className="w-36 border rounded px-3 py-1"
                                value={transaction.category}
                                onChange={event => onChange?.(index, 'category', event.target.value)}
                            />
                            <button
                                type="button"
                                className="text-blue-500 hover:text-blue-800"
                                onClick={() => setIsNewCategory(false)}
                            >
                                Cancel
                            </button>
                        </>
                    )
                        : (
                            <>
                                <select
                                    name={`transactions[${index}].category`}
                                    className="w-36 border rounded px-3 py-1"
                                    value={transaction.category}
                                    onChange={event => onChange?.(index, 'category', event.target.value)}
                                >
                                    <option value="">Select category</option>
                                    {categoriesOptions.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    className="text-blue-500 hover:text-blue-800 ml-3"
                                    onClick={() => setIsNewCategory(true)}
                                >
                                    +
                                </button>
                            </>
                        )
                }
            </div>
            <div className="col-span-2 p-2 bg-white text-center">
                <input
                    type="number"
                    name={`transactions[${index}].amount`}
                    className="w-24 border rounded px-3 py-1"
                    value={transaction.amount}
                    onChange={event => onChange?.(index, 'amount', parseFloat(event.target.value))}
                />
            </div>
            <div className="col-span-1 p-2 bg-white text-center">
                <input
                    type="checkbox"
                    name={`transactions[${index}].paid`}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    checked={transaction.paid}
                    onChange={event => onChange?.(index, 'paid', event.target.checked)}
                />
            </div>
            <div className="col-span-3 p-2 bg-white text-center">
                <input
                    type="text"
                    name={`transactions[${index}].description`}
                    className="w-60 border rounded px-3 py-1"
                    value={transaction.description}
                    onChange={event => onChange?.(index, 'description', event.target.value)}
                />
            </div>
            <div className="col-span-1 p-2 bg-white text-center">
                <button
                    type="button"
                    className="text-blue-500 hover:text-blue-800"
                    onClick={() => onDelete?.(index)}
                >
                    Delete
                </button>
            </div>
        </>
    );
}
