import { useOpenCategory } from "@/hooks/categories/store/useOpenCategory"
import { useOpenTransaction } from "@/hooks/transactions/store/useOpenTransaction"
import { cn } from "@/lib/utils"
import { TriangleAlert } from "lucide-react"

interface CategoryColumnsProps {
    id: string
    category: string | null
    categoryId: string | null
}

export default function CategoryColumns({ id, category, categoryId }: CategoryColumnsProps) {
    const { onOpen: onOpenCatetory } = useOpenCategory()
    const { onOpen: onOpenTransaction } = useOpenTransaction()

    const onClick = () => {
        categoryId ? onOpenCatetory(categoryId) : onOpenTransaction(id)
    }

    return (
        <div className={cn("flex items-center cursor-pointer hover:underline", !category && "text-rose-500")}
            onClick={onClick}>
            {!category && <TriangleAlert className="mr-2 size-4 shrink-0"></TriangleAlert>}
            {category || "Uncategorized"}
        </div>
    )
}