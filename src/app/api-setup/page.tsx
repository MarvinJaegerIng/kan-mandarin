import Link from "next/link";
import { BookOpen, Code2, ExternalLink, Volume2 } from "lucide-react";

export const metadata = {
  title: "API Setup & How to Use – Kan Mandarin",
  description:
    "How to use Kan Mandarin and how to set up your own dictionary API. For everyone and for developers.",
};

export default function ApiSetupPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="mb-2 text-2xl font-semibold text-foreground">
        API Setup & How to Use
      </h1>
      <p className="mb-10 text-muted-foreground">
        Use the app as a reader, or plug in your own dictionary API. No account
        required.
      </p>

      {/* ─── For everyone ─── */}
      <section className="mb-12">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
          <BookOpen className="h-5 w-5" />
          How to use the app (no account needed)
        </h2>
        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
          <li>
            Open the <Link href="/" className="text-primary underline">Library</Link> and choose a story.
          </li>
          <li>
            Read the text. Use the <strong className="text-foreground">Pinyin An / Aus</strong> button to show or hide pinyin above the characters.
          </li>
          <li>
            <strong className="text-foreground">Click any character</strong> to see its meaning, pinyin, and HSK level in a popup. Click the speaker icon in the popup to hear the word (browser TTS).
          </li>
          <li>
            Use the <strong className="text-foreground">play / pause</strong> button at the bottom to play story audio (if available). The slider lets you jump to any position.
          </li>
          <li>
            Everything runs in your browser. No data is sent to any server; you can use it offline after the first load if you host it yourself.
          </li>
        </ul>
      </section>

      {/* ─── API setup for developers ─── */}
      <section className="mb-12">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
          <Code2 className="h-5 w-5" />
          API setup (for developers)
        </h2>
        <p className="mb-4 text-muted-foreground">
          The app uses a single function for dictionary lookups. You can keep
          the built-in mock, or plug in your own API or library so that every
          user gets your preferred dictionary.
        </p>

        <h3 className="mb-2 font-medium text-foreground">
          Where to change the API
        </h3>
        <p className="mb-3 text-sm text-muted-foreground">
          Edit the file <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">src/lib/dictionary.ts</code>.
          The function <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">lookupWord(word: string)</code> must return a{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">DictionaryEntry</code> or <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">null</code>.
        </p>

        <h3 className="mb-2 font-medium text-foreground">Option 1: Your own backend API</h3>
        <p className="mb-2 text-sm text-muted-foreground">
          Call your server (or a serverless route like <code className="rounded bg-muted px-1.5 py-0.5 font-mono">/api/dict</code>) and return the same shape:
        </p>
        <pre className="mb-4 overflow-x-auto rounded-lg border border-border bg-muted p-4 text-sm">
{`export async function lookupWord(word: string): Promise<DictionaryEntry | null> {
  const res = await fetch(\`/api/dict?q=\${encodeURIComponent(word)}\`);
  if (!res.ok) return null;
  return res.json();
}`}
        </pre>

        <h3 className="mb-2 font-medium text-foreground">Option 2: HanziJS (client-side)</h3>
        <p className="mb-2 text-sm text-muted-foreground">
          Use the HanziJS library in the browser (no server needed):
        </p>
        <ul className="mb-4 list-inside list-disc text-sm text-muted-foreground">
          <li>
            <a
              href="https://github.com/nicktaylor/hanzi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              HanziJS on GitHub
            </a>{" "}
            – install with <code className="rounded bg-muted px-1 py-0.5">npm install hanzi</code>
          </li>
          <li>
            In <code className="rounded bg-muted px-1 py-0.5">dictionary.ts</code>, call{" "}
            <code className="rounded bg-muted px-1 py-0.5">getCharacter(word)</code> and map the result to{" "}
            <code className="rounded bg-muted px-1 py-0.5">DictionaryEntry</code>.
          </li>
        </ul>

        <h3 className="mb-2 font-medium text-foreground">Expected shape</h3>
        <p className="mb-2 text-sm text-muted-foreground">
          Your API or library should provide (or be mapped to) something like:
        </p>
        <pre className="overflow-x-auto rounded-lg border border-border bg-muted p-4 text-sm">
{`{
  word: string;      // e.g. "你"
  pinyin: string;     // e.g. "nǐ"
  meaning: string;    // e.g. "you"
  hskLevel?: number;  // 1–6 optional
  audioUrl?: string;  // optional URL for word audio
}`}
        </pre>
      </section>

      {/* ─── Useful links ─── */}
      <section className="mb-12">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
          <ExternalLink className="h-5 w-5" />
          Useful links
        </h2>
        <ul className="space-y-2 text-sm">
          <li>
            <a
              href="https://github.com/nicktaylor/hanzi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              HanziJS
            </a>
            {" "}– Character decomposition and dictionary (client-side)
          </li>
          <li>
            <a
              href="https://github.com/drkameleon/complete-hsk-vocabulary"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              complete-hsk-vocabulary
            </a>
            {" "}– HSK 1–6 word lists (CC-CEDICT-based); used in the standalone HTML app
          </li>
          <li>
            <a
              href="https://cc-cedict.org/wiki/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              CC-CEDICT
            </a>
            {" "}– Open Chinese–English dictionary
          </li>
          <li>
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Next.js docs
            </a>
            {" "}– If you deploy or extend this app
          </li>
          <li>
            <a
              href="https://vercel.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Vercel
            </a>
            {" "}– Easy deploy for Next.js (free tier)
          </li>
        </ul>
      </section>

      {/* ─── Audio & content ─── */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
          <Volume2 className="h-5 w-5" />
          Audio and adding stories
        </h2>
        <p className="mb-2 text-muted-foreground">
          Stories are defined in <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">src/data/stories.ts</code>.
          To add audio: set <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">audioUrl</code> on a story (e.g.{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">/audio/story-1.mp3</code>) and put the file in{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">public/audio/</code>.
          Sentence timestamps (<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">start</code>,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">end</code> in seconds) control highlighting during playback.
        </p>
      </section>

      <p className="mt-10 text-sm text-muted-foreground">
        You can open this page in a new tab anytime via the sidebar link{" "}
        <strong className="text-foreground">API &amp; docs</strong>.
      </p>
    </div>
  );
}
