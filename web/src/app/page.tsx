import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarDays } from "lucide-react";

import { getAllRetrospectives } from "@/lib/retrospectives";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/page-transition";
import { AnimatedCard } from "@/components/animated-card";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return format(date, "yyyy년 M월 d일 (EEEE)", { locale: ko });
}

function getPreview(content: string, maxLength = 150): string {
  const withoutHeadings = content
    .split("\n")
    .filter((line) => !line.startsWith("#"))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  if (withoutHeadings.length <= maxLength) return withoutHeadings;
  return withoutHeadings.slice(0, maxLength).trimEnd() + "...";
}

export default function Home() {
  const retrospectives = getAllRetrospectives();

  return (
    <div title="home-page" className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <PageTransition>
          <section className="mx-auto max-w-3xl px-6 pt-20 pb-12">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              타래의 회고록
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              매일의 성장을 기록하는 회고 블로그
            </p>
          </section>
        </PageTransition>

        {/* Daily Reflect CTA */}
        <section title="daily-reflect-cta" className="mx-auto max-w-3xl px-6 pb-8">
          <a
            href="https://github.com/junghwaYang/daily-reflect"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-lg border border-border/60 bg-muted/30 px-5 py-4 transition-all hover:border-border hover:bg-muted/50"
          >
            <span className="text-2xl">🪞</span>
            <div>
              <p className="text-sm font-medium text-foreground group-hover:text-foreground/80 transition-colors">
                회고록 자동화 데스크톱 앱 사용하기
              </p>
              <p className="text-xs text-muted-foreground">
                Daily Reflect — AI가 매일 회고를 써줍니다
              </p>
            </div>
          </a>
        </section>

        {/* Retrospective list */}
        <section className="mx-auto max-w-3xl px-6 pb-24">
          <div className="flex flex-col gap-4">
            {retrospectives.length === 0 && (
              <p className="py-12 text-center text-muted-foreground">
                아직 작성된 회고가 없습니다.
              </p>
            )}

            {retrospectives.map((retro, i) => (
              <AnimatedCard
                key={retro.slug}
                href={`/retrospectives/${retro.slug}`}
                index={i}
              >
                <Card className="transition-all duration-200 hover:ring-foreground/20">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="font-normal">
                        <CalendarDays className="mr-1 h-3 w-3" />
                        {formatDate(retro.date)}
                      </Badge>
                    </div>
                    <CardTitle className="mt-1 text-lg font-semibold tracking-tight">
                      {retro.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 leading-relaxed">
                      {getPreview(retro.content)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1.5">
                      {retro.sections.slice(0, 4).map((section) => (
                        <Badge
                          key={section.heading}
                          variant="outline"
                          className="text-xs font-normal text-muted-foreground"
                        >
                          {section.heading}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
