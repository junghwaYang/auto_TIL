import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer title="footer" className="w-full">
      <div className="mx-auto max-w-3xl px-6">
        <Separator />
        <div className="flex items-center justify-center py-8">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} 타래. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
