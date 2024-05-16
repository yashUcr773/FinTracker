"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewTransaction } from "@/hooks/transactions/store/useNewTransaction";
import useGetTransactions from "@/hooks/transactions/api/useGetTransactions";
import { useBulkDeleteTransactions } from "@/hooks/transactions/api/useBulkDeleteTransactions";
import { useState } from "react";
import UploadButton from "./UploadButton";
import ImportCard from "./ImportCard";
import { transactions as transactionsSchema } from '@/db/schema'
import { useSelectAccount } from "@/hooks/useSelectAccount";
import { toast } from "sonner";
import { useBulkCreateTransactions } from "@/hooks/transactions/api/useBulkCreateTransactions";

enum VARIANTS {
    LIST = "LIST",
    IMPORT = "IMPORT"
}

const INITIAL_IMPORT_RESULTS = {
    data: [],
    errors: [],
    meta: {}
}


export default function TransactionsPage() {

    const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST)
    const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);
    const [AcocuntDialog, confirm] = useSelectAccount()

    const newTransaction = useNewTransaction()
    const bulkCreateTransactions = useBulkCreateTransactions()
    const transactionsQuery = useGetTransactions()
    const deleteTransactions = useBulkDeleteTransactions()
    const transactions = transactionsQuery.data || []

    const isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending;

    const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
        setImportResults(results)
        setVariant(VARIANTS.IMPORT)
    }

    const onCancelImport = () => {
        setImportResults(INITIAL_IMPORT_RESULTS)
        setVariant(VARIANTS.LIST)
    }

    const onSubmitImport = async (values: typeof transactionsSchema.$inferInsert[]) => {
        const accountId = await confirm();
        if (!accountId) {
            return toast.error('Please select an account to continue.')
        }

        const data = values.map((value) => ({
            ...value,
            accountId: accountId as string
        }))

        bulkCreateTransactions.mutate(data, {
            onSuccess: (data, variables, context) => {
                onCancelImport();
            },
        })


    }

    if (transactionsQuery.isLoading) {
        return (
            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
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

    if (variant === VARIANTS.IMPORT) {
        return (
            <>
                <AcocuntDialog></AcocuntDialog>
                <ImportCard data={importResults.data} onCancel={onCancelImport} onSubmit={onSubmitImport}></ImportCard>
            </>
        )
    }

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Transactions Page
                    </CardTitle>
                    <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
                        <Button className={"w-full lg:w-auto"} size={'sm'} onClick={() => { newTransaction.onOpen() }}>
                            <Plus className="size-4 mr-2"></Plus>Add New
                        </Button>
                        <UploadButton onUpload={onUpload}></UploadButton>
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable disabled={isDisabled}
                        onDelete={(rows) => {
                            const ids = rows.map((row) => row.original.id)
                            deleteTransactions.mutate({ ids })
                        }}
                        columns={columns} data={transactions} filterKey="payee" />
                </CardContent>
            </Card>
        </div>
    )
}