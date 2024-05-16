"use client"

import useGetSummary from "@/hooks/summary/api/useGetSummary"
import Chart, { ChartLoader } from "./Chart"
import SpendingPie, { SpendingPieLoader } from "./SpendingPie"

export default function DataChart() {

    const { data, isLoading } = useGetSummary()

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
                <div className="col-span-1 lg:col-span-3 xl:col-span-4">
                    <ChartLoader></ChartLoader>
                </div>
                <div className="col-span-1 lg:col-span-3 xl:col-span-2">
                    <SpendingPieLoader></SpendingPieLoader>
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            <div className="col-span-1 lg:col-span-3 xl:col-span-4">
                <Chart data={data?.days}></Chart>
            </div>
            <div className="col-span-1 lg:col-span-3 xl:col-span-2">
                <SpendingPie data={data?.categories}></SpendingPie>
            </div>
        </div>
    )
}