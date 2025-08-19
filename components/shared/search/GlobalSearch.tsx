"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrl } from "@/lib/utils";
import GlobalResult from "@/components/shared/search/GlobalResult";

const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");
  const [search, setSearch] = useState(query || "");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const searchModalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        searchModalRef.current &&
        // @ts-ignore
        !searchModalRef.current.contains(event.target)
      ) {
        setIsSearchModalOpen(false);
        setSearch("");
      }
    };

    setIsSearchModalOpen(false);
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [pathname]);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "global",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else if (query) {
        const newUrl = removeKeysFromUrl({
          params: searchParams.toString(),
          keysToRemove: ["global", "type"],
        });
        router.push(newUrl, { scroll: false });
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search, pathname, router, searchParams, query]);
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={20}
          height={20}
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder="Search Everywhere"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isSearchModalOpen) {
              setIsSearchModalOpen(true);
            }
            if (e.target.value === "") {
              setIsSearchModalOpen(false);
            }
          }}
          className="paragraph-regular no-focus placeholder text-dark400_light700
             border-none bg-transparent shadow-none outline-none"
        />
      </div>
      {isSearchModalOpen && <GlobalResult />}
    </div>
  );
};

export default GlobalSearch;
