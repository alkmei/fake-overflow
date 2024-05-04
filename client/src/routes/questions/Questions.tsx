import ContentHeader from "@/components/ContentHeader.tsx";
import QuestionList from "@/components/questions/QuestionList.tsx";
import { useState, useEffect } from "react";
import PageButtons from "@/components/PageButtons.tsx";
import axios from "axios";

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const numPerPage = 5;
  const lastPage = Math.floor(questions.length / numPerPage) + 1;

  useEffect(() => {
    axios.get("http://localhost:8000/api/questions").then((res) => {
      setQuestions(res.data);
    });
  });

  return (
    <section className="w-full">
      <ContentHeader name={"All Questions"} questionCount={questions.length} />
      <QuestionList questions={questions} />
      <PageButtons totalPages={lastPage} />
    </section>
  );
}
