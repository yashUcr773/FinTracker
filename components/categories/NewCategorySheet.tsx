import { insertCategoriesSchema } from "@/db/schema";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import { z } from "zod"
import { useNewCategory } from "@/hooks/categories/store/useNewCategories";
import { useCreateCategory } from "@/hooks/categories/api/useCreateCategory";
import Categoryform from "./CategoryForm";

const formSchema = insertCategoriesSchema.pick({
    name: true
})

type FormValues = z.input<typeof formSchema>

export default function NewCategorySheet() {

    const { isOpen, onClose } = useNewCategory()

    const mutation = useCreateCategory()

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>New Category</SheetTitle>
                    <SheetDescription>Create a new category to track your transactions.</SheetDescription>
                </SheetHeader>
                <Categoryform onSubmit={onSubmit} disabled={mutation.isPending}></Categoryform>
            </SheetContent>
        </Sheet>
    )
}