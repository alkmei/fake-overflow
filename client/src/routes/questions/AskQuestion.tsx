import FormError from "@/components/FormError.tsx";

export default function AskQuestion() {
  return (
    <section className="w-full p-8">
      <h1 className="text-2xl font-bold mb-4">Ask a question</h1>
      <form action="" className="flex flex-col gap-4">
        <div className="flex flex-col border rounded p-2 bg-gray-50 gap-2">
          <label htmlFor="title" className="font-bold text-gray-900">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="rounded p-2 border"
            placeholder="Enter title here..."
          />
          <FormError message="Title must be 50 characters or less" />
        </div>
        <div className="flex flex-col border rounded p-2 bg-gray-50 gap-2">
          <label htmlFor="summary" className="font-bold text-gray-900">
            Summary
          </label>
          <textarea
            name="summary"
            cols={30}
            rows={10}
            className="rounded border p-2"
            placeholder="Enter summary here..."
          ></textarea>
          <FormError message="Summary must be 140 characters or less" />
        </div>
        <div className="flex flex-col border rounded p-2 bg-gray-50 gap-2">
          <label htmlFor="body" className="font-bold text-gray-900">
            Question Text
          </label>
          <textarea
            name="body"
            cols={30}
            rows={10}
            className="rounded border p-2"
            placeholder="Enter question text here..."
          ></textarea>
          <FormError message={"Question Text cannot be empty"} />
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
          />
          <FormError
            message={
              "Should not be more than 5 tags. Each tag is one word, " +
              "hyphenated words are considered one word. " +
              "The length of a new tag cannot be more than 20 characters"
            }
          />
        </div>
        <button className="bg-blue-600 p-2 rounded text-white hover:bg-blue-700">
          Submit
        </button>
      </form>
    </section>
  );
}
