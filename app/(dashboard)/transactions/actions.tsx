"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useDeleteTransaction } from "@/hooks/transactions/api/useDeleteTransaction"
import { useOpenTransaction } from "@/hooks/transactions/store/useOpenTransaction"
import { useConfirm } from "@/hooks/useConfirm"
import { Edit, MoreHorizontal, Trash } from "lucide-react"


interface ActionProps {
    id: string
}

export default function Actions({ id }: ActionProps) {

    const deleteMutation = useDeleteTransaction(id)
    const [ConfirmDialog, confirm] = useConfirm('Are you sure?', 'You are about the delete this transaction.')

    const { onOpen } = useOpenTransaction()


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