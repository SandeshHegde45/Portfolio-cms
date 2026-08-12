import { promises as fs } from "fs";
import path from "path";
import { defaultContent } from "@/lib/data/defaultContent";

const contentFilePath = path.join(process.cwd(), "data", "content.json");

export async function readContent() {
  try {
    const raw = await fs.readFile(contentFilePath, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    return defaultContent;
  }
}

export async function writeContent(nextContent) {
  const serialized = JSON.stringify(nextContent, null, 2);
  await fs.writeFile(contentFilePath, serialized, "utf-8");
  return nextContent;
}

export async function updateContentSection(sectionKey, sectionValue) {
  const current = await readContent();
  const updated = {
    ...current,
    [sectionKey]: sectionValue
  };
  return writeContent(updated);
}
