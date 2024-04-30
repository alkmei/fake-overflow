import ContentHeader from "@/components/ContentHeader.tsx";
import QuestionList from "@/components/questions/QuestionList.tsx";
import { tempQuestions } from "@/TempData.ts";

export default function Questions() {
  return (
    <section className="w-full">
      <ContentHeader
        name={"All Questions"}
        questionCount={tempQuestions.length}
      />
      <QuestionList questions={tempQuestions} />
    </section>
  );
}
