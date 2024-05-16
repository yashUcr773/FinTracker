import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import TableHeadSelect from "./TableHeadSelect"

interface ImportTableProps {
    header: string[]
    body: string[][]
    selectedColumns: Record<string, string | null>
    onTableHeadSelectChange: (columsIndex: number, value: string | null) => void
}


export default function ImportTable({ body, header, onTableHeadSelectChange, selectedColumns }: ImportTableProps) {

    return (
        <div className="rounded-md border overflow-hidden">
            <Table>
                <TableHeader className="bg-muted">
                    <TableRow>
                        {header.map((_item, index) => (
                            <TableHead key={index}>
                                <TableHeadSelect columnIndex={index} selectedColumns={selectedColumns} onChange={onTableHeadSelectChange}></TableHeadSelect>
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {body.map((row, index) => (
                        <TableRow key={index}>
                            {row.map((cell, index) => (
                                <TableCell key={index}>{cell}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )

}