import { Link } from "@nextui-org/react";

import { useTheme } from "../state/themeState";

export default function CustomFooter() {
  const { isDarkMode } = useTheme();

  return (
    <footer
      className={`sm:grid sm:grid-cols-3 items-center justify-center ${
        isDarkMode ? "bg-slate-900" : " bg-slate-300"
      } p-4 mt-4`}>
      <div className='flex justify-center'>
        <p className=' font-bold '>CV analyzer</p>
      </div>
      <div className='flex justify-center py-4 sm:py-0'>
        <p className=''>
          <span>Developed by</span>
          <span className=' font-bold'> Jeffrey Rerín</span>
        </p>
      </div>
      <div className='flex justify-center'>
        <Link isExternal href='http://www.jeffrm.com.co' showAnchorIcon>
          My Portfolio
        </Link>
      </div>
    </footer>
  );
}
