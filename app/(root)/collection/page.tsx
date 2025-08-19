import QuestionCard from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/search/Filters";
import NoResults from "@/components/shared/NoResult";
// import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { QuestionFilters } from "@/constants/filters";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Pagination from "@/components/shared/Pagination";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections | Overflow",
  description:
    "Overflow is a community of developers helping developers." +
    " Join today!",
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
};
export default async function Collection({ searchParams }: SearchParamsProps) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  // Get the Questions from DB
  const result = await getSavedQuestions({
    clerkId: userId,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      {/* SEARCHBARS */}
      <div className="mt-11 flex justify-between gap-2  max-md:flex-row max-sm:flex-col max-sm:justify-evenly sm:items-start">
        <LocalSearch
          route="/collection"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      {/* QUESTION CARD */}
      <div className="mt-10 flex w-full flex-col gap-6 ">
        {result && result.questions && result.questions.length > 0 ? (
          result.questions.map((question: any) => {
            return (
              <QuestionCard
                _id={question._id}
                key={question._id}
                title={question.title}
                tags={question.tags}
                author={question.author}
                upvotes={question.upvotes}
                answers={question.answers}
                views={question.views}
                createdAt={question.createdAt}
              />
            );
          })
        ) : (
          <NoResults
            title=" There’s no saved questions to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. our query could be the next big thing others learn from. Get
          involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
      <div className=" mt-10">
        <Pagination
          isNext={result?.isNext}
          pageNumber={searchParams.page ? +searchParams.page : 1}
        />
      </div>
    </>
  );
}
