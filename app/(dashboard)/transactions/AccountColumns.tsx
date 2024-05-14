import { useOpenAccount } from "@/hooks/accounts/store/useOpenAccount";

interface AccountColumnsProps {
    account: string
    accountId: string
}

export default function AccountColumns({ account, accountId }: AccountColumnsProps) {
    const { onOpen } = useOpenAccount()

    const onClick = () => {
        onOpen(accountId)
    }

    return (
        <div className="flex items-center cursor-pointer hover:underline" onClick={onClick}>{account}</div>
    )
}