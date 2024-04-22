import React from "react";
import NavbarMenu from "./navbar";
import CustomFooter from "./footer";

interface BasePageProps {
  children: React.ReactNode;
}

export default function BasePage({ children }: Readonly<BasePageProps>) {
  return (
    <div className='h-[100vh]'>
      <NavbarMenu title='CV Analyzer' />
      {children}
      <CustomFooter />
    </div>
  );
}
