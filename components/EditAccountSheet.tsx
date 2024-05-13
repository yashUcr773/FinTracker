import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet";
import Accountform from "./AccountForm";
import { insertAccountsSchema } from "@/db/schema"
import { z } from "zod"
import { useOpenAccount } from "@/hooks/store/useOpenAccount";
import useGetAccount from "@/hooks/api/accounts/useGetAccount";
import { Loader2 } from "lucide-react";
import { useEditAccount } from "@/hooks/api/accounts/useEditAccount";
import { useDeleteAccount } from "@/hooks/api/accounts/useDeleteAccount";
import { useConfirm } from "@/hooks/useConfirm";

const formSchema = insertAccountsSchema.pick({
    name: true
})

type FormValues = z.input<typeof formSchema>

export default function EditAccountSheet() {

    const { id, isOpen, onClose } = useOpenAccount()

    const [ConfirmDialog, confirm] = useConfirm('Are you Sure?', 'You are about to delete this Account.')

    const accountQuery = useGetAccount(id)
    const editMutation = useEditAccount(id)
    const deleteMutation = useDeleteAccount(id)

    const isPending = editMutation.isPending || deleteMutation.isPending
    const isLoading = accountQuery.isLoading

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

    const defaultValues = accountQuery.data ? { name: accountQuery.data.name } : { name: "" }

    return (
        <>
            <ConfirmDialog></ConfirmDialog>
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="space-y-4">
                    <SheetHeader>
                        <SheetTitle>Edit Account</SheetTitle>
                        <SheetDescription>Edit an existing account.</SheetDescription>
                    </SheetHeader>
                    {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="size-8 text-muted-foreground animate-spin"></Loader2>
                        </div>
                    ) : (
                        <Accountform id={id} onSubmit={onSubmit} disabled={isPending} defaultValues={defaultValues} onDelete={onDelete}></Accountform>
                    )}
                </SheetContent>
            </Sheet>
        </>
    )
}