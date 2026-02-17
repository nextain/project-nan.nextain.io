import { readFile } from "fs/promises";
import path from "path";
import type { Locale } from "@/i18n/config";

export interface HomeFaqItem {
  question: string;
  answer: string;
}

export async function readHomeFaq(lang: Locale): Promise<HomeFaqItem[]> {
  const fullPath = path.join(process.cwd(), "src", "content", "home", lang, "faq.md");
  const markdown = await readFile(fullPath, "utf-8");
  return parseFaqMarkdown(markdown);
}

function parseFaqMarkdown(markdown: string): HomeFaqItem[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const items: HomeFaqItem[] = [];

  let currentQuestion: string | null = null;
  let currentAnswerLines: string[] = [];

  const pushCurrentItem = () => {
    if (!currentQuestion) return;
    const answer = currentAnswerLines.join("\n").trim();
    if (!answer) return;
    items.push({
      question: currentQuestion,
      answer,
    });
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      pushCurrentItem();
      currentQuestion = line.slice(3).trim();
      currentAnswerLines = [];
      continue;
    }

    if (currentQuestion) {
      currentAnswerLines.push(line);
    }
  }

  pushCurrentItem();

  return items;
}
