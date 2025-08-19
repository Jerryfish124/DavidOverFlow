"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrl } from "@/lib/utils";

interface Props {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses: string;
}

const LocalSearch = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else if (pathname === route) {
        const newUrl = removeKeysFromUrl({
          params: searchParams.toString(),
          keysToRemove: ["q"],
        });
        router.push(newUrl, { scroll: false });
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search, route, pathname, router, searchParams, query]);
  return (
    <div
      className={`background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search"
          width={20}
          height={20}
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="paragraph-regular no-focus placeholder
             text-dark400_light700 border-none bg-transparent shadow-none   outline-none "
      />
      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="search"
          width={20}
          height={20}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearch;
