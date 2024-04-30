// import { timeSinceDate } from "../../helper";
import AnswerComponent from "@/components/questions/AnswerComponent.tsx";
// import { useState } from "react";
import PostText from "@/components/questions/PostText.tsx";
import { Link } from "react-router-dom";
import ContentHeader from "@/components/ContentHeader.tsx";

export default function Answers() {
  // const [question, setQuestion] = useState({});
  // const [answers, setAnswers] = useState([]);
  const questionId = new URLSearchParams(window.location.search).get("id");

  // temp hardcoded question for front end dev
  const question = {
    title:
      "This is a Titleasdfahujioasdhuhuisdhuisdhuisdhuisdhuisdhuisdhuisdhu",
    summary:
      "This is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summary",
    askDateTime: new Date(),
    text: "this is my text",
    askedBy: "me!!!",
    views: 2,
    votes: 3,
    id: 1,
    answers: [
      {
        text: "hi this is a good question",
        ansBy: "me answer q",
        ansDateTime: new Date(),
      },
    ],
    tags: [
      { id: 100, name: "react" },
      { id: 200, name: "wolfie2d" },
    ],
  };
  const answers = question.answers;
  // useEffect(() => {
  //     axios
  //         .get(`http://localhost:8000/posts/question/${questionId}`)
  //         .then(async (res) => {
  //             setQuestion(res.data);
  //
  //             const answersData = await getAnswers(res.data);
  //
  //             setAnswers(
  //                 answersData.toSorted((a, b) => b.ans_date_time - a.ans_date_time),
  //             );
  //         })
  //         .catch((error) => {
  //             console.error("Error fetching question or answers:", error);
  //         });
  // }, [questionId]);

  if (questionId && Object.keys(question).length === 0)
    return <p>Page Loading...</p>;

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="">
          <section className="w-full">
            <ContentHeader name={question.title} subText={"hi"} />
          </section>
          <PostText text={question.text} />

          <ul id="answer-list">
            {answers.map((answer, index) => (
              <div key={index}>
                <AnswerComponent answer={answer} />
              </div>
            ))}
          </ul>
        </div>

        <Link to={`/new-answer?id=${questionId}`}>Answer Question</Link>
      </div>
    </>
  );
}
