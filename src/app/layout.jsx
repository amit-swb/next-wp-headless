import "../styles/globals.css";
import { ThemeProviders } from "./ThemeProvider/ThemeProviders";
import PageTransitionWrapper from "../Components/PageTransitionWrapper";
import { ReduxProvider } from "./lib/store/redux-provider";
import dynamic from "next/dynamic";
import ".././Components/fontawesome";
import Breadcrumb from "../Components/BreadCrumb/Breadcrumb";

const Header = dynamic(() => import(".././Components/Header"), { ssr: false });

export const metadata = {
  title: "Next-Headless",
  description: "Next-Headless demo project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="bg-gray-50 dark:bg-gray-900">
        <ReduxProvider>
          <ThemeProviders>
            <Header />
            <Breadcrumb />
            <PageTransitionWrapper>{children}</PageTransitionWrapper>
          </ThemeProviders>
        </ReduxProvider>
      </body>
    </html>
  );
}
