import DataChart from "./_components/DataChart";
import DataGrid from "./_components/DataGrid";

export default function DashboardPage() {

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <DataGrid></DataGrid>
            <DataChart></DataChart>
        </div>
    );
}
