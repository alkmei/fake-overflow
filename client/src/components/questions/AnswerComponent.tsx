import { timeSinceDate } from "@/helper";
import PostText from "@/components/questions/PostText.tsx";
import Answer from "@server/types/answer";

export default function AnswerComponent({ answer }: { answer: Answer }) {
  return (
    <li className="bottom-separator">
      <PostText text={answer.text} />
      <p className="answer__author">
        <span className="answer__author-link">{answer.ansBy.username} </span>
        answered {timeSinceDate(answer.ansDateTime)}
      </p>
    </li>
  );
}
