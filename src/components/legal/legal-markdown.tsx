import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function LegalMarkdown({ markdown }: { markdown: string }) {
  return (
    <article className="mt-8 space-y-4 text-sm leading-7 text-muted-foreground">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="mb-2 mt-6 text-lg font-semibold text-foreground">{children}</h2>
          ),
          ul: ({ children }) => <ul className="list-disc space-y-1 pl-5">{children}</ul>,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
