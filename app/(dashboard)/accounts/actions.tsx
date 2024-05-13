"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useDeleteAccount } from "@/hooks/api/accounts/useDeleteAccount"
import { useOpenAccount } from "@/hooks/store/useOpenAccount"
import { useConfirm } from "@/hooks/useConfirm"
import { Edit, MoreHorizontal, Trash } from "lucide-react"


interface ActionProps {
    id: string
}

export default function Actions({ id }: ActionProps) {

    const deleteMutation = useDeleteAccount(id)
    const [ConfirmDialog, confirm] = useConfirm('Are you sure?', 'You are about the delete this account.')

    const { onOpen } = useOpenAccount()


    const handleDelete = async () => {
        const ok = await confirm()

        if (ok) {
            deleteMutation.mutate()
        }
    }

    return (
        <>
            <ConfirmDialog></ConfirmDialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} className="size-8 p-0">
                        <MoreHorizontal className="size-4"></MoreHorizontal>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem disabled={deleteMutation.isPending} onClick={() => { onOpen(id) }}>
                        <Edit className="size-4 mr-2"></Edit> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled={deleteMutation.isPending} onClick={handleDelete}>
                        <Trash className="size-4 mr-2"></Trash> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}