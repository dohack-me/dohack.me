import "./globals.css"

import {ThemeProvider} from "@/src/components/ThemeProvider"
import {Metadata} from "next"
import CookieConsentBanner from "@/src/app/_components/CookieConsentBanner";
import {Toaster} from "@/src/components/ui/sonner";
import {TooltipProvider} from "@/src/components/ui/tooltip";

export const metadata: Metadata = {
    title: "dohack.me",
    description: "A CTF Training Platform, done differently",
}

export default async function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang={"en"} className={"min-h-screen max-w-screen h-fit w-full flex"} suppressHydrationWarning>
            <body className={"antialiased grow-col"}>
                <ThemeProvider
                    attribute={"class"}
                    defaultTheme={"system"}
                    enableSystem
                    disableTransitionOnChange
                >
                    <TooltipProvider>
                        {children}
                    </TooltipProvider>
                    <CookieConsentBanner/>
                </ThemeProvider>
                <Toaster/>
            </body>
        </html>
    )
}
