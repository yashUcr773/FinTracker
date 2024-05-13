import { useNewAccount } from "@/hooks/store/useNewAccounts";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet";
import Accountform from "./AccountForm";
import { insertAccountsSchema } from "@/db/schema"
import { z } from "zod"
import { useCreateAccount } from "@/hooks/api/accounts/useCreateAccount";

const formSchema = insertAccountsSchema.pick({
    name: true
})

type FormValues = z.input<typeof formSchema>

export default function NewAccountSheet() {

    const { isOpen, onClose } = useNewAccount()

    const mutation = useCreateAccount()

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
                    <SheetTitle>New Account</SheetTitle>
                    <SheetDescription>Create a new account to track your transactions.</SheetDescription>
                </SheetHeader>
                <Accountform onSubmit={onSubmit} disabled={mutation.isPending}></Accountform>
            </SheetContent>
        </Sheet>
    )
}