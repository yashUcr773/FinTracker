import { cn } from "@/lib/utils"
import { Info, MinusCircle, PlusCircle } from "lucide-react"
import CurrencyInput from "react-currency-input-field"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "./ui/tooltip"

interface AmountInputProps {
    value: string,
    onChange: (value: string | undefined) => void
    placeholder?: string,
    disabled?: boolean
}

export default function AmountInput({ onChange, value, disabled, placeholder }: AmountInputProps) {

    const parsedValue = parseFloat(value)
    const isIncome = parsedValue > 0
    const isExpense = parsedValue < 0

    const onReversedValue = () => {
        if (!value) return;
        onChange((parseFloat(value) * -1).toString())
    }

    return (
        <div className="relative">
            <TooltipProvider>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <button type="button" onClick={onReversedValue}
                            className={cn('bg-slate-400 hover:bg-slate-500 absolute top-1.5 left-1.5 rounded-md p-1.5 flex items-center justify-center transition', isIncome && 'bg-emerald-500 hover:bg-emerald-600', isExpense && 'bg-rose-500 hover:bg-rose-600')}>
                            {!parsedValue && <Info className="size-4 text-white"></Info>}
                            {isIncome && <PlusCircle className="size-4 text-white"></PlusCircle>}
                            {isExpense && <MinusCircle className="size-4 text-white"></MinusCircle>}
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        Use [+] for income and [-] for expenses.
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <CurrencyInput prefix="$"
                className="pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder={placeholder}
                value={value}
                decimalsLimit={2}
                decimalScale={2}
                onValueChange={onChange}
                disabled={disabled}
            ></CurrencyInput>
            <p className="text-xs text-muted-foreground mt-2">
                {isIncome && 'This will count as income.'}
                {isExpense && 'This will count as expense.'}
            </p>
        </div>
    )
}