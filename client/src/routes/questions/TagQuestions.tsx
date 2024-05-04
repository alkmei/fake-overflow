import ContentHeader from "@/components/ContentHeader.tsx";
import QuestionList from "@/components/questions/QuestionList.tsx";
import PageButtons from "@/components/PageButtons.tsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Question from "@server/types/question";

export default function TagQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const tag = useParams().tag;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/tags/${tag}/questions`)
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log("Error fetching questions:", err);
      });
  }, [tag]);

  if (!questions) {
    return <p>No Questions found tagged [{tag}]</p>;
  }

  // console.log(questions);
  const numPerPage = 5;
  const lastPage = Math.floor(questions.length / numPerPage) + 1;

  return (
    <section className="w-full">
      <ContentHeader
        name={`Questions tagged [${tag}]`}
        questionCount={questions.length}
      />
      <QuestionList questions={questions} />
      <PageButtons totalPages={lastPage} />
    </section>
  );
}
