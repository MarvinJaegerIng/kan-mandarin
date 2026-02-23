import { notFound } from "next/navigation";
import { mockStories } from "@/data/stories";
import { Reader } from "@/components/reader/Reader";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface StoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { id } = await params;
  const story = mockStories.find((s) => s.id === id);
  if (!story) notFound();

  return (
    <div className="mx-auto flex max-w-2xl flex-col px-6 py-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Library
      </Link>
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">{story.title}</h1>
        {story.titlePinyin && (
          <p className="mt-1 text-muted-foreground">{story.titlePinyin}</p>
        )}
        <p className="mt-1 text-sm text-muted-foreground">{story.titleTranslation}</p>
        <span className="mt-2 inline-block rounded bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
          HSK {story.difficulty}
        </span>
      </header>
      <Reader story={story} />
    </div>
  );
}
