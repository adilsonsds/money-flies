import type { SummaryTable } from "~/types/Summary";

type SummaryListType = {
    sumaries: SummaryTable;
};

export default function SummaryList({ sumaries }: SummaryListType) {
    return (
        <table className="mt-2">
            {sumaries.map((row, indexRow) => (
                <tr key={indexRow}>
                    {row.map((col, indexCol) => (
                        <td key={indexCol} className="border px-4 py-2">{col}</td>
                    ))}
                </tr>
            ))}
        </table>
    )
}