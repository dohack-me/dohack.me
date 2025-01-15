import "./globals.css";

import {ThemeProvider} from "@/src/components/ThemeProvider"
import {Toaster} from "@/src/components/ui/toaster";

export default async function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" className={"h-fit w-full min-h-screen max-w-screen flex flex-col"} suppressHydrationWarning>
            <body className={"antialiased flex-grow flex flex-col"}>
                <ThemeProvider
                    attribute={"class"}
                    defaultTheme={"system"}
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
                <Toaster/>
            </body>
        </html>
    );
}
