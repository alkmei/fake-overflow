import TagName from "@/components/TagName.tsx";
import { IconEdit, IconX } from "@tabler/icons-react";
import FormError from "@/components/FormError.tsx";
import Tag from "@server/types/tag";
import { FormEvent, useEffect, useState } from "react";

export default function TagComponent({
  t,
  questionLength,
  viewEdit,
  deleting,
  deleteCallback,
  editCallback,
}: {
  t: Tag;
  questionLength: number;
  viewEdit?: boolean;
  deleting?: boolean;
  deleteCallback?: (t: Tag) => Promise<string>;
  editCallback?: (editName: string, editTag: Tag) => Promise<string>;
}) {
  const [name, setName] = useState("");
  const [editName, setEditName] = useState("");
  const [editError, setEditError] = useState("");
  const [editing, setEditing] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    setName(t.name);
  }, [t.name]);

  const handleTagEdit = (t: Tag) => {
    setEditing(!editing);
    setEditName(t.name);
  };

  const handleEditSubmit = async (event: FormEvent) => {
    event.preventDefault();
    let valid = true;

    if (editName.trim() === "") {
      valid = false;
      setEditError("Tag cannot be empty");
    }

    if (valid && editCallback) {
      editCallback(editName, t)
        .then((res) => {
          setName(editName);
          setEditing(false);
          setEditError(res);
        })
        .catch((err) => setEditError(err));
    }
  };

  const handleDelete = () => {
    if (deleteCallback)
      deleteCallback(t)
        .then((res) => setDeleteError(res))
        .catch((err) => setDeleteError(err));
  };

  return (
    <div>
      <div className="border p-4 w-60 rounded-md flex flex-row justify-between">
        <div>
          <TagName name={name} />
          <p className="mt-3 text-sm text-gray-500">
            <span>{questionLength}&nbsp;</span>
            question
            {questionLength === 1 ? "" : "s"}
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
              onClick={handleDelete}
            >
              <IconX width={16} height={16} />
            </button>
          </div>
        )}
      </div>
      {deleting && <FormError message={deleteError} />}
      {editing && (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            id="title"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="border p-0.5 mt-2 rounded-md relative outline-none text-sm"
          />
          <FormError message={editError} />
          <button className=" text-blue-500 text-nowrap text-xs">
            Submit Edit
          </button>
        </form>
      )}
    </div>
  );
}
