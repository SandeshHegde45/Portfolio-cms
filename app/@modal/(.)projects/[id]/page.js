import { notFound } from "next/navigation";
import { readContent } from "@/lib/data/contentRepository";
import { ProjectPreviewModal } from "@/components/projects/ProjectPreviewModal";

export const dynamic = "force-dynamic";

export default async function ProjectPreviewRoute({ params }) {
  const content = await readContent();
  const index = content.projects.findIndex((item) => item.id === params.id);

  if (index === -1) {
    notFound();
  }

  return (
    <ProjectPreviewModal project={content.projects[index]} index={index} />
  );
}
