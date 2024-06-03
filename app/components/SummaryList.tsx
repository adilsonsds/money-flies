import type { SummaryList } from "~/types/Summary";

type SummaryListType = {
    sumaries: SummaryList;
};

export default function SummaryList({ sumaries }: SummaryListType) {

    const header = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const categories = [...new Set(sumaries.map(summary => summary.category))];

    return (
        <table className="mt-2">
            <thead>
                <tr>
                    <th>#</th>
                    {months.map((col, index) => (
                        <th key={index} className="border px-4 py-2">
                            {header[col]}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {categories.map((category, index) => (
                    <tr key={index}>
                        <td className="border px-4 py-2">{category}</td>
                        {months.map((month, index) => {
                            const summary = sumaries.find(summary => summary.category === category && new Date(summary.startDate).getMonth() === month);
                            return (
                                <td key={index} className="border px-4 py-2">
                                    {summary ? summary.amount : 0}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}