import Link from "next/link";
import { Github } from "lucide-react";

export function Header() {
  return (
    <header
      title="header"
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg"
    >
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-base font-medium tracking-tight text-foreground transition-colors hover:text-foreground/80"
        >
          타래의 회고록
        </Link>
        <a
          href="https://github.com/junghwaYang"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <Github className="h-5 w-5" />
        </a>
      </div>
    </header>
  );
}
