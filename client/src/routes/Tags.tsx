import ContentHeader from "@/components/ContentHeader.tsx";
import TagList from "@/components/TagList.tsx";
import axios from "axios";
import { useEffect, useState } from "react";
import Tag from "@server/types/tag";

export default function Tags() {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/tags").then((res) => {
      setTags(res.data);
    });
  }, []);

  return (
    <div className="flex flex-col w-full">
      <section className="w-full">
        <ContentHeader name={"Tags"} noSort={true} />
      </section>
      <TagList initTags={tags} viewEdit={false} />
    </div>
  );
}
