import { Tooltip, XAxis, AreaChart, Area, ResponsiveContainer, CartesianGrid } from 'recharts'
import { format } from 'date-fns'
import CustomTooltip from './CustomTooltip'

interface AreaVariantProps {
    data: {
        date: string
        income: number
        expenses: number
    }[]
}

export default function AreaVariant({ data }: AreaVariantProps) {
    return (
        <ResponsiveContainer width={'100%'} height={350}>
            <AreaChart data={data}>
                <CartesianGrid strokeDasharray={'3 3'}></CartesianGrid>
                <defs>
                    <linearGradient id='income' x1={'0'} y1={'0'} x2={'0'} y2={'1'}>
                        <stop offset={'2%'} stopColor='#3d82f6' stopOpacity={0.8}></stop>
                        <stop offset={'98%'} stopColor='#3d82f6' stopOpacity={1}></stop>
                    </linearGradient>

                    <linearGradient id='expenses' x1={'0'} y1={'0'} x2={'0'} y2={'1'}>
                        <stop offset={'2%'} stopColor='#f435fe' stopOpacity={0.8}></stop>
                        <stop offset={'98%'} stopColor='#f435fe' stopOpacity={1}></stop>
                    </linearGradient>
                </defs>
                <XAxis axisLine={false} tickLine={false}
                    dataKey={'date'} tickFormatter={(value) => format(value, 'dd MMM')}
                    style={{ fontSize: "12px" }} tickMargin={16}></XAxis>

                <Tooltip content={<CustomTooltip></CustomTooltip>}></Tooltip>
                <Area type={'monotone'} dataKey={'income'}
                    stackId={'income'} strokeWidth={2}
                    stroke='#3d82f6' fill='url(#income)' className='drop-shadow-sm'></Area>

                <Area type={'monotone'} dataKey={'expenses'}
                    stackId={'expenses'} strokeWidth={2}
                    stroke='#expenses' fill='url(#expenses)' className='drop-shadow-sm'></Area>
            </AreaChart>
        </ResponsiveContainer>
    )
}