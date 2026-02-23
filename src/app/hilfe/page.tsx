import Link from "next/link";
import {
  BookOpen,
  Type,
  Volume2,
  ExternalLink,
  Headphones,
  MousePointer,
} from "lucide-react";

export const metadata = {
  title: "Hilfe – Kan Mandarin",
  description: "Anleitung und Links für Kan Mandarin.",
};

export default function HilfePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="mb-2 text-2xl font-semibold text-foreground">Hilfe</h1>
      <p className="mb-10 text-muted-foreground">
        Kurze Anleitung und nützliche Links.
      </p>

      {/* Anleitung */}
      <section className="mb-12">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Anleitung
        </h2>
        <ul className="space-y-6 text-muted-foreground">
          <li className="flex gap-3">
            <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <span>
              <strong className="text-foreground">Bibliothek</strong> – Auf der
              Startseite (Library) eine Geschichte auswählen und anklicken.
            </span>
          </li>
          <li className="flex gap-3">
            <Type className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <span>
              <strong className="text-foreground">Pinyin ein-/ausschalten</strong>{" "}
              – Oben im Leser den Button „Pinyin An“ bzw. „Pinyin Aus“ nutzen.
              Pinyin erscheint oder verschwindet über den chinesischen Zeichen.
            </span>
          </li>
          <li className="flex gap-3">
            <MousePointer className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <span>
              <strong className="text-foreground">Zeichen nachschlagen</strong> –
              Ein Zeichen oder Wort anklicken. Es öffnet sich ein Fenster mit
              Bedeutung, Pinyin und HSK-Stufe. Über das Lautsprecher-Symbol kannst
              du die Aussprache abspielen (Browser-Sprache).
            </span>
          </li>
          <li className="flex gap-3">
            <Headphones className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <span>
              <strong className="text-foreground">Audio</strong> – Unten den
              Play-/Pause-Button nutzen, um die Geschichte abzuspielen (falls
              Audio vorhanden). Mit dem Schieberegler an jede Stelle springen.
            </span>
          </li>
          <li className="flex gap-3">
            <Volume2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <span>
              Alles läuft im Browser. Es werden keine Daten an einen Server
              geschickt.
            </span>
          </li>
        </ul>
      </section>

      {/* Links */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
          <ExternalLink className="h-5 w-5" />
          Links
        </h2>
        <ul className="space-y-2 text-sm">
          <li>
            <a
              href="/api-setup"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              API &amp; docs
            </a>
            {" "}
            – Anleitung auf Englisch: Nutzung der App und API-Einrichtung für Entwickler (öffnet in neuem Tab).
          </li>
        </ul>
      </section>
    </div>
  );
}
