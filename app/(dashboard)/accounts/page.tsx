"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewAccount } from "@/hooks/accounts/store/useNewAccounts";
import { Loader2, Plus } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import { columns } from "./columns";
import useGetAccounts from "@/hooks/accounts/api/useGetAccounts";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteAccounts } from "@/hooks/accounts/api/useBulkDeleteAccounts";

export default function AccountsPage() {

    const newAccount = useNewAccount()
    const accountsQuery = useGetAccounts()
    const deleteAccounts = useBulkDeleteAccounts()
    const accounts = accountsQuery.data || []

    const isDisabled = accountsQuery.isLoading || deleteAccounts.isPending;

    if (accountsQuery.isLoading) {
        return (
            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-xl shadow-xl">
                    <CardHeader >
                        <Skeleton className="h-8 w-48"></Skeleton>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[500px] w-full items-center justify-center flex">
                            <Loader2 className="size-8 text-slate-300 animate-spin"></Loader2>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-xl shadow-xl">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Accounts Page
                    </CardTitle>
                    <Button size={'sm'} onClick={() => { newAccount.onOpen() }}>
                        <Plus className="size-4 mr-2"></Plus>Add New
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable disabled={isDisabled}
                        onDelete={(rows) => {
                            const ids = rows.map((row) => row.original.id)
                            deleteAccounts.mutate({ ids })
                        }}
                        columns={columns} data={accounts} filterKey="name" />
                </CardContent>
            </Card>
        </div>
    )
}