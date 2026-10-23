import { ArrowRight, ArrowDown } from "lucide-react";
import { Container, SectionHeading, Panel, MonoLabel } from "../ui";
import { SKIP_RULE, REDUCTION_RULE } from "../../data/coreNumbers";
import { LETTER_TABLE } from "../../lib/engine";

function Step({ label, children }) {
  return (
    <Panel className="flex-1 p-5">
      <MonoLabel>{label}</MonoLabel>
      <div className="mt-3 text-[16px] leading-[1.6] text-ink/90">{children}</div>
    </Panel>
  );
}

export default function WhatItUses({ guide }) {
  const isBirthday = guide.key === "birthday";
  const isDestiny = guide.key === "destiny";
  const included =
    guide.key === "soulUrge" ? "A E I O U (Y counts as a consonant)"
    : guide.key === "personality" ? "B C D F G H J K L M N P Q R S T V W X Y Z"
    : isBirthday ? "Digits of the day of the month, 1 to 31"
    : isDestiny ? "Life Path value and Expression value"
    : "All letters A to Z in the full name";
  const source = isBirthday ? "Birthdate: the day only" : isDestiny ? "Birthdate and full name, through two other numbers" : "Full name as you enter it";
  const master = isBirthday ? "The total stops at 11 or 22 if the day is one of those." : "The total stops at 11, 22 or 33 if it passes through one. The base (2, 4 or 6) is shown as a second reading.";

  return (
    <section className="border-b border-line py-14 md:py-20">
      <Container>
        <SectionHeading eyebrow="What it uses" title="From your entry to one number" lead="Every Core Number follows the same path: source data, included characters, then reduction." />
        <div className="mt-10 flex flex-col items-stretch gap-3 lg:flex-row">
          <Step label="1 · Source">{source}</Step>
          <ArrowJoin />
          <Step label="2 · Included"><span className="font-mono text-[14px] tracking-[0.06em]">{included}</span></Step>
          <ArrowJoin />
          <Step label="3 · Reduce">{REDUCTION_RULE}</Step>
          <ArrowJoin />
          <Step label="4 · Result"><span className="font-mono text-[13px] tracking-[0.06em] text-primary">{guide.formula}</span><p className="mt-3 text-[15px] text-muted">{master}</p></Step>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-12">
          {!isBirthday && (
            <div className="border-t border-line pt-5 md:col-span-6">
              <MonoLabel>Skipped characters</MonoLabel>
              <p className="mt-3 text-[16px] leading-[1.6] text-ink/85">{SKIP_RULE}</p>
            </div>
          )}
          <div className={`border-t border-line pt-5 ${isBirthday ? "md:col-span-12" : "md:col-span-6"}`}>
            <MonoLabel>Master number retention point</MonoLabel>
            <p className="mt-3 text-[16px] leading-[1.6] text-ink/85">{master}</p>
          </div>
        </div>
        {!isBirthday && !isDestiny && (
          <div className="mt-8">
            <MonoLabel>Letter values</MonoLabel>
            <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-9">
              {LETTER_TABLE.map((r) => (
                <li key={r.value} className="rounded-theme border border-line bg-surface px-3 py-2">
                  <span className="num block text-lg font-semibold text-primary">{r.value}</span>
                  <span className="font-mono text-[12px] tracking-[0.06em] text-muted">{r.letters.join(" ")}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}

function ArrowJoin() {
  return (
    <div className="flex items-center justify-center text-primary/70" aria-hidden="true">
      <ArrowDown className="h-5 w-5 lg:hidden" />
      <ArrowRight className="hidden h-5 w-5 lg:block" />
    </div>
  );
}
