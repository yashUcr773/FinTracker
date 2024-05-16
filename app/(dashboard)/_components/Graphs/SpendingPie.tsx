import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileSearch, Loader2, PieChart, Radar, Target } from "lucide-react"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PieVariant from "./Variants/PieVariant"
import RadarVariant from "./Variants/RadarVariant"
import RadialVariant from "./Variants/RadialVariant"
import { Skeleton } from "@/components/ui/skeleton"

interface SpendingPieProps {
    data?: {
        name: string,
        value: number,
    }[]
}

enum CHART_VARIANT {
    PIE = "Pie", RADAR = "Radar", RADIAL = "Radial"
}

export default function SpendingPie({ data = [] }: SpendingPieProps) {

    const [chartType, setChartType] = useState<CHART_VARIANT>(CHART_VARIANT.PIE)

    const onTypeChange = (type: CHART_VARIANT) => {
        setChartType(type)
    }

    return (
        <Card className="border-none drop-shadow-sm">
            <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
                <CardTitle className="text-xl line-clamp-1">
                    Categories
                </CardTitle>

                <Select defaultValue={chartType} onValueChange={onTypeChange}>
                    <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
                        <SelectValue placeholder="Chart Type"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={CHART_VARIANT.PIE}>
                            <div className="flex items-center">
                                <PieChart className="mr-2 size-4 shrink-0"></PieChart>
                                <p className="line-clamp-1">Pie Chart</p>
                            </div>
                        </SelectItem>

                        <SelectItem value={CHART_VARIANT.RADAR}>
                            <div className="flex items-center">
                                <Radar className="mr-2 size-4 shrink-0"></Radar>
                                <p className="line-clamp-1">Radar Chart</p>
                            </div>
                        </SelectItem>

                        <SelectItem value={CHART_VARIANT.RADIAL}>
                            <div className="flex items-center">
                                <Target className="mr-2 size-4 shrink-0"></Target>
                                <p className="line-clamp-1">Radial Chart</p>
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
                        {chartType === CHART_VARIANT.PIE && <PieVariant data={data!}></PieVariant>}
                        {chartType === CHART_VARIANT.RADAR && <RadarVariant data={data!}></RadarVariant>}
                        {chartType === CHART_VARIANT.RADIAL && <RadialVariant data={data!}></RadialVariant>}
                    </>
                )}
            </CardContent>
        </Card>
    )
}

export function SpendingPieLoader() {
    return (
        <Card className="border-none drop-shadow-sm">
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