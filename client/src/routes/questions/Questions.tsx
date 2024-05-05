import ContentHeader from "@/components/ContentHeader.tsx";
import QuestionList from "@/components/questions/QuestionList.tsx";
import { useState, useEffect } from "react";
import PageButtons from "@/components/PageButtons.tsx";
import axios from "axios";
import Question from "@server/types/question";
import { useParams, useSearchParams } from "react-router-dom";

export default function Questions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [sortedQuestions, setSortedQuestions] = useState<Question[]>([]);
  const [sort, setSort] = useState("newest");
  const numPerPage = 5;
  const lastPage = Math.ceil(questions.length / numPerPage);

  const [searchParams] = useSearchParams();
  const { query } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/questions?search=${query}`)
      .then((res) => {
        setQuestions(res.data);
      });
  }, [query]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setSort(tab);
  }, [searchParams]);

  useEffect(() => {
    switch (sort) {
      case "newest":
        setSortedQuestions(getQuestionsSortedNewest(questions));
        break;
      case "active":
        setSortedQuestions(getQuestionsSortedActive(questions));
        break;
      case "unanswered":
        setSortedQuestions(getQuestionsByUnanswered(questions));
        break;
      default:
        break;
    }
  }, [questions, sort]);

  const getQuestionsSortedNewest = (questions: Question[]) =>
    [...questions].sort(
      (a, b) =>
        new Date(b.creationTime).getTime() - new Date(a.creationTime).getTime(),
    );

  const getQuestionsSortedActive = (questions: Question[]) =>
    [...questions].sort((a, b) => {
      const answersA = [...a.answers];
      const answersB = [...b.answers];

      const mostRecentAnswersA = [...answersA].sort(
        (a, b) =>
          new Date(b.creationTime).getTime() -
          new Date(a.creationTime).getTime(),
      );

      const mostRecentAnswersB = [...answersB].sort(
        (a, b) =>
          new Date(b.creationTime).getTime() -
          new Date(a.creationTime).getTime(),
      );

      const mostRecentDateA =
        mostRecentAnswersA.length > 0 ? mostRecentAnswersA[0].creationTime : 0;

      const mostRecentDateB =
        mostRecentAnswersB.length > 0 ? mostRecentAnswersB[0].creationTime : 0;

      return (
        new Date(mostRecentDateB).getTime() -
        new Date(mostRecentDateA).getTime()
      );
    });

  const getQuestionsByUnanswered = (questions: Question[]) =>
    questions.filter((question) => question.answers.length === 0);

  return (
    <section className="w-full">
      <ContentHeader
        name={query ? "Search Results" : "All Questions"}
        questionCount={questions.length}
      />
      <QuestionList questions={sortedQuestions} />
      <PageButtons totalPages={lastPage} />
    </section>
  );
}
