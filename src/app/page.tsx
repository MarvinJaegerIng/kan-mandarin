import { redirect } from "next/navigation";

/** Standalone-App ist die Hauptapp; Startseite leitet dorthin weiter. */
export default function Home() {
  redirect("/app-standalone.html");
}
