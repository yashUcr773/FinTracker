"use client"

import EditAccountSheet from "@/components/accounts/EditAccountSheet"
import NewAccountSheet from "@/components/accounts/NewAccountSheet"
import EditCategorySheet from "@/components/categories/EditCategorySheet"
import NewCategorySheet from "@/components/categories/NewCategorySheet"
import { useEffect, useState } from "react"

export default function SheetProvider() {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <>
            <NewCategorySheet></NewCategorySheet>
            <EditCategorySheet></EditCategorySheet>
            <NewAccountSheet></NewAccountSheet>
            <EditAccountSheet></EditAccountSheet>
        </>
    )
}