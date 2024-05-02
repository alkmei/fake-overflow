import FormError from "@/components/FormError.tsx";
import { FormEvent, useState, useEffect } from "react";
import { validateHyperlinks } from "@/helper";
import { useNavigate, useParams } from "react-router-dom";
import { tempQuestions } from "@/TempData.ts";

export default function AskQuestion({ editing }: { editing?: boolean }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");
  const [summary, setSummary] = useState("");
  const { id } = useParams();

  // if editing a question, load in data
  useEffect(() => {
    if (editing) {
      console.log(id);
      // TODO: Get question from server by id
      const question = tempQuestions[0];
      setTitle(question.title);
      setText(question.text);
      setTags(question.tags.map((tag) => tag.name).join(" "));
      setSummary(question.summary);
    }
  }, [editing, id]);

  const [titleError, setTitleError] = useState("");
  const [textError, setTextError] = useState("");
  const [tagsError, setTagsError] = useState("");
  const [summaryError, setSummaryError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    let valid = true;

    setTitleError("");
    setTextError("");
    setTagsError("");
    setSummaryError("");

    if (title.trim() === "") {
      setTitleError("Title cannot be empty");
      valid = false;
    }

    if (title.length > 50) {
      setTitleError("Title must be 50 characters or less");
      valid = false;
    }

    if (!validateHyperlinks(text)) {
      setTextError("Invalid hyperlink");
      valid = false;
    }

    if (text.trim() === "") {
      setTextError("Question text cannot be empty");
      valid = false;
    }

    if (tags.trim() === "") {
      setTagsError("Tags cannot be empty");
      valid = false;
    }

    if (!validateTags(tags)) {
      setTagsError(
        "Should not be more than 5 tags. Each tag is one word, " +
          "hyphenated words are considered one word. " +
          "The length of a new tag cannot be more than 20 characters.",
      );
      valid = false;
    }

    if (summary.trim() === "") {
      setSummaryError("Summary cannot be empty");
      valid = false;
    }

    if (valid) {
      const tagSet = new Set(tags.trim().split(/\s+/));

      const newQuestion = {
        title: title,
        text: text,
        summary: summary,
        tags: Array.from(tagSet),
        author: "username here", // this will be a user
      };

      console.log(newQuestion);

      if (editing) {
        // TODO: edit question instead of adding it to db
      } else {
        // // TODO: add new question
        // axios
        //     .post("http://localhost:8000/posts/question", newQuestion)
        //     .then((res) => {
        //       console.log(res);
        //       console.log(res.data);
        //     });
      }

      navigate("/questions");
    }
  };

  const validateTags = (tags: string) => {
    const tagsSet = new Set(tags.trim().split(/\s+/));
    if (tagsSet.size > 5) {
      return false;
    }

    for (const tag of tagsSet) {
      if (tag.length > 20) {
        return false;
      }
    }

    return true;
  };

  return (
    <section className="w-full p-8">
      <h1 className="text-2xl font-bold mb-4">Ask a question</h1>
      <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col border rounded p-2 bg-gray-50 gap-2">
          <label htmlFor="title" className="font-bold text-gray-900">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="rounded p-2 border"
            placeholder="Enter title here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormError message={titleError} />
        </div>
        <div className="flex flex-col border rounded p-2 bg-gray-50 gap-2">
          <label htmlFor="summary" className="font-bold text-gray-900">
            Summary
          </label>
          <textarea
            name="summary"
            cols={30}
            rows={10}
            value={summary}
            className="rounded border p-2"
            placeholder="Enter summary here..."
            onChange={(e) => setSummary(e.target.value)}
          ></textarea>
          <FormError message={summaryError} />
        </div>
        <div className="flex flex-col border rounded p-2 bg-gray-50 gap-2">
          <label htmlFor="body" className="font-bold text-gray-900">
            Question Text
          </label>
          <textarea
            name="body"
            cols={30}
            rows={10}
            value={text}
            className="rounded border p-2"
            placeholder="Enter question text here..."
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <FormError message={textError} />
        </div>
        <div className="flex flex-col border rounded p-2 bg-gray-50 gap-2">
          <label htmlFor="tags" className="font-bold text-gray-900">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            className="rounded p-2 border"
            placeholder="Enter tags here..."
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <FormError message={tagsError} />
        </div>
        <button className="bg-blue-600 p-2 rounded text-white hover:bg-blue-700">
          Submit
        </button>
      </form>
    </section>
  );
}
