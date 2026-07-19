import { Fragment } from "react";

/**
 * Content authored in `content/*.md` uses plain-markdown emphasis
 * (`**bold**`, `` `code` ``) since it's meant to be human-edited prose.
 * The compiled `src/content/*.ts` modules carry that markdown through
 * verbatim (BUILD-SPEC §7.1 — the pipeline doesn't rewrite authored
 * text), so any component rendering a `summary`/`body`/`method`/`caveat`/
 * `receipt` field must run it through this renderer rather than
 * interpolating the raw string — otherwise the asterisks/backticks show
 * up literally. `**bold**` becomes `<strong>`; `` `code` `` becomes
 * `<code>` in the mono face (§5.3's "labels, IDs" usage). No other
 * markdown is supported on purpose — this is a display-only convenience,
 * not a Markdown renderer, and the content is trusted (authored by
 * Prashant / the build pipeline, never user input).
 */
export function Prose({ text }: { text: string }) {
  return <>{renderInlineMarkdown(text)}</>;
}

const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`)/g;

function renderInlineMarkdown(text: string) {
  const parts = text.split(TOKEN);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code className="ledger-inline-code" key={i}>
          {part.slice(1, -1)}
        </code>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
