import "./globals.css"

import {ThemeProvider} from "@/src/components/ThemeProvider"
import {Toaster} from "@/src/components/ui/toaster"
import PostHogProvider from "@/src/app/posthog/PostHogProvider"
import {Metadata} from "next"

export const metadata: Metadata = {
    title: "dohack.me",
    description: "A CTF Training Platform, done differently",
}

export default async function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" className={"h-fit w-full min-h-screen max-w-screen flex flex-col"} suppressHydrationWarning>
            <head>
                <title>dohack.me</title>
                <meta name="google-adsense-account" content="ca-pub-1971189389097192"/>
            </head>
            <body className={"antialiased grow flex flex-col"}>
                <PostHogProvider>
                    <ThemeProvider
                        attribute={"class"}
                        defaultTheme={"system"}
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                    <Toaster/>
                </PostHogProvider>
            </body>
        </html>
    )
}
