import { Tooltip, XAxis, Area, ResponsiveContainer, CartesianGrid, BarChart, Bar } from 'recharts'
import { format } from 'date-fns'
import CustomTooltip from './CustomTooltip'

interface BarVariantProps {
    data: {
        date: string
        income: number
        expenses: number
    }[]
}

export default function BarVariant({ data }: BarVariantProps) {
    return (
        <ResponsiveContainer width={'100%'} height={350}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray={'3 3'}></CartesianGrid>
                <XAxis axisLine={false} tickLine={false}
                    dataKey={'date'} tickFormatter={(value) => format(value, 'dd MMM')}
                    style={{ fontSize: "12px" }} tickMargin={16}></XAxis>
                <Tooltip content={<CustomTooltip></CustomTooltip>}></Tooltip>
                <Bar dataKey={'income'} fill='#3d82f6' className='drop-shadow-sm'></Bar>
                <Bar dataKey={'expenses'} fill='#f435fe' className='drop-shadow-sm'></Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}