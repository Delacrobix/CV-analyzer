import React from "react";

import NavbarMenu from "./navbar";
import CustomFooter from "./footer";
import { useTheme } from "../state/themeState";

interface BasePageProps {
  children: React.ReactNode;
}

export default function BasePage({ children }: Readonly<BasePageProps>) {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`${
        isDarkMode ? "dark text-foreground bg-background" : ""
      } h-full`}>
      <NavbarMenu title='CV Analyzer' />
      {children}
      <CustomFooter />
    </div>
  );
}
