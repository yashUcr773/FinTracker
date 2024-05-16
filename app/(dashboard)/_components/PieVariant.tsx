import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { formatPercentage } from "@/lib/utils";
import CategoryTooltip from "./CategoryTooltip";

const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"]

interface PieVariantProps {
    data?: {
        name: string,
        value: number,
    }[]
}

export default function PieVariant({ data }: PieVariantProps) {

    return (
        <ResponsiveContainer width={'100%'} height={350}>
            <PieChart>
                <Legend layout="horizontal" verticalAlign="bottom"
                    align="right" iconType="circle"
                    content={({ payload }: any) => {
                        return (
                            <ul className="flex flex-col space-y-2">
                                {payload.map((_entry: any, index: number) => (
                                    <li key={`item-${index}`} className="flex items-center space-x-2">
                                        <span className="size-2 rounded-full" style={{ backgroundColor: _entry.color }}></span>
                                        <div className="space-x-1">
                                            <span className="text-sm text-muted-foreground">{_entry.value}</span>
                                            <span className="text-sm">{formatPercentage(_entry.payload.percent * 100)}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )
                    }}></Legend>
                <Tooltip content={<CategoryTooltip></CategoryTooltip>}></Tooltip>
                <Pie data={data} cx="50%" cy="50%"
                    outerRadius={90} innerRadius={60}
                    paddingAngle={2} fill="#8884d8" dataKey={"value"} labelLine={false}>
                    {data?.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}></Cell>
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}