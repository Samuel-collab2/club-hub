import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import StyledComponentsRegistry from "./registry";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Club Hub",
  description: "App for Managing School Clubs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <StyledComponentsRegistry>
        <ClerkProvider>
          <body
            className={inter.className}
            style={{
              margin: 0,
            }}
          >
            <Navbar />
            {children}
          </body>
        </ClerkProvider>
      </StyledComponentsRegistry>
    </html>
  );
}
