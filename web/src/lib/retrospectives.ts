import fs from "fs";
import path from "path";

export interface Retrospective {
  slug: string;
  date: string;
  title: string;
  content: string;
  sections: Section[];
}

export interface Section {
  heading: string;
  content: string;
}

const RETROSPECTIVES_DIR = path.join(process.cwd(), "..", "retrospectives");

function parseMarkdown(raw: string): { title: string; sections: Section[] } {
  const lines = raw.split("\n");
  let title = "";
  const sections: Section[] = [];
  let currentHeading = "";
  let currentContent: string[] = [];

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (currentHeading) {
        sections.push({
          heading: currentHeading,
          content: currentContent.join("\n").trim(),
        });
      }
      title = line.replace("## ", "").trim();
      currentHeading = "";
      currentContent = [];
    } else if (line.startsWith("### ")) {
      if (currentHeading) {
        sections.push({
          heading: currentHeading,
          content: currentContent.join("\n").trim(),
        });
      }
      currentHeading = line.replace("### ", "").trim();
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }

  if (currentHeading) {
    sections.push({
      heading: currentHeading,
      content: currentContent.join("\n").trim(),
    });
  }

  return { title, sections };
}

export function getAllRetrospectives(): Retrospective[] {
  const files = fs.readdirSync(RETROSPECTIVES_DIR).filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const slug = filename.replace(".md", "");
      const raw = fs.readFileSync(path.join(RETROSPECTIVES_DIR, filename), "utf-8");
      const { title, sections } = parseMarkdown(raw);

      return {
        slug,
        date: slug,
        title,
        content: raw,
        sections,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getRetrospective(slug: string): Retrospective | null {
  const filePath = path.join(RETROSPECTIVES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { title, sections } = parseMarkdown(raw);

  return {
    slug,
    date: slug,
    title,
    content: raw,
    sections,
  };
}
