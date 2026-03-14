import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SectionCardProps {
  heading: string;
  content: string;
}

function renderContentWithInlineCode(text: string) {
  const parts = text.split(/(`[^`]+`)/g);

  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      const code = part.slice(1, -1);
      return (
        <code
          key={index}
          className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground/90"
        >
          {code}
        </code>
      );
    }
    return part;
  });
}

export function SectionCard({ heading, content }: SectionCardProps) {
  const paragraphs = content
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <Card
      title="section-card"
      className="border-0 bg-card/50 ring-foreground/5 transition-colors hover:bg-card/80"
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight text-foreground">
          {heading}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-[0.938rem] leading-7 text-muted-foreground"
            >
              {renderContentWithInlineCode(paragraph)}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
