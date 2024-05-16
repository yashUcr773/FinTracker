import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRef, useState } from "react";
import useGetAccounts from "./accounts/api/useGetAccounts";
import { useCreateAccount } from "./accounts/api/useCreateAccount";
import Select from "@/components/Select";

export const useSelectAccount = (): [() => JSX.Element, () => Promise<unknown>] => {

    const [promise, setPromise] = useState<{ resolve: (value: string | undefined) => void } | null>(null);

    const accountQuery = useGetAccounts();
    const accountMutation = useCreateAccount()
    const onCreateAccount = (name: string) => accountMutation.mutate({
        name
    })
    const accountOptions = (accountQuery.data ?? []).map((account) => ({
        label: account.name,
        value: account.id
    }))

    const selectValue = useRef<string>();

    const confirm = () => new Promise((resolve, reject) => {
        setPromise({ resolve });
    })

    const handleClose = () => {
        setPromise(null)
    }

    const handleConfirm = () => {
        promise?.resolve(selectValue.current)
        handleClose()
    }

    const handleCancel = () => {
        promise?.resolve(undefined)
        handleClose()
    }

    const ConfirmationDialog = () => {
        return (
            <Dialog open={promise !== null} onOpenChange={handleCancel}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Select Account</DialogTitle>
                        <DialogDescription>Please Select an account to continue.</DialogDescription>
                    </DialogHeader>
                    <Select placeholder="Select an account" options={accountOptions}
                        onCreate={onCreateAccount}
                        onChange={(value) => selectValue.current = value}
                        disabled={accountQuery.isLoading || accountMutation.isPending}></Select>
                    <DialogFooter className="pt-2">
                        <Button onClick={handleCancel} variant={"outline"}>Cancel</Button>
                        <Button onClick={handleConfirm} >Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }

    return [ConfirmationDialog, confirm]

}