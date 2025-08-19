import React from "react";
import Link from "next/link";
import Image from "next/image";
import RenderTag from "@/components/shared/sidebar/RenderTag";
import { getHotQuestions } from "@/lib/actions/question.action";
import { getTopPopularTags } from "@/lib/actions/tag.action";

// @ts-ignore
const RightSidebar = async () => {
  const hotQuestions = await getHotQuestions();

  const popularTags = await getTopPopularTags();

  return (
    <div
      className="custom-scrollbar background-light900_dark200 light-border sticky right-0  top-0 flex  h-screen w-[350px]
     flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden"
    >
      <div className="flex flex-1 flex-col gap-6">
        <div>
          <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
          <div className="mt-7 flex w-full flex-col gap-[30px]">
            {
              // @ts-ignore
              hotQuestions.map((item) => (
                <Link
                  href={`/question/${item._id}`}
                  key={item._id}
                  className=" flex items-center justify-between gap-7"
                >
                  <p className="body-medium text-dark500_light700">
                    {item.title}
                  </p>
                  <Image
                    src="/assets/icons/chevron-right.svg"
                    alt="right"
                    width={20}
                    height={20}
                    className="invert-colors"
                  />
                </Link>
              ))
            }
          </div>
        </div>
        <div className="mt-16">
          <div className="h3-bold text-dark200_light900">Popular Tags</div>
          <div className="mt-7 flex flex-col gap-4">
            {popularTags.map((item) => (
              <RenderTag
                key={item._id}
                _id={item._id}
                name={item.name}
                totalQuestions={item.totalQuestions}
                showCount={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
