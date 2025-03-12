import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Zen Todo App",
    description: "A todo app for all!",
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                    <SignedOut>
                        <div className="min-h-screen bg-zinc-950 flex justify-center items-center flex-col">
                            <div className="flex items-center gap-2">
                                <img
                                    src="/icon.svg"
                                    className="h-12 w-12 invert"
                                    alt="icon"
                                />
                                <h1 className="logo text-3xl">Zen Todo</h1>
                            </div>
                            <h2 className="text-zinc-400 mt-2 w-96 text-center">
                                Zen Todo is an open source todo application!
                                Primarily focuses on easy todo creation process.
                                With efficient user management.
                            </h2>
                            <div className="mt-6">
                                <div className="flex gap-2">
                                    <SignInButton className="btn bg-blue-600" />

                                    <SignUpButton className="btn bg-green-600" />
                                </div>
                            </div>
                        </div>
                    </SignedOut>

                    <SignedIn>
                        <div className="min-h-screen bg-zinc-950 flex flex-col">
                            <header className="header">
                                <div className="header-container">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src="/icon.svg"
                                            className="h-8 w-8 invert"
                                            alt="icon"
                                        />
                                        <h1 className="logo text-xl">
                                            Zen Todo
                                        </h1>
                                    </div>
                                    <UserButton />
                                </div>
                            </header>
                            <main className="flex-1">{children}</main>
                        </div>
                    </SignedIn>
                </body>
            </html>
        </ClerkProvider>
    );
}
