import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Trash } from "lucide-react"
import { insertCategoriesSchema } from "@/db/schema"

const formSchema = insertCategoriesSchema.pick({
    name: true
})

type FormValues = z.input<typeof formSchema>

interface CategoryFormProps {
    id?: string
    defaultValues?: FormValues,
    onSubmit: (values: FormValues) => void
    onDelete?: () => void
    disabled?: boolean
}

export default function Categoryform({ onDelete, onSubmit, defaultValues, disabled, id }: CategoryFormProps) {

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues
    })

    const handleSubmit = (values: FormValues) => {
        onSubmit(values)
    }

    const handleDelete = () => {
        onDelete && onDelete()
    }

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
                <FormField name='name' control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Name
                        </FormLabel>
                        <FormControl>
                            <Input disabled={disabled} placeholder='eg. Food, Travel, etc.' {...field} ></Input>
                        </FormControl>
                    </FormItem>
                )}></FormField>

                <Button className='w-full' disabled={disabled}>
                    {id ? "Save Changes" : "Create Category"}
                </Button>

                {!!id && (
                    <Button type="button" disabled={disabled} onClick={handleDelete} className="w-full" variant={"outline"}>
                        <Trash className="size-4 mr-2"></Trash>
                        Delete Category
                    </Button>
                )}

            </form>
        </Form>
    )
}