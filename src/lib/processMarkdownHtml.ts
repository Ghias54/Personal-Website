export type HtmlSegment =
  | { type: "html"; content: string }
  | { type: "figure"; description: string; caption: string };

const IMAGE_RE = /<p>\[IMAGE:\s*([^|<]+)\s*\|\s*([^\]]+)\]<\/p>/g;

export function splitFigures(html: string): HtmlSegment[] {
  const segments: HtmlSegment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  IMAGE_RE.lastIndex = 0;
  while ((match = IMAGE_RE.exec(html)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "html", content: html.slice(lastIndex, match.index) });
    }
    segments.push({
      type: "figure",
      description: match[1].trim(),
      caption: match[2].trim(),
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < html.length) {
    segments.push({ type: "html", content: html.slice(lastIndex) });
  }

  return segments;
}

export type CaseSection = {
  label: string;
  html: string;
};

export function splitCaseSections(html: string): CaseSection[] {
  const parts = html.split(/(?=<h2\b)/i).filter((part) => part.trim().length > 0);
  const sections: CaseSection[] = [];

  for (const part of parts) {
    const match = part.match(/^<h2[^>]*>([\s\S]*?)<\/h2>([\s\S]*)$/i);
    if (match) {
      const label = match[1].replace(/<[^>]+>/g, "").trim();
      sections.push({ label, html: match[2].trim() });
    } else if (part.trim()) {
      sections.push({ label: "", html: part.trim() });
    }
  }

  return sections;
}
