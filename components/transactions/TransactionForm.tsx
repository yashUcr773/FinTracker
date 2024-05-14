import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Trash } from "lucide-react"
import { insertTransactionsSchema } from "@/db/schema"
import Select from "../Select"
import DatePicker from "../DatePicker"
import { Textarea } from "../ui/textarea"
import AmountInput from "../AmountInput"
import { convertAmountToMiliunits } from "@/lib/utils"

const formSchema = z.object({
    date: z.coerce.date(),
    accountId: z.string(),
    categoryId: z.string().nullable().optional(),
    payee: z.string(),
    amount: z.string(),
    notes: z.string().nullable().optional()
})

const apiSchema = insertTransactionsSchema.omit({ id: true })

type FormValues = z.input<typeof formSchema>
type ApiFormValues = z.input<typeof apiSchema>

interface TransactionFormProps {
    id?: string
    defaultValues?: FormValues,
    onSubmit: (values: ApiFormValues) => void
    onDelete?: () => void
    disabled?: boolean
    accountOptions: { label: string, value: string }[]
    categoryOptions: { label: string, value: string }[]
    onCreateAccount: (name: string) => void
    onCreateCategory: (name: string) => void
}

export default function TransactionForm({ onDelete, onSubmit, defaultValues, disabled, id, accountOptions, categoryOptions, onCreateAccount, onCreateCategory }: TransactionFormProps) {

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues
    })

    const handleSubmit = (values: FormValues) => {
        const amountInMiliunits = convertAmountToMiliunits(parseFloat(values.amount))
        onSubmit({ ...values, amount: amountInMiliunits })
    }

    const handleDelete = () => {
        onDelete && onDelete()
    }

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">

                <FormField name='date' control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <DatePicker value={field.value} onChange={field.onChange} disabled={disabled}></DatePicker>
                        </FormControl>
                    </FormItem>
                )}></FormField>

                <FormField name='accountId' control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Account
                        </FormLabel>
                        <Select placeholder="Select Account" options={accountOptions} onCreate={onCreateAccount} value={field.value} onChange={field.onChange} disabled={disabled}></Select>
                    </FormItem>
                )}></FormField>

                <FormField name='categoryId' control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Category
                        </FormLabel>
                        <Select placeholder="Select Category" options={categoryOptions} onCreate={onCreateCategory} value={field.value} onChange={field.onChange} disabled={disabled}></Select>
                    </FormItem>
                )}></FormField>

                <FormField name='payee' control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Payee
                        </FormLabel>
                        <Input disabled={disabled} placeholder="Add a payee" {...field}></Input>
                    </FormItem>
                )}></FormField>

                <FormField name='amount' control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Amount
                        </FormLabel>
                        <AmountInput {...field} placeholder="0.00" disabled={disabled}></AmountInput>
                    </FormItem>
                )}></FormField>

                <FormField name='notes' control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Notes
                        </FormLabel>
                        <Textarea {...field} value={field.value ?? ""} disabled={disabled} placeholder="Optional notes" ></Textarea>
                    </FormItem>
                )}></FormField>

                <Button className='w-full' disabled={disabled}>
                    {id ? "Save Changes" : "Create Transaction"}
                </Button>

                {!!id && (
                    <Button type="button" disabled={disabled} onClick={handleDelete} className="w-full" variant={"outline"}>
                        <Trash className="size-4 mr-2"></Trash>
                        Delete Transaction
                    </Button>
                )}

            </form>
        </Form>
    )
}