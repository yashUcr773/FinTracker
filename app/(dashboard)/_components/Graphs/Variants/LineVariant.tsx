import { Tooltip, XAxis, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts'
import { format } from 'date-fns'
import CustomTooltip from './CustomTooltip'

interface LineVariantProps {
    data: {
        date: string
        income: number
        expenses: number
    }[]
}

export default function LineVariant({ data }: LineVariantProps) {
    return (
        <ResponsiveContainer width={'100%'} height={350}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray={'3 3'}></CartesianGrid>
                <XAxis axisLine={false} tickLine={false}
                    dataKey={'date'} tickFormatter={(value) => format(value, 'dd MMM')}
                    style={{ fontSize: "12px" }} tickMargin={16}></XAxis>
                <Tooltip content={<CustomTooltip></CustomTooltip>}></Tooltip>
                <Line dot={false} dataKey={'income'} stroke='#3d82f6' strokeWidth={2} className='drop-shadow-sm'></Line>
                <Line dot={false} dataKey={'expenses'} stroke='#f435fe' strokeWidth={2} className='drop-shadow-sm'></Line>
            </LineChart>
        </ResponsiveContainer>
    )
}