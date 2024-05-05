import { Inter } from "next/font/google";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import './globals.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Club Hub",
  description: "App for Managing School Clubs",
};

export default function RootLayout({ children }) {
  return (
<ClerkProvider>
      <html lang="en">
        <body>
          <header>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <main>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );

}
