import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  link: string;
  linkTitle: string;
}

const NoResult = ({ title, description, link, linkTitle }: Props) => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <Image
          src={`/assets/images/light-illustration.png`}
          alt="no result"
          width={270}
          height={200}
          className="block object-contain dark:hidden"
        />
        <Image
          src={`/assets/images/dark-illustration.png`}
          alt="no result"
          width={270}
          height={200}
          className="hidden object-contain dark:flex"
        />
      </div>
      <h2 className="h2-bold text-dark100_light900 mt-7 text-center">
        {title}
      </h2>
      <p className="body-regular text-dark500_light700 my-3.5 text-center">
        {description}
      </p>
      <Link href={link} className="flex justify-center max-sm:w-full">
        <Button className="primary-gradient min-h-[46px] px-4 py-3 text-light-900 ">
          {linkTitle}
        </Button>
      </Link>
    </div>
  );
};

export default NoResult;
