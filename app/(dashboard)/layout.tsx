import Header from "./_components/Header"

interface DashboardLayoutProps {
    children: React.ReactNode
}
export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <>
            <Header />
            <main className="px-3 lg:px-14">
                {children}
            </main>
        </>
    )
}