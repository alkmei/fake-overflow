import QuestionHeader from "@/components/QuestionHeader.tsx";
import { useEffect, useState } from "react";
import { useAuthentication } from "@/helper.ts";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import PageButtons from "@/components/PageButtons.tsx";
import Answer from "@server/types/answer";
import Question from "@server/types/question";
import FormError from "@/components/FormError.tsx";
import axios from "axios";
import AnswerPostComponent from "@/routes/questions/AnswerPostComponent.tsx";

export default function Answers({ fromProfile }: { fromProfile?: boolean }) {
  const questionId = useParams().qid;
  const { loggedIn, user } = useAuthentication();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [question, setQuestion] = useState<Question>();
  const [nonUserAnswers, setNonUserAnswers] = useState<Answer[]>([]);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [answerVoteError, setAnswerVoteError] = useState("");
  const [questionVoteError, setQuestionVoteError] = useState("");

  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // TODO: FIX VIEW COUNT 2 TIMES BUG
  useEffect(() => {
    if (searchParams.get("page")) {
      const pageParam = searchParams.get("page");
      if (pageParam) {
        const newPage = parseInt(pageParam);
        setPage(newPage);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/questions/${questionId}`)
      .then((res) => {
        setQuestion(res.data);
        setAnswers(
          res.data.answers.sort(
            (a: Answer, b: Answer) =>
              new Date(b.creationTime).getTime() -
              new Date(a.creationTime).getTime(),
          ),
        );
        // Split answers into user's answers and non-user's answers
        const userAnswersArray: Answer[] = [];
        const nonUserAnswersArray: Answer[] = [];
        res.data.answers.forEach((answer: Answer) => {
          if (answer.author._id === user?._id) {
            userAnswersArray.push(answer);
          } else {
            nonUserAnswersArray.push(answer);
          }
        });
        setUserAnswers(
          userAnswersArray.sort(
            (a, b) =>
              new Date(b.creationTime).getTime() -
              new Date(a.creationTime).getTime(),
          ),
        );
        setNonUserAnswers(
          nonUserAnswersArray.sort(
            (a, b) =>
              new Date(b.creationTime).getTime() -
              new Date(a.creationTime).getTime(),
          ),
        );
      })
      .catch((error) => {
        console.error("Error fetching question:", error);
      });
  }, [questionId, user?._id]);

  const handleAnsDelete = (answer: Answer): string => {
    let errorMsg = "";
    axios
      .delete(`http://localhost:8000/api/answers/${answer._id}`, {
        withCredentials: true,
      })
      .then(() => {
        setAnswers((prevAnswers) =>
          prevAnswers.filter((a) => a._id !== answer._id),
        );
        setUserAnswers((prevAnswers) =>
          prevAnswers.filter((a) => a._id !== answer._id),
        );
        return "";
      })
      .catch((err) => {
        console.error(err);
        errorMsg = err.response.data.message;
      });
    return errorMsg;
  };

  const handleVote = async (post: Question | Answer, vote: number) => {
    if (!loggedIn) navigate("/users/login");

    if ((post as Question).summary) {
      if (user && user.reputation < 50) {
        setQuestionVoteError("Not enough reputation");
        return;
      }
      await axios.post(
        `http://localhost:8000/api/questions/${post._id}/votes`,
        { vote: vote },
        { withCredentials: true },
      );
    } else {
      if (user && user.reputation < 50) {
        setAnswerVoteError("Not enough reputation");
        return;
      }
      await axios.post(
        `http://localhost:8000/api/answers/${post._id}/votes`,
        { vote: vote },
        { withCredentials: true },
      );
    }
  };

  if (question === undefined) return <p>Question Not Found...</p>;

  const numPerPage = 5;
  const lastPage = Math.ceil(question.answers.length / numPerPage);

  return (
    <section className="flex flex-col gap-5 w-full p-6">
      <section className="w-full">
        <QuestionHeader question={question} />
      </section>
      <FormError message={questionVoteError} />
      <AnswerPostComponent post={question} voteCallback={handleVote} />
      <h2 className="text-xl">
        {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
      </h2>
      <FormError message={answerVoteError} />
      <div className="flex flex-col gap-3 overflow-y-scroll max-h-[650px]">
        <ul id="answer-list">
          {(() => {
            const renderedAnswers = [];
            for (
              let i = (page - 1) * numPerPage;
              i < (page - 1) * numPerPage + numPerPage;
              i++
            ) {
              let answer;
              let editableAns = false;
              if (fromProfile) {
                if (i < userAnswers.length) {
                  answer = userAnswers[i];
                  editableAns = true;
                } else answer = nonUserAnswers[i - userAnswers.length];
              } else answer = answers[i];
              if (answer) {
                renderedAnswers.push(
                  <AnswerPostComponent
                    key={i}
                    post={answer}
                    question={question}
                    editableAns={editableAns}
                    voteCallback={handleVote}
                    deleteAnsCallback={handleAnsDelete}
                  />,
                );
              }
            }
            return renderedAnswers;
          })()}
        </ul>
      </div>
      <PageButtons totalPages={lastPage} />
      {loggedIn && (
        <div className="inline-block">
          <Link
            to={`/questions/${question._id}/answer/`}
            className="bg-blue-500 p-2 text-white rounded hover:bg-blue-600 text-nowrap"
          >
            Answer Question
          </Link>
        </div>
      )}
    </section>
  );
}
