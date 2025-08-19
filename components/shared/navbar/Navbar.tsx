import React from "react";
import Link from "next/link";
import Image from "next/image";
import SignedStatus from "./SignedStatus";
import Theme from "./Theme";
import MobileNav from "./MobileNav";
import GlobalSearch from "@/components/shared/search/GlobalSearch";

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-5 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/images/site-logo.svg"
          alt="logo"
          width={23}
          height={23}
        />
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Over
          <span className="text-primary-500">flow</span>
        </p>
      </Link>
      <GlobalSearch />
      <div className="flex-between gap-5">
        <Theme />
        <SignedStatus />
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
