"use client";
import React from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "../../../components/ui/sheet";
import Image from "next/image";
import Link from "next/link";

import { SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";

const NavContent = () => {
  const pathname = usePathname();
  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;
        return (
          <>
            <SheetClose asChild key={item.route}>
              <Link
                href={item.route}
                className={`${
                  isActive
                    ? "primary-gradient rounded-lg text-light-900"
                    : "text-dark300_light900"
                } flex items-center justify-start gap-4 bg-transparent p-4`}
              >
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  width={20}
                  height={20}
                  className={`${isActive ? "" : "invert-colors"}`}
                />
                <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                  {item.label}
                </p>
              </Link>
            </SheetClose>
          </>
        );
      })}
      <SheetClose asChild>
        <Link href="https://github.com/Butcanudothis/overflow">
          <Button className="small-medium btn-secondary flex min-h-[41px] w-full gap-2 rounded-lg px-4 py-3 shadow-none">
            <Image
              src="/assets/icons/github-mark.svg"
              alt="github"
              width={20}
              height={20}
              className="lg:hidden"
            />
            <span className="text-dark300_light700">Github</span>
          </Button>
        </Link>
      </SheetClose>
    </section>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          alt="more"
          width={20}
          height={20}
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/images/site-logo.svg"
            alt="logo"
            width={23}
            height={23}
          />
          <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900">
            Over
            <span className="text-primary-500">flow</span>
          </p>
        </Link>
        <SheetClose asChild>
          <NavContent />
        </SheetClose>

        <SignedOut>
          <div className="flex flex-col gap-3">
            <SheetClose asChild>
              <Link href="/sign-in">
                <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                  <span className="primary-text-gradient">Sign in</span>
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/sign-up">
                <Button className="small-medium btn-tertiary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                  Sign up
                </Button>
              </Link>
            </SheetClose>
          </div>
        </SignedOut>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
