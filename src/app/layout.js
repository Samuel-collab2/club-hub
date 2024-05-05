import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import StyledComponentsRegistry from "./registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Club Hub",
  description: "App for Managing School Clubs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <StyledComponentsRegistry>
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </StyledComponentsRegistry>
    </html>
  );
}
