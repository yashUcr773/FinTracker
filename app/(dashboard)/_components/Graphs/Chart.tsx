import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, BarChart, FileSearch, LineChart, Loader2 } from "lucide-react"
import AreaVariant from "./Variants/AreaVariant"
import BarVariant from "./Variants/BarVariant"
import LineVariant from "./Variants/LineVariant"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

interface ChartProps {
    data?: {
        date: string,
        income: number,
        expenses: number
    }[]
}

enum CHART_VARIANT {
    LINE = "Line", BAR = "Bar", AREA = "Area"
}

export default function Chart({ data = [] }: ChartProps) {

    const [chartType, setChartType] = useState<CHART_VARIANT>(CHART_VARIANT.AREA)

    const onTypeChange = (type: CHART_VARIANT) => {
        setChartType(type)
    }

    return (
        <Card className="border-none drop-shadow-xl shadow-xl">
            <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
                <CardTitle className="text-xl line-clamp-1">
                    Transactions
                </CardTitle>

                <Select defaultValue={chartType} onValueChange={onTypeChange}>
                    <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
                        <SelectValue placeholder="Chart Type"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={CHART_VARIANT.AREA}>
                            <div className="flex items-center">
                                <AreaChart className="mr-2 size-4 shrink-0"></AreaChart>
                                <p className="line-clamp-1">Area Chart</p>
                            </div>
                        </SelectItem>

                        <SelectItem value={CHART_VARIANT.LINE}>
                            <div className="flex items-center">
                                <LineChart className="mr-2 size-4 shrink-0"></LineChart>
                                <p className="line-clamp-1">Line Chart</p>
                            </div>
                        </SelectItem>

                        <SelectItem value={CHART_VARIANT.BAR}>
                            <div className="flex items-center">
                                <BarChart className="mr-2 size-4 shrink-0"></BarChart>
                                <p className="line-clamp-1">Bar Chart</p>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>

            </CardHeader>
            <CardContent>
                {data.length === 0 ? (
                    <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
                        <FileSearch className="size-6 text-muted-foreground"></FileSearch>
                        <p className="text-sm text-muted-foreground">No data for this period.</p>
                    </div>
                ) : (
                    <>
                        {chartType === CHART_VARIANT.AREA && <AreaVariant data={data!}></AreaVariant>}
                        {chartType === CHART_VARIANT.BAR && <BarVariant data={data!}></BarVariant>}
                        {chartType === CHART_VARIANT.LINE && <LineVariant data={data!}></LineVariant>}
                    </>
                )}
            </CardContent>
        </Card>
    )
}

export function ChartLoader() {
    return (
        <Card className="border-none drop-shadow-xl shadow-xl">
            <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
                <Skeleton className="h-8 w-48"></Skeleton>
                <Skeleton className="h-8 w-full lg:w-[120px]"></Skeleton>
            </CardHeader>
            <CardContent>
                <div className="h-[350px] w-full flex items-center justify-center">
                    <Loader2 className="h-6 w-6 text-slate-300 animate-spin"></Loader2>
                </div>
            </CardContent>
        </Card>
    )
}