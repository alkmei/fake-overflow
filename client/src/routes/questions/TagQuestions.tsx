import ContentHeader from "@/components/ContentHeader.tsx";
import QuestionList from "@/components/questions/QuestionList.tsx";
import { tempQuestions } from "@/TempData.ts";
import PageButtons from "@/components/PageButtons.tsx";
import { useParams } from "react-router-dom";

export default function TagQuestions() {
  const tag = useParams().tag;

  return (
    <section className="w-full">
      <ContentHeader
        name={`Questions tagged [${tag}]`}
        questionCount={tempQuestions.length}
      />
      <QuestionList questions={tempQuestions} />
      <PageButtons totalPages={10} />
    </section>
  );
}
