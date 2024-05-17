import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";


export default function Page() {

    return (
        <div className="flex items-center justify-center mt-8">
            <ClerkLoaded>
                <SignUp path="/sign-up" />;
            </ClerkLoaded>
            <ClerkLoading>
                <Loader2 className="animate-spin text-white lg:text-muted-foreground"></Loader2>
            </ClerkLoading>
        </div>
    );

}