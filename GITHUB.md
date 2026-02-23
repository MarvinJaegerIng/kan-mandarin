# Projekt auf GitHub hochladen

Git ist eingerichtet, der erste Commit ist gemacht. So kommt der Code auf GitHub:

## 1. Neues Repository auf GitHub anlegen

1. Im Browser zu **https://github.com** gehen und einloggen.
2. Oben rechts auf **„+”** → **„New repository“** klicken.
3. Ausfüllen:
   - **Repository name:** z. B. `kan-mandarin`
   - **Description:** optional, z. B. „Chinese graded reader – Next.js“
   - **Public** auswählen.
   - **Nicht** „Add a README“ oder „.gitignore“ ankreuzen (du hast schon welche).
4. Auf **„Create repository“** klicken.

## 2. Lokales Projekt mit GitHub verbinden und hochladen

GitHub zeigt dir danach Befehle an. Du kannst stattdessen diese hier ausführen (im Projektordner):

**Ersetze `DEIN-USERNAME` und `kan-mandarin`** durch deinen GitHub-Benutzernamen und den Repo-Namen:

```bash
git remote add origin https://github.com/DEIN-USERNAME/kan-mandarin.git
git branch -M main
git push -u origin main
```

In Cursor: Terminal öffnen (Strg+ö oder View → Terminal), in den Projektordner wechseln (`cd "g:\Meine Ablage\Cursor\dummeSachen\kanMandarin"`) und die drei Befehle nacheinander ausführen.

Beim ersten `git push` fragt GitHub nach Anmeldung (Browser oder Token). Wenn du **Zwei-Faktor-Authentifizierung** hast, brauchst du unter Umständen ein **Personal Access Token** statt des Passworts: GitHub → Settings → Developer settings → Personal access tokens → Token erzeugen, beim `git push` als Passwort eingeben.

## 3. Fertig

Unter `https://github.com/DEIN-USERNAME/kan-mandarin` siehst du den Code. Dieses Repo kannst du bei Vercel verbinden („Import Git Repository“).
