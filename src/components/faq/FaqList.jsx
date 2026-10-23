import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@wron/kit";
import { Container } from "../ui";
import { FAQ } from "../../data/faq";

function Item({ item, index, open, onToggle }) {
  const id = `faq-${index}`;
  return (
    <li className="border-b border-line">
      <h2 className="m-0">
        <button
          type="button"
          id={`${id}-btn`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className="sweep group flex min-h-[64px] w-full items-center gap-4 py-4 text-left transition-colors hover:text-primary"
        >
          <span className="font-mono text-[12px] tracking-[0.06em] text-muted num">{String(index + 1).padStart(2, "0")}</span>
          <span className="flex-1 text-[18px] font-[550] leading-snug tracking-[-0.01em] text-ink group-hover:text-primary md:text-[20px]">{item.q}</span>
          <Plus className={cn("h-5 w-5 shrink-0 text-accent transition-transform duration-300", open && "rotate-45")} aria-hidden="true" />
        </button>
      </h2>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-btn`}
        className={cn("grid transition-[grid-template-rows] duration-300 ease-out", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
      >
        <div className="min-h-0 overflow-hidden" aria-hidden={!open} inert={!open ? "" : undefined}>
          <p className="max-w-3xl pb-6 pl-9 pr-8 text-[17px] leading-[1.6] text-muted">{item.a}</p>
        </div>
      </div>
    </li>
  );
}

export default function FaqList() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <Container className="py-12 md:py-16">
      <ul className="mx-auto max-w-4xl border-t border-line">
        {FAQ.map((item, i) => (
          <Item key={item.q} item={item} index={i} open={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? -1 : i)} />
        ))}
      </ul>
      <p className="mx-auto mt-6 max-w-4xl text-[14px] leading-relaxed text-muted">For entertainment and personal reflection, not prediction or scientific assessment.</p>
    </Container>
  );
}
