import { Link } from "react-router-dom";
import Tag from "@server/types/tag";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import Question from "@server/types/question";
import { IconEdit, IconX } from "@tabler/icons-react";
import FormError from "@/components/FormError.tsx";

type TagQuestionsMap = { [key: string]: Question[] };

export default function TagList({
  tags,
  viewEdit,
}: {
  tags: Tag[];
  viewEdit?: boolean;
}) {
  const [tagQuestions, setTagQuestions] = useState<TagQuestionsMap>();
  const [editTag, setEditTag] = useState<Tag>();
  const [deleteTag, setDeleteTag] = useState<Tag>();
  const [editTagName, setEditTagName] = useState("");
  const [editError, setEditError] = useState("");
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    const fetchTagQuestions = async () => {
      const tagQuestionsData: TagQuestionsMap = {};
      for (const tag of tags) {
        const res = await axios.get(
          `http://localhost:8000/api/tags/${tag.name}/questions`,
        );
        tagQuestionsData[tag.name] = res.data;
      }
      setTagQuestions(tagQuestionsData);
    };

    fetchTagQuestions().then();
  }, [tags]);

  const handleTagEdit = (t: Tag) => {
    setEditTag(t);
    setEditTagName(t.name);
  };

  const handleTagEditSubmit = (event: FormEvent) => {
    event.preventDefault();
    let valid = true;

    if (editTagName.trim() === "") {
      valid = false;
      setEditError("Tag cannot be empty");
    }

    if (valid) {
      axios
        .put(
          `http://localhost:8000/api/tags/${editTag?._id}`,
          { name: editTagName },
          {
            withCredentials: true,
          },
        )
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.error(err);
          setEditError(err.response.data.message);
        });
    }
  };

  const handleTagDelete = (t: Tag) => {
    setDeleteTag(t);
    axios
      .delete(`http://localhost:8000/api/tags/${t._id}`, {
        withCredentials: true,
      })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        setDeleteError(err.response.data.message);
      });
  };
  if (tags.length === 0)
    return <h3 className="m-5 ml-9 text-xl">No Tags Found</h3>;
  if (!tagQuestions) return <p>Page Loading...</p>;

  return (
    <ul className="flex flex-wrap gap-6 m-5">
      {tags.map((t, index) => (
        <div key={index}>
          <div className="border p-4 w-60 rounded-md flex flex-row justify-between">
            <div>
              <Link
                className="flex-grow text-sm bg-blue-100 text-blue-900
             py-0.5 px-2 rounded-md cursor-pointer w-fit transition duration-300 hover:bg-blue-200"
                to={`/questions/tagged/${t.name}`}
              >
                {t.name}
              </Link>
              <p className="mt-3 text-sm text-gray-500">
                <span>{tagQuestions[t.name]?.length || 0}&nbsp;</span>
                question
                {(tagQuestions[t.name]?.length || 0) === 1 ? "" : "s"}
              </p>
            </div>
            {viewEdit && (
              <div>
                {" "}
                <button
                  className="rounded-full border w-7 h-7 flex justify-center items-center hover:bg-[#fbdbc0] mb-1"
                  onClick={() => handleTagEdit(t)}
                >
                  <IconEdit width={16} height={16} />
                </button>
                <button
                  className="rounded-full border w-7 h-7 flex justify-center items-center hover:bg-red-200"
                  onClick={() => handleTagDelete(t)}
                >
                  <IconX width={16} height={16} />
                </button>
              </div>
            )}
          </div>
          {deleteTag === t && <FormError message={deleteError} />}
          {editTag === t && (
            <form onSubmit={handleTagEditSubmit}>
              <input
                type="text"
                id="title"
                value={editTagName}
                onChange={(e) => setEditTagName(e.target.value)}
                className="border p-0.5 mt-2 rounded-md relative outline-none text-sm"
              />
              <FormError message={editError} />
              <button className=" text-blue-500 text-nowrap text-xs">
                Submit Edit
              </button>
            </form>
          )}
        </div>
      ))}
    </ul>
  );
}
