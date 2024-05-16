import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts'

interface RadarVariantProps {
    data?: {
        name: string,
        value: number,
    }[]
}

export default function RadarVariant({ data }: RadarVariantProps) {
    return (
        <ResponsiveContainer width={'100%'} height={350}>
            <RadarChart cx={'50%'} cy={'50%'} outerRadius={'60%'} data={data}>
                <PolarGrid></PolarGrid>
                <PolarAngleAxis style={{ fontSize: '12px' }} dataKey={'name'}></PolarAngleAxis>
                <PolarRadiusAxis style={{ fontSize: '12px' }}></PolarRadiusAxis>
                <Radar dataKey={'value'} stroke='#3b82f6' fill='#3b82f6' fillOpacity={0.6}></Radar>
            </RadarChart>
        </ResponsiveContainer>
    )
}