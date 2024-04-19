import React from "react";
import NavbarMenu from "./navbar";
import CustomFooter from "./footer";

interface BasePageProps {
  Children: React.ReactNode;
}

export default function BasePage({ Children }: Readonly<BasePageProps>) {
  return (
    <div className='h-[100vh]'>
      <NavbarMenu title='CV Analyzer' />
      {Children}
      <CustomFooter />
    </div>
  );
}
