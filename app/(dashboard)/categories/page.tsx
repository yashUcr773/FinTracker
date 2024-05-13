"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewCategory } from "@/hooks/categories/store/useNewCategories";
import useGetCategories from "@/hooks/categories/api/useGetCategories";
import { useBulkDeleteCategories } from "@/hooks/categories/api/useBulkDeleteCategories";

export default function CategoriesPage() {

    const newCategory = useNewCategory()
    const categoriesQuery = useGetCategories()
    const deleteCategories = useBulkDeleteCategories()
    const categories = categoriesQuery.data || []

    const isDisabled = categoriesQuery.isLoading || deleteCategories.isPending;

    if (categoriesQuery.isLoading) {
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

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Categories Page
                    </CardTitle>
                    <Button size={'sm'} onClick={() => { newCategory.onOpen() }}>
                        <Plus className="size-4 mr-2"></Plus>Add New
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable disabled={isDisabled}
                        onDelete={(rows) => {
                            const ids = rows.map((row) => row.original.id)
                            deleteCategories.mutate({ ids })
                        }}
                        columns={columns} data={categories} filterKey="name" />
                </CardContent>
            </Card>
        </div>
    )
}