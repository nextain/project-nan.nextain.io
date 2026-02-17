import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionReveal } from "@/components/home/section-reveal";
import type { HomeFaqItem } from "@/lib/home-docs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Faq({ title, items }: { title: string; items: HomeFaqItem[] }) {
  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 py-16 md:py-20">
      <SectionReveal>
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        </div>
      </SectionReveal>

      <Accordion type="single" collapsible className="w-full">
        {items.map((item, idx) => (
          <SectionReveal key={item.question} delay={idx * 40}>
            <AccordionItem value={`item-${idx}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }) => <p>{children}</p>,
                    ul: ({ children }) => <ul className="list-disc space-y-1 pl-5">{children}</ul>,
                  }}
                >
                  {item.answer}
                </ReactMarkdown>
              </AccordionContent>
            </AccordionItem>
          </SectionReveal>
        ))}
      </Accordion>
    </section>
  );
}
