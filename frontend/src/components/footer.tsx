import React from "react";
import { Link } from "@nextui-org/react";

export default function CustomFooter() {
  return (
    <footer className='grid grid-cols-3 items-center justify-center bg-black p-4'>
      <div className='flex justify-center'>
        <p className=' font-bold '>CSS Tailwind converter</p>
      </div>
      <div className='flex justify-center'>
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
