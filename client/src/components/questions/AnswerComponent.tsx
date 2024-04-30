import { timeSinceDate } from "@/helper.tsx";
import PostText from "@/components/questions/PostText.tsx";
import { Answer } from "@/components/questions/QuestionList.tsx";

export default function AnswerComponent({ answer }: { answer: Answer }) {
  return (
    <li className="answer bottom-separator">
      <PostText text={answer.text} />
      <p className="answer__author">
        <span className="answer__author-link">{answer.ansBy} </span>
        answered {timeSinceDate(answer.ansDateTime)}
      </p>
    </li>
  );
}
