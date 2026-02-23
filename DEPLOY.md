# Deploy-Checkliste (Online-Betrieb)

## ✅ Bereits erfüllt

- **Keine persönlichen Daten im Code**: Keine API-Keys, Passwörter, E-Mails oder Zugangsdaten.
- **Keine Umgebungsvariablen** mit Secrets (keine `.env` mit Keys nötig für den aktuellen Stand).
- **Kein Backend für Nutzerdaten**: Keine API-Routen (`/api/*`), keine Datenbank. Die App ist rein frontend-lastig.
- **Nutzerhandeln bleibt beim Nutzer**: Alle Interaktionen (Story lesen, Pinyin an/aus, Audio) laufen nur im Browser. Es werden keine Nutzerdaten an einen Server geschickt.
- **Bei Kompromittierung des Servers**: Es liegen keine Nutzerdaten auf dem Server. Ein Angreifer bekommt nur den gleichen statischen Code/Inhalt wie alle. Dein Nachteil beschränkt sich im Wesentlichen darauf, dass die App ggf. nicht mehr erreichbar oder verändert ist – nicht auf Datenlecks deiner Nutzer.

## Wenn du später erweiterst

- **Favorites / Einstellungen**: Nur **localStorage** (oder sessionStorage) im Browser verwenden. Keine Speicherung auf deinem Server, dann bleibt alles weiterhin lokal beim Nutzer.
- **Dictionary-API**: Falls du eine echte API in `src/lib/dictionary.ts` einbaust: Keys nur über **Umgebungsvariablen** (z. B. `NEXT_PUBLIC_*` nur für öffentliche Werte). Echte Secrets gehören in Server-API-Routen, nicht ins Client-Bundle.
- **Analytics/Tracking**: Falls du später einbauen willst – bewusst entscheiden und in der Datenschutz-Erklärung angeben.

## So deployst du die App

Du hast eine **Next.js-App** (Library, Reader, Settings, Hilfe). Die **Standalone-HTML-App** (`app-standalone.html`) kannst du separat hochladen oder in `public/` legen, dann wird sie mit ausgeliefert.

---

### Option 1: Vercel (am einfachsten, kostenlos)

1. **Konto:** Auf [vercel.com](https://vercel.com) gehen und mit GitHub/GitLab/Bitbucket anmelden (oder E-Mail).
2. **Projekt anbinden:** „Add New“ → „Project“ → dein Repo auswählen (oder Code per „Import“ hochladen).
3. **Einstellungen (meist schon richtig):**
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build` (oder leer lassen)
   - **Output Directory:** leer lassen (Next.js Standard)
   - **Install Command:** `npm install`
4. **Deploy:** Auf „Deploy“ klicken. Nach 1–2 Minuten bekommst du eine URL wie `https://kan-mandarin-xxx.vercel.app`.
5. **Später:** Bei jedem Push in die verbundene Branch baut Vercel automatisch neu.

**Keine Umgebungsvariablen nötig** für den aktuellen Stand der App.

---

### Option 2: Netlify

1. Auf [netlify.com](https://netlify.com) anmelden.
2. „Add new site“ → „Import an existing project“ → Git-Provider verbinden, Repo wählen.
3. Einstellungen:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next` ❌ – bei Next.js besser den **Netlify-Plugin „Next.js“** nutzen: „Site configuration“ → „Build & deploy“ → „Build settings“ oder im Repo eine `netlify.toml` anlegen (siehe [Netlify Next.js Docs](https://docs.netlify.com/frameworks/next-js/)).
4. Deploy starten.

Für Next.js ist Vercel meist die unkomplizierteste Wahl.

---

### Option 3: Eigener Server (VPS, eigener Rechner)

Auf dem Server (Linux):

```bash
# Repo klonen
git clone <deine-repo-url> kan-mandarin
cd kan-mandarin

# Abhängigkeiten & Build
npm install
npm run build

# Dauerhaft laufen lassen (Beispiel mit PM2)
npm install -g pm2
pm2 start npm --name "kan-mandarin" -- start
pm2 save
pm2 startup
```

Die App läuft dann auf Port 3000. Mit Nginx oder Caddy kannst du eine Domain davor legen und HTTPS einrichten.

---

### Standalone-App (`app-standalone.html`) mit ausliefern

Wenn die Next.js-Seite auch die Standalone-Version anbieten soll:

1. Im Projekt einen Ordner `public` anlegen (falls noch nicht da).
2. `app-standalone.html` und ggf. `hsk-dict.js`, `hilfe-handy.html` nach `public/` kopieren.
3. Nach dem Deploy ist die Standalone-App z. B. unter `https://deine-domain.com/app-standalone.html` erreichbar.

Ohne das liegt nur die Next.js-App online; die Standalone-Dateien musst du dann woanders hosten (z. B. zweites Static-Hosting oder gleiches Repo mit anderem Build).

---

Die Dateien `server.py`, `start-server.bat`, `firewall-freigabe.bat` sind nur für lokalen/WLAN-Betrieb. Beim Online-Deploy werden sie nicht benötigt.
