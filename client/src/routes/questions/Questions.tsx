import ContentHeader from "@/components/ContentHeader.tsx";
import QuestionList from "@/components/questions/QuestionList.tsx";
import Question from "@server/types/question";

const tempQuestions: Question[] = [
  {
    title:
      "This is a Titleasdfahujioasdhuisdhuisdfhuisdfhuhuisdhuisdhuisdhuisfhuisdfhuhuisdhuisdhuisdhuisdhuisdhuisdhuisdhuisdfhuisdfhuisdfhuisdfhusdfhu",
    summary:
      "This is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summary",
    askDateTime: new Date(),
    askedBy: "MIGUEL ANGEL HERNANDEZ CAMACHO",
    text: "this is my text",
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
    tags: [{ name: "wolfie", id: 1 }],
  },
  {
    title: "This is a Title2",
    text: "this is my text2",
    summary: "This is a summary2",
    askDateTime: new Date(),
    askedBy:
      "me!!!asdasdasdasdsadadfgyuiasghbuisdfghsdfhusdfhudsaabjjbdsdfhusdfhusdfhusdfhusdfhusdfhusdfhusdfhufsdhusdfhuisdfhuisdsdfhuio",
    views: 0,
    votes: 3453,
    id: 2,
    answers: [
      {
        text: "hi this is a good question 2",
        ansBy: "me answer q 2",
        ansDateTime: new Date(),
      },
      {
        text: "hi this is a good question 1231231231231",
        ansBy: "me answer q 1231231",
        ansDateTime: new Date(),
      },
    ],
    tags: [{ name: "wolfie", id: 1 }],
  },
];

export default function Questions() {
  return (
    <section className="w-full">
      <ContentHeader
        name={"All Questions"}
        questionCount={tempQuestions.length}
      />
      <QuestionList questions={tempQuestions} />
    </section>
  );
}
