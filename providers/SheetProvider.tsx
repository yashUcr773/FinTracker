"use client"

import EditAccountSheet from "@/components/EditAccountSheet"
import NewAccountSheet from "@/components/NewAccountSheet"
import { useEffect, useState } from "react"

export default function SheetProvider() {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <>
            <NewAccountSheet></NewAccountSheet>
            <EditAccountSheet></EditAccountSheet>
        </>
    )
}