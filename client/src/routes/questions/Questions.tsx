import ContentHeader from "@/components/ContentHeader.tsx";
import QuestionList from "@/components/questions/QuestionList.tsx";
import { Question } from "@/components/questions/QuestionList.tsx";

const tempQuestions: Question[] = [
  {
    title:
      "This is a Titleasdfahujioasdhuisdhuisdfhuisdfhuhuisdhuisdhuisdhuisfhuisdfhuhuisdhuisdhuisdhuisdhuisdhuisdhuisdhuisdfhuisdfhuisdfhuisdfhusdfhu",
    summary:
      "This is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summary",
    askDateTime: new Date(),
    askedBy: "me!!!",
    views: 2,
    votes: 3,
    numAnswers: 0,
    id: 1,
    tags: [
      { id: 100, name: "react" },
      { id: 200, name: "wolfie2d" },
    ],
  },
  {
    title: "This is a Title2",
    summary: "This is a summary2",
    askDateTime: new Date(),
    askedBy:
      "me!!!asdasdasdasdsadadfgyuiasghbuisdfghsdfhusdfhusdfhusdfhusdfhusdfhusdfhusdfhusdfhusdfhufsdhusdfhuisdfhuisdsdfhuio",
    views: 0,
    votes: 3453,
    numAnswers: 9999,
    id: 2,
    tags: [
      { id: 100, name: "react" },
      { id: 200, name: "wolfie2d" },
    ],
  },
];

export default function Questions() {
  return (
    <section className="w-full">
      <ContentHeader name={"All Questions"} />
      <QuestionList questions={tempQuestions} />
    </section>
  );
}
