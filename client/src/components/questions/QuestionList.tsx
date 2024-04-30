import QuestionComponent from "@/components/questions/QuestionComponent.tsx";

export type Tag = {
  id: number;
  name: string;
};

export type Question = {
  title: string;
  summary: string;
  askDateTime: Date;
  askedBy: string;
  views: number;
  votes: number;
  numAnswers: number;
  id: number;
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
