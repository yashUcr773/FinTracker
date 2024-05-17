import Image from "next/image";

interface AuthLayoutProps {
    children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen grid gird-cols-1 lg:grid-cols-2 bg-blue-600 lg:bg-white">

            <div className="h-full lg:flex flex-col items-center justify-center px-4">

                <div className="text-center space-y-4 pt-16 hidden lg:flex flex-col">
                    <h1 className="font-bold text-3xl text-[#2e2a47]"> Welcome Back</h1>
                    <p className="text-base text-[#738ca0]">Log in or Create account to get back to your dashboard!</p>
                </div>

                <div className="h-fit bg-blue-600 pt-16 lg:hidden flex flex-col items-center justify-center">
                    <div className="flex flex-row items-center justify-center flex-wrap">
                        <Image src="/logo.svg" height={96} width={96} alt="logo"></Image>
                        <p className="text-2xl text-white font-bold">FinTracker</p>
                    </div>
                    <p className="text-base text-white">Log in or Create account to get back to your dashboard!</p>
                </div>

                {children}
            </div>

            <div className="h-full bg-blue-600 hidden lg:flex flex-col items-center justify-center">
                <Image src="/logo.svg" height={120} width={120} alt="logo"></Image>
                <p className="text-3xl text-white font-bold">FinTracker</p>
            </div>

        </div>
    )
}