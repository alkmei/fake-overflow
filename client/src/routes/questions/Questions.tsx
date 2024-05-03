import ContentHeader from "@/components/ContentHeader.tsx";
import QuestionList from "@/components/questions/QuestionList.tsx";
import { tempQuestions } from "@/TempData.ts";
import PageButtons from "@/components/PageButtons.tsx";

export default function Questions() {
  const numPerPage = 5;
  const lastPage = Math.floor(tempQuestions.length / numPerPage) + 1;

  return (
    <section className="w-full">
      <ContentHeader
        name={"All Questions"}
        questionCount={tempQuestions.length}
      />
      <QuestionList questions={tempQuestions} />
      <PageButtons totalPages={lastPage} />
    </section>
  );
}
