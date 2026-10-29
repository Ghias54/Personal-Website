/**
 * Title-case a heading (Chicago-style):
 * - Capitalize the first letter of every word, keeping the rest as written
 *   (so "GitHub", "MCP", "AI", "SQL" stay intact).
 * - Keep short articles, conjunctions and prepositions lowercase, unless
 *   they're the first or last word or follow a colon.
 * - Hyphenated words are capitalized on each part ("Point-in-Time").
 */
const SMALL = new Set([
  "a", "an", "the",
  "and", "but", "or", "nor", "for", "so", "yet",
  "as", "at", "by", "in", "of", "off", "on", "per", "to", "up", "via", "vs", "vs.",
]);

const capFirst = (w: string) => w.replace(/^([^A-Za-z]*)([a-z])/, (_, pre, c) => pre + c.toUpperCase());

export function titleCase(input: string): string {
  const words = input.split(/(\s+)/);
  const real = words.map((w, i) => ({ w, i })).filter(({ w }) => w.trim() !== "");
  const firstIdx = real[0]?.i;
  const lastIdx = real[real.length - 1]?.i;

  let afterColon = false;
  return words
    .map((word, i) => {
      if (word.trim() === "") return word;
      const forceCap = i === firstIdx || i === lastIdx || afterColon;
      afterColon = /[:.]$/.test(word);

      return word
        .split("-")
        .map((part, pi) => {
          const bare = part.toLowerCase().replace(/[^a-z.]/g, "");
          const isSmall = SMALL.has(bare);
          // Leave words that already contain capitals or digits-only alone except first letter
          if (isSmall && !(forceCap && pi === 0)) return part;
          return capFirst(part);
        })
        .join("-");
    })
    .join("");
}

/** Title-case the text of <h3> headings in rendered HTML (skips headings containing tags). */
export function titleCaseH3(html: string): string {
  return html.replace(/<h3([^>]*)>([^<]*)<\/h3>/g, (_, attrs, text) => `<h3${attrs}>${titleCase(text)}</h3>`);
}
