import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { useNavigate, useLocation } from "react-router-dom";

interface NavbarMenuProps {
  title: string;
}

export default function NavbarMenu({ title }: Readonly<NavbarMenuProps>) {
  const navigate = useNavigate();
  const location = useLocation();

  function handleShowReturnButton() {
    if (location.pathname === "/result") return true;

    return false;
  }

  function handleNavigate() {
    navigate("/");
  }

  return (
    <Navbar>
      <NavbarBrand>
        <p className='font-bold text-inherit'>CV Analyzer</p>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <h1 className=' text-center text-3xl'>{title}</h1>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        {handleShowReturnButton() && (
          <NavbarItem>
            <button
              className=' bg-transparent text-blue-500'
              onClick={handleNavigate}>
              Return
            </button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
