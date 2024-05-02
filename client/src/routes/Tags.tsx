import ContentHeader from "@/components/ContentHeader.tsx";
import { tags } from "@/TempData.ts";
import TagList from "@/components/TagList.tsx";

export default function Tags() {
  return (
    <div className="flex flex-col w-full">
      <section className="w-full">
        <ContentHeader name={"Tags"} />
      </section>
      <TagList tags={tags} />
    </div>
  );
}
