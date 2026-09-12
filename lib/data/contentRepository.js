import { put, get } from "@vercel/blob";
import { defaultContent } from "@/lib/data/defaultContent";

const CONTENT_PATHNAME = "portfolio/content.json";

export async function readContent() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return defaultContent;
  }

  try {
    const result = await get(CONTENT_PATHNAME, {
      access: "private",
      useCache: false,
    });

    if (!result || result.statusCode !== 200) {
      return defaultContent;
    }

    const text = await new Response(result.stream).text();
    return JSON.parse(text);
  } catch (error) {
    return defaultContent;
  }
}

export async function writeContent(nextContent) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN is not set. Create a Blob store in your Vercel project and connect it before saving content.",
    );
  }

  const serialized = JSON.stringify(nextContent, null, 2);

  await put(CONTENT_PATHNAME, serialized, {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });

  return nextContent;
}

export async function updateContentSection(sectionKey, sectionValue) {
  const current = await readContent();
  const updated = {
    ...current,
    [sectionKey]: sectionValue,
  };
  return writeContent(updated);
}
