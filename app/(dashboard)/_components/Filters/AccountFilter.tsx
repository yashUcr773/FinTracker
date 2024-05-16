"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useGetAccounts from "@/hooks/accounts/api/useGetAccounts"
import qs from 'query-string'
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import useGetSummary from "@/hooks/summary/api/useGetSummary"


export default function AccountFilter() {

    const router = useRouter()
    const pathname = usePathname()

    const params = useSearchParams()
    const accountId = params.get('accountId') || 'all'
    const from = params.get("from") || "";
    const to = params.get("to") || "";

    const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts()
    const { isLoading: isLoadingSummary } = useGetSummary()

    const onChange = (newValue: string) => {
        const query = {
            accountId: newValue === 'all' ? '' : newValue,
            from, to
        }

        const url = qs.stringifyUrl({
            url: pathname, query,
        }, { skipEmptyString: true, skipNull: true })

        router.push(url)
    }

    return (
        <Select value={accountId} onValueChange={onChange} disabled={isLoadingAccounts || isLoadingSummary}>
            <SelectTrigger className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition">
                <SelectValue placeholder="Select an account"></SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Accounts</SelectItem>
                {accounts?.map((account) => (
                    <SelectItem key={account.id} value={account.id}>{account.name}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )

}