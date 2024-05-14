"use client"

import EditAccountSheet from "@/components/accounts/EditAccountSheet"
import NewAccountSheet from "@/components/accounts/NewAccountSheet"
import EditCategorySheet from "@/components/categories/EditCategorySheet"
import NewCategorySheet from "@/components/categories/NewCategorySheet"
import EditTransactionSheet from "@/components/transactions/EditTransactionSheet"
import NewTransactionSheet from "@/components/transactions/NewTransactionSheet"
import { useEffect, useState } from "react"

export default function SheetProvider() {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <>
            <EditTransactionSheet></EditTransactionSheet>
            <NewTransactionSheet></NewTransactionSheet>
            <NewCategorySheet></NewCategorySheet>
            <EditCategorySheet></EditCategorySheet>
            <NewAccountSheet></NewAccountSheet>
            <EditAccountSheet></EditAccountSheet>
        </>
    )
}