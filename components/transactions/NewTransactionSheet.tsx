import { insertTransactionsSchema } from "@/db/schema";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import { z } from "zod"
import { useNewTransaction } from "@/hooks/transactions/store/useNewTransaction";
import { useCreateTransaction } from "@/hooks/transactions/api/useCreateTransaction";
import TransactionForm from "./TransactionForm";
import { useCreateCategory } from "@/hooks/categories/api/useCreateCategory";
import useGetCategories from "@/hooks/categories/api/useGetCategories";
import { useCreateAccount } from "@/hooks/accounts/api/useCreateAccount";
import useGetAccounts from "@/hooks/accounts/api/useGetAccounts";
import { Loader2 } from "lucide-react";

const formSchema = insertTransactionsSchema.omit({
    id: true
})

type FormValues = z.input<typeof formSchema>

export default function NewTransactionSheet() {

    const { isOpen, onClose } = useNewTransaction()

    const createMutation = useCreateTransaction()

    const categoryQuery = useGetCategories()
    const categoryMutation = useCreateCategory()
    const onCreateCategory = (name: string) => categoryMutation.mutate({ name })
    const categoryOptions = (categoryQuery.data ?? []).map((category) => ({ label: category.name, value: category.id }))


    const accountQuery = useGetAccounts()
    const accountMutation = useCreateAccount()
    const onCreateAccount = (name: string) => accountMutation.mutate({ name })
    const accountOptions = (accountQuery.data ?? []).map((account) => ({ label: account.name, value: account.id }))


    const isPending = createMutation.isPending || categoryMutation.isPending || accountMutation.isPending
    const isLoading = categoryQuery.isLoading || accountQuery.isLoading

    const onSubmit = (values: FormValues) => {
        createMutation.mutate(values, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>New Transaction</SheetTitle>
                    <SheetDescription>Create a new transaction to track your transactions.</SheetDescription>
                </SheetHeader>
                {
                    isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="size-8 animate-spin text-muted-foreground"></Loader2>
                        </div>
                    ) : (
                        <TransactionForm onSubmit={onSubmit}
                            disabled={isPending}
                            categoryOptions={categoryOptions}
                            onCreateCategory={onCreateCategory}
                            accountOptions={accountOptions}
                            onCreateAccount={onCreateAccount}></TransactionForm>
                    )
                }

            </SheetContent>
        </Sheet>
    )
}