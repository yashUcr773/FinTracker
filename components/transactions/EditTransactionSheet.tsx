import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import { z } from "zod"
import { Loader2 } from "lucide-react";
import { useConfirm } from "@/hooks/useConfirm";
import { insertTransactionsSchema } from "@/db/schema";
import TransactionForm from "./TransactionForm";
import { useOpenTransaction } from "@/hooks/transactions/store/useOpenTransaction";
import useGetTransaction from "@/hooks/transactions/api/useGetTransaction";
import { useEditTransaction } from "@/hooks/transactions/api/useEditTransaction";
import { useDeleteTransaction } from "@/hooks/transactions/api/useDeleteTransaction";
import useGetCategories from "@/hooks/categories/api/useGetCategories";
import { useCreateCategory } from "@/hooks/categories/api/useCreateCategory";
import useGetAccounts from "@/hooks/accounts/api/useGetAccounts";
import { useCreateAccount } from "@/hooks/accounts/api/useCreateAccount";

const formSchema = insertTransactionsSchema.omit({
    id: true
})

type FormValues = z.input<typeof formSchema>

export default function EditTransactionSheet() {

    const { id, isOpen, onClose } = useOpenTransaction()

    const [ConfirmDialog, confirm] = useConfirm('Are you Sure?', 'You are about to delete this Transaction.')

    const transactionQuery = useGetTransaction(id)
    const editMutation = useEditTransaction(id)
    const deleteMutation = useDeleteTransaction(id)

    const categoryQuery = useGetCategories()
    const categoryMutation = useCreateCategory()
    const onCreateCategory = (name: string) => categoryMutation.mutate({ name })
    const categoryOptions = (categoryQuery.data ?? []).map((category) => ({ label: category.name, value: category.id }))


    const accountQuery = useGetAccounts()
    const accountMutation = useCreateAccount()
    const onCreateAccount = (name: string) => accountMutation.mutate({ name })
    const accountOptions = (accountQuery.data ?? []).map((account) => ({ label: account.name, value: account.id }))

    const isPending = editMutation.isPending || deleteMutation.isPending || categoryMutation.isPending || accountMutation.isPending || transactionQuery.isLoading
    const isLoading = transactionQuery.isLoading || categoryQuery.isLoading || accountQuery.isLoading

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

    const defaultValues = transactionQuery.data ? {
        accountId: transactionQuery.data.accountId,
        categoryId: transactionQuery.data.categoryId,
        amount: transactionQuery.data.amount.toString(),
        date: transactionQuery.data.date ? new Date(transactionQuery.data.date) : new Date(),
        payee: transactionQuery.data.payee,
        notes: transactionQuery.data.notes
    } : {
        accountId: "",
        categoryId: "",
        amount: "",
        date: new Date(),
        payee: "",
        notes: ""
    }

    return (
        <>
            <ConfirmDialog></ConfirmDialog>
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="space-y-4">
                    <SheetHeader>
                        <SheetTitle>Edit Transaction</SheetTitle>
                        <SheetDescription>Edit an existing transaction.</SheetDescription>
                    </SheetHeader>
                    {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="size-8 text-muted-foreground animate-spin"></Loader2>
                        </div>
                    ) : (
                        <TransactionForm id={id} onSubmit={onSubmit} disabled={isPending}
                            defaultValues={defaultValues} onDelete={onDelete}
                            accountOptions={accountOptions} categoryOptions={categoryOptions}
                            onCreateAccount={onCreateAccount} onCreateCategory={onCreateCategory}></TransactionForm>
                    )}
                </SheetContent>
            </Sheet>
        </>
    )
}