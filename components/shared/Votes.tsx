"use client";
import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
// import { viewQuestion } from "@/lib/actions/interaction.action";
import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { toast } from "../ui/use-toast";
import { formatNumber } from "@/lib/utils";
import { toggleSaveQuestion } from "@/lib/actions/user.action";
import { viewQuestion } from "@/lib/actions/interaction.action";

interface Props {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  hasupVoted: boolean;
  downvotes: number;
  hasdownVoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  hasupVoted,
  downvotes,
  hasdownVoted,
  hasSaved,
}: Props) => {
  const pathname = usePathname();
  // eslint-disable-next-line no-unused-vars
  const router = useRouter();

  // Call Saved Server Actions from here
  const handleSaved = async () => {
    await toggleSaveQuestion({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      path: pathname,
    });

    return toast({
      title: `Question ${
        !hasSaved ? "Saved in" : "Removed from your collection"
      }`,
      variant: !hasSaved ? "default" : "destructive",
    });
  };

  // Call to Vote Server Actions from Client component
  const handleVote = async (action: string) => {
    if (!userId) {
      return toast({
        title: "Log in to vote",
        description: "You need to log in to vote a question",
      });
    }

    if (action === "upvote") {
      if (type === "Question") {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      }
      return toast({
        title: `Upvote ${!hasupVoted ? "Successful" : "Removed"}`,
        variant: !hasupVoted ? "default" : "destructive",
      });
    } else if (action === "downvote") {
      if (type === "Question") {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      }

      return toast({
        title: `Downvote ${!hasdownVoted ? "Successful" : "Removed"}`,
        variant: !hasdownVoted ? "default" : "destructive",
      });
    }
  };

  useEffect(() => {
    if (type === "Question") {
      console.log("viewing question itemId, userId", itemId, userId);
      viewQuestion({
        questionId: JSON.parse(itemId),
        userId: userId ? JSON.parse(userId) : undefined,
      });
    }
  }, [itemId, userId, type]);

  return (
    // All Container
    <div className="flex gap-5">
      {/* upvote downvote container */}
      <div className="flex-center gap-2.5 ">
        {/* Upvote container */}
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasupVoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            width={18}
            height={18}
            alt="upvote"
            className="cursor-pointer"
            onClick={() => {
              handleVote("upvote");
            }}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(upvotes)}
            </p>
          </div>
        </div>

        {/* Downvote container */}
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasdownVoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            width={18}
            height={18}
            alt="downvote"
            className="cursor-pointer"
            onClick={() => {
              handleVote("downvote");
            }}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>

      {type === "Question" && (
        <Image
          src={
            hasSaved
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          width={18}
          onClick={handleSaved}
          height={18}
          alt="save"
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default Votes;
