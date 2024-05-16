import AccountFilter from "./AccountFilter";
import DateFilter from "./DateFilter";

export default function Filters() {
    return (
        <div className="flex flex-col lg:flex-row items-center gap-y-2 lg:gap-x-2 lg:gap-y-0">
            <AccountFilter></AccountFilter>
            <DateFilter></DateFilter>
        </div>
    )
}