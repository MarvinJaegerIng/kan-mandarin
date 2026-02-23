@echo off
setlocal EnableDelayedExpansion
chcp 65001 >nul
cd /d "%~dp0"
title Kan Mandarin - Server

:: Alle IPv4-Adressen (nicht 127.x) sammeln und anzeigen
echo.
echo ============================================
echo   Kan Mandarin - im WLAN verfuegbar
echo ============================================
echo.
echo   Am PC im Browser:
echo   http://localhost:8080/app-standalone.html
echo.
echo   Auf dem Handy - ZUERST 192.168.x.x probieren (normales WLAN):
echo.
set WLAN_IP=
for /f "tokens=2 delims=:" %%a in ('ipconfig 2^>nul ^| findstr /c:"IPv4"') do (
  set "RAW=%%a"
  set "RAW=!RAW: =!"
  if not "!RAW!"=="" if not "!RAW:~0,3!"=="127" (
    set "ADDR=!RAW!"
    echo !ADDR! | findstr /b "192.168." >nul && (
      echo   *** http://!ADDR!:8080/app-standalone.html  ^<- WLAN, zuerst
      if not defined WLAN_IP set "WLAN_IP=!ADDR!"
    )
  )
)
for /f "tokens=2 delims=:" %%a in ('ipconfig 2^>nul ^| findstr /c:"IPv4"') do (
  set "RAW=%%a"
  set "RAW=!RAW: =!"
  if not "!RAW!"=="" if not "!RAW:~0,3!"=="127" (
    set "ADDR=!RAW!"
    echo !ADDR! | findstr /b "192.168." >nul || echo   http://!ADDR!:8080/app-standalone.html
  )
)
if not defined WLAN_IP echo   http://DEINE-IP:8080/app-standalone.html  ^(ipconfig fuer die richtige IP^)
echo.
echo   Geht vom Handy aus nicht?
echo     1) firewall-freigabe.bat als ADMINISTRATOR ausfuehren (einmalig)
echo     2) hilfe-handy.html oeffnen: http://localhost:8080/hilfe-handy.html
echo.
echo   Wichtig: PC und Handy im GLEICHEN WLAN. Router-Option
echo   "Client-Isolierung" / "AP-Isolierung" muss AUS sein.
echo.
echo   Dieses Fenster OFFEN lassen. Zum Beenden: Fenster schliessen.
echo ============================================
echo.
set IP=DEINE-IP
if defined WLAN_IP (set "IP=!WLAN_IP!") else (
  for /f "tokens=2 delims=:" %%a in ('ipconfig 2^>nul ^| findstr /c:"IPv4"') do (
    set "RAW=%%a"
    set "RAW=!RAW: =!"
    if not "!RAW!"=="" if not "!RAW:~0,3!"=="127" (
      set "IP=!RAW!"
      goto :gotip
    )
  )
)
:gotip

:: Server in neuem Fenster starten - WICHTIG: 0.0.0.0 damit Handy (WLAN) verbinden kann
start "Kan Mandarin Server" cmd /k "pushd "%~dp0." && py server.py 2>nul || python server.py 2>nul || py -m http.server 8080 --bind 0.0.0.0 2>nul || python -m http.server 8080 --bind 0.0.0.0 2>nul || py -m http.server 8080 2>nul || python -m http.server 8080 2>nul"
if errorlevel 1 (
  echo Python nicht gefunden. Starte ohne separates Fenster ...
  py server.py 2>nul
  if errorlevel 1 python server.py 2>nul
  if errorlevel 1 (
    py -m http.server 8080 --bind 0.0.0.0 2>nul
    if errorlevel 1 python -m http.server 8080 --bind 0.0.0.0 2>nul
  )
  if errorlevel 1 (
    py -m http.server 8080 2>nul
    if errorlevel 1 python -m http.server 8080 2>nul
  )
  if errorlevel 1 (
    echo Python nicht gefunden. Bitte Python 3 installieren.
    echo Alternative: npx -y serve -p 8080
    pause
    exit /b 1
  )
) else (
  timeout /t 2 /nobreak >nul
  start "" "http://localhost:8080/?ip=%IP%"
  echo.
  echo Browser wurde geoeffnet. Server laeuft im anderen Fenster.
  echo Zum Beenden: Fenster "Kan Mandarin Server" schliessen.
  echo.
  pause
)
