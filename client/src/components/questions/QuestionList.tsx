import QuestionComponent from "@/components/questions/QuestionComponent.tsx";
import Question from "@server/types/question";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function QuestionList({
  questions,
  fromProfile,
}: {
  questions: Question[];
  fromProfile?: boolean;
}) {
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();

  const numPerPage = 5;

  useEffect(() => {
    if (searchParams.get("page")) {
      const pageParam = searchParams.get("page");
      if (pageParam) {
        const newPage = parseInt(pageParam);
        setPage(newPage);
      }
    }
  }, [searchParams]);

  if (questions.length === 0) return <h1>No Questions Found</h1>;

  return (
    <ul className="overflow-y-scroll max-h-[800px]">
      {(() => {
        const renderedQuestions = [];
        for (
          let i = (page - 1) * numPerPage;
          i < (page - 1) * numPerPage + numPerPage;
          i++
        ) {
          const question = questions[i];
          if (question) {
            renderedQuestions.push(
              <div key={i}>
                <QuestionComponent key={i} question={question} />
              </div>,
            );
          }
        }
        return renderedQuestions;
      })()}
    </ul>
  );
}
