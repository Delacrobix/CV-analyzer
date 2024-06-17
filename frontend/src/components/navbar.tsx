import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { useNavigate, useLocation } from "react-router-dom";

import SwitchTheme from "./switchTheme";
import { useTheme } from "../state/themeState";

interface NavbarMenuProps {
  title: string;
}

export default function NavbarMenu({ title }: Readonly<NavbarMenuProps>) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();

  function handleShowReturnButton() {
    if (location.pathname === "/analysis") return true;

    return false;
  }

  function handleNavigate() {
    navigate("/");
  }

  return (
    <Navbar className={`${isDarkMode ? "bg-slate-900" : " bg-slate-300"}`}>
      <NavbarBrand>
        <a className='font-bold text-inherit p-4 -ml-4' href='/'>
          CV Analyzer
        </a>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex' justify='center'>
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
        <div className='-mr-12 p-6'>
          <NavbarItem>
            <SwitchTheme />
          </NavbarItem>
        </div>
      </NavbarContent>
    </Navbar>
  );
}
