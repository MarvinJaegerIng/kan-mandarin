import Link from "next/link";
import { mockStories } from "@/data/stories";
import { BookOpen } from "lucide-react";

export default function LibraryPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-2 text-2xl font-semibold text-foreground">Library</h1>
      <p className="mb-4 text-muted-foreground">
        Choose a story to read. Each story has clickable words, pinyin toggle, and audio sync.
      </p>
      <div className="mb-8 rounded-lg border border-primary/30 bg-primary/5 p-4">
        <p className="mb-2 text-sm font-medium text-foreground">
          Version mit KI-Generierung (Neue Geschichte, Gespeicherte Wörter)
        </p>
        <p className="mb-3 text-sm text-muted-foreground">
          Mit Gemini oder ChatGPT eigene Geschichten generieren, Wörter speichern und als CSV exportieren.
        </p>
        <a
          href="/app-standalone.html"
          className="inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Zur App mit KI-Generierung →
        </a>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2">
        {mockStories.map((story) => (
          <li key={story.id}>
            <Link
              href={`/story/${story.id}`}
              className="flex gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50"
            >
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md bg-muted">
                <BookOpen className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-medium text-foreground">{story.title}</h2>
                {story.titlePinyin && (
                  <p className="text-sm text-muted-foreground">{story.titlePinyin}</p>
                )}
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {story.titleTranslation}
                </p>
                <span className="mt-2 inline-block rounded bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                  HSK {story.difficulty}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
