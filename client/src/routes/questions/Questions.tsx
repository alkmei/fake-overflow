import ContentHeader from "@/components/ContentHeader.tsx";
import QuestionList from "@/components/questions/QuestionList.tsx";
import { tempQuestions } from "@/TempData.ts";
import PageButtons from "@/components/PageButtons.tsx";

export default function Questions() {
  return (
    <section className="w-full">
      <ContentHeader
        name={"All Questions"}
        questionCount={tempQuestions.length}
      />
      <QuestionList questions={tempQuestions} />
      <PageButtons totalPages={10} />
    </section>
  );
}
