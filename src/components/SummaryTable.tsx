import { Link } from "react-router-dom";
import { Period, TransactionItemList } from "../types/Activity";
import { getFilterURL, getTotalValue } from "../utils/TransactionUtils";
import { ReactNode } from "react";

export const SummaryTable = ({ children }: { children: ReactNode }) => {
    return (
        <div className="grid grid-cols-16 gap-px bg-gray-400">
            {children}
        </div>
    )
}

type SummaryTableHeaderProps = {
    periods: Period[];
}

export const SummaryTableHeader = ({ periods }: SummaryTableHeaderProps) => {
    return (
        <>
            <div className="col-span-2 p-2 bg-white">Category</div>
            {periods.map((period, index) => (
                <div key={index} className="p-2 bg-white text-center">
                    {period.startDate.toLocaleString('pt-BR', { month: 'short' })} {period.startDate.toLocaleString('default', { year: "2-digit" })}
                </div>
            ))}
            <div className="col-span-1 p-2 bg-white text-center">Total</div>
            <div className="col-span-1 p-2 bg-white text-center">Average</div>
        </>
    )
}

type SummaryTableCategoryProps = {
    category: string;
    periods: Period[];
    transactions: TransactionItemList[];
}

export const SummaryTableCategory = ({ category, periods, transactions }: SummaryTableCategoryProps) => {
    return (
        <>
            <div className="col-span-2 p-2 bg-white">{category}</div>
            {periods.map((period, index) => {
                const totalValue = getTotalValue(transactions, { startDate: period.startDate, endDate: period.endDate, category: category });
                return (
                    <div key={index} className="col-span-1 p-2 bg-white text-right">
                        <Link to={`/transactions/list?${getFilterURL({ startDate: period.startDate, endDate: period.endDate, category })}`} className="dark:text-blue-300">
                            {totalValue.toFixed(2)}
                        </Link>
                    </div>
                );
            })}
            <div className='col-span-1 p-2 bg-white text-right'>
                <Link to={`/transactions/list?${getFilterURL({ category })}`} className="dark:text-blue-300">
                    {getTotalValue(transactions, { category }).toFixed(2)}
                </Link>
            </div>
            <div className='col-span-1 p-2 bg-white text-right'>
                <Link to={`/transactions/list?${getFilterURL({ category })}`} className="dark:text-blue-300">
                    {(getTotalValue(transactions, { category }) / periods.length).toFixed(2)}
                </Link>
            </div>
        </>
    )
}

type SummaryTableTotalProps = {
    periods: Period[];
    transactions: TransactionItemList[];
}

export const SummaryTableTotal = ({ periods, transactions }: SummaryTableTotalProps) => {
    return (
        <>
            <div className='col-span-2 p-2 bg-white'>Total</div>
            {periods.map((period, index) => {
                const totalValue = getTotalValue(transactions, { startDate: period.startDate, endDate: period.endDate });
                return (
                    <div key={index} className="col-span-1 p-2 bg-white text-right">
                        <Link to={`/transactions/list?${getFilterURL({ startDate: period.startDate, endDate: period.endDate })}`} className="dark:text-blue-300">
                            {totalValue.toFixed(2)}
                        </Link>
                    </div>
                );
            })}
            <div className="col-span-1 p-2 bg-white text-right">-</div>
            <div className="col-span-1 p-2 bg-white text-right">-</div>
        </>
    )
}
