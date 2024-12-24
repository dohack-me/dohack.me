import "./globals.css";

import {ThemeProvider} from "@/components/theme-provider"

export default async function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" className={"h-fit w-full min-h-screen"}>
            <body className={"antialiased h-full w-full"}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
