import QuestionComponent from "@/components/questions/QuestionComponent.tsx";

export type Tag = {
  id: number;
  name: string;
};

export type Answer = {
  text: string;
  ansBy: string;
  ansDateTime: Date;
};

export type Question = {
  text: string;
  title: string;
  summary: string;
  askDateTime: Date;
  askedBy: string;
  views: number;
  votes: number;
  id: number;
  answers: Answer[];
  tags: Tag[];
};

export default function QuestionList({ questions }: { questions: Question[] }) {
  if (questions.length === 0) return <h1>No Questions Found</h1>;

  return (
    <ul id="question-list">
      {questions.map((question, index) => (
        <div key={index}>
          <QuestionComponent question={question} />
        </div>
      ))}
    </ul>
  );
}
