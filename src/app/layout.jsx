import { Inter } from "next/font/google";
import "../styles/globals.css";
import Header from "../Components/Header";
import { ThemeProviders } from "./ThemeProvider/ThemeProviders";
import PageTransitionWrapper from "../Components/PageTransitionWrapper";
import { ReduxProvider } from "./lib/store/redux-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next-Headless",
  description: "Next-Headless demo project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeProviders>
            <Header />
            <PageTransitionWrapper>{children}</PageTransitionWrapper>
          </ThemeProviders>
        </ReduxProvider>
      </body>
    </html>
  );
}
