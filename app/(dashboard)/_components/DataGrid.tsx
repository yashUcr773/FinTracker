"use client"

import useGetSummary from "@/hooks/summary/api/useGetSummary"
import { formatDateRange } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import DataCard, { DataCardLoading } from "./DataCard"
import { FaPiggyBank } from 'react-icons/fa'
import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6'

export default function DataGrid() {

    const { data, isLoading } = useGetSummary()
    const params = useSearchParams()
    const to = params.get('to') || undefined
    const from = params.get('from') || undefined

    const dateRangeLabel = formatDateRange({ to, from })

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
                <DataCardLoading></DataCardLoading>
                <DataCardLoading></DataCardLoading>
                <DataCardLoading></DataCardLoading>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
            <DataCard title="Remaining"
                value={data?.remainingAmount}
                percentageChange={data?.remainingChange}
                icon={FaPiggyBank}
                dateRange={dateRangeLabel}></DataCard>

            <DataCard title="Income"
                value={data?.incomeAmount}
                percentageChange={data?.incomeChange}
                icon={FaArrowTrendUp}
                dateRange={dateRangeLabel}></DataCard>

            <DataCard title="Expenses"
                value={data?.expensesAmount}
                percentageChange={data?.expensesChange}
                icon={FaArrowTrendDown}
                dateRange={dateRangeLabel}></DataCard>
        </div >
    )
}