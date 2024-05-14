
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalenderIcon } from "lucide-react"
import { SelectSingleEventHandler } from "react-day-picker"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

interface DatePickerProps {
    value?: Date,
    onChange?: SelectSingleEventHandler
    disabled?: boolean
}

export default function DatePicker({ disabled, onChange, value }: DatePickerProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button disabled={disabled} variant={'outline'} className={cn('w-full justify-start text-left font-normal', !value && 'text-muted-foreground')}>
                    <CalenderIcon className="size-4 mr-2"></CalenderIcon>
                    {value ? format(value, 'PPP') : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar mode="single" selected={value} onSelect={onChange} disabled={disabled} initialFocus></Calendar>
            </PopoverContent>
        </Popover>
    )
}