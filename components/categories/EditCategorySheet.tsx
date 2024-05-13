import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import { z } from "zod"
import { Loader2 } from "lucide-react";
import { useConfirm } from "@/hooks/useConfirm";
import { insertCategoriesSchema } from "@/db/schema";
import { useOpenCategory } from "@/hooks/categories/store/useOpenCategory";
import useGetCategory from "@/hooks/categories/api/useGetCategory";
import { useEditCategory } from "@/hooks/categories/api/useEditCategory";
import { useDeleteCategory } from "@/hooks/categories/api/useDeleteCategory";
import Categoryform from "./CategoryForm";

const formSchema = insertCategoriesSchema.pick({
    name: true
})

type FormValues = z.input<typeof formSchema>

export default function EditCategorySheet() {

    const { id, isOpen, onClose } = useOpenCategory()

    const [ConfirmDialog, confirm] = useConfirm('Are you Sure?', 'You are about to delete this Category.')

    const categoryQuery = useGetCategory(id)
    const editMutation = useEditCategory(id)
    const deleteMutation = useDeleteCategory(id)

    const isPending = editMutation.isPending || deleteMutation.isPending
    const isLoading = categoryQuery.isLoading

    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    const onDelete = async () => {
        const ok = await confirm()
        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose()
                }
            })

        }
    }

    const defaultValues = categoryQuery.data ? { name: categoryQuery.data.name } : { name: "" }

    return (
        <>
            <ConfirmDialog></ConfirmDialog>
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="space-y-4">
                    <SheetHeader>
                        <SheetTitle>Edit Category</SheetTitle>
                        <SheetDescription>Edit an existing category.</SheetDescription>
                    </SheetHeader>
                    {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="size-8 text-muted-foreground animate-spin"></Loader2>
                        </div>
                    ) : (
                        <Categoryform id={id} onSubmit={onSubmit} disabled={isPending} defaultValues={defaultValues} onDelete={onDelete}></Categoryform>
                    )}
                </SheetContent>
            </Sheet>
        </>
    )
}