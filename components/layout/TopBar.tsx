"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { navLinks } from "@/lib/constants";


const TopBar = () => {
  const [dropdownMenu, setDropdownMenu] = useState<boolean>(false);
  const pathname = usePathname()
  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-9 py-4 bg-blue-2 shadow-xl lg:hidden">
      <Image src={""} alt="logo" width={150} height={70} />
      <div className="flex gap-8 max-md:hidden">
        {navLinks.map((link) => {
          return (
            <Link
              key={link.label}
              href={link.url}
              className={`flex gap-4 text-body-medium items-center ${pathname === link.url ? "text-blue-1" : "text-grey-1"}`}
            >
              <p>{link.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="flex gap-4 items-center relative">
        <Menu
          className="cursor-pointer md:hidden"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        />
        {dropdownMenu && (
          <div className="absolute top-10 right-6 flex flex-col gap-8 p-5 shadow-xl rounded-lg bg-white">
            {navLinks.map((link) => {
              return (
                <Link
                  key={link.label}
                  href={link.url}
                  className={`flex gap-4 text-body-medium items-center ${pathname === link.url ? "text-blue-1" : "text-grey-1"}`}
                >
                  {link.icon}
                  <p>{link.label}</p>
                </Link>
              );
            })}
          </div>
        )}
        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;
