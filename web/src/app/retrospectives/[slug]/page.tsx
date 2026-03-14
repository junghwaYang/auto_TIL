import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

import { getRetrospective, getAllRetrospectives } from "@/lib/retrospectives";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionCard } from "@/components/section-card";
import { PageTransition } from "@/components/page-transition";
import { AnimatedSection } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export async function generateStaticParams() {
  const retrospectives = getAllRetrospectives();
  return retrospectives.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const retrospective = getRetrospective(slug);
  if (!retrospective) return { title: "Not Found" };

  return {
    title: `${retrospective.title} - 타래의 회고록`,
    description: `${format(new Date(slug), "yyyy년 M월 d일")} 회고`,
  };
}

export default async function RetrospectiveDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const retrospective = getRetrospective(slug);

  if (!retrospective) {
    notFound();
  }

  const formattedDate = format(new Date(slug), "yyyy년 M월 d일");

  const allRetros = getAllRetrospectives(); // sorted desc
  const currentIndex = allRetros.findIndex((r) => r.slug === slug);
  const newerPost = currentIndex > 0 ? allRetros[currentIndex - 1] : null;
  const olderPost = currentIndex < allRetros.length - 1 ? allRetros[currentIndex + 1] : null;

  return (
    <div title="retrospective-detail" className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-3xl px-6 py-12">
        <PageTransition>
          {/* Back navigation */}
          <Link
            href="/"
            className="group mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            돌아가기
          </Link>

          {/* Article header */}
          <header className="mb-10">
            <div className="mb-4">
              <Badge variant="secondary" className="text-xs font-normal">
                {formattedDate}
              </Badge>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {retrospective.title}
            </h1>
          </header>

          <div title="ai-notice" className="mb-10 rounded-lg border border-border/60 bg-muted/30 px-4 py-3">
            <p className="text-sm text-muted-foreground">
              해당 글은 AI가 작성하였습니다.
            </p>
          </div>

          <Separator className="mb-10" />
        </PageTransition>

        {/* Sections */}
        <div className="space-y-6">
          {retrospective.sections.map((section, index) => (
            <AnimatedSection key={index} index={index}>
              <SectionCard
                heading={section.heading}
                content={section.content}
              />
            </AnimatedSection>
          ))}
        </div>

        {/* Prev / Next navigation */}
        <nav title="post-navigation" className="mt-16 mb-8">
          <Separator className="mb-6" />
          <div className="grid grid-cols-2 gap-4">
            {olderPost ? (
              <Link
                href={`/retrospectives/${olderPost.slug}`}
                className="group flex items-start gap-2 rounded-lg border border-border/60 px-4 py-3 transition-all hover:border-border hover:bg-muted/30"
              >
                <ChevronLeft className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-0.5" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">이전 글</p>
                  <p className="mt-0.5 truncate text-sm font-medium text-foreground">
                    {olderPost.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {newerPost ? (
              <Link
                href={`/retrospectives/${newerPost.slug}`}
                className="group flex items-start justify-end gap-2 rounded-lg border border-border/60 px-4 py-3 text-right transition-all hover:border-border hover:bg-muted/30"
              >
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">다음 글</p>
                  <p className="mt-0.5 truncate text-sm font-medium text-foreground">
                    {newerPost.title}
                  </p>
                </div>
                <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </nav>
      </main>

      <Footer />
    </div>
  );
}
