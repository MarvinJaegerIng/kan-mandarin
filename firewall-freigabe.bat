@echo off
chcp 65001 >nul
:: Firewall-Regel fuer Kan Mandarin (Port 8080) - muss als Administrator ausgefuehrt werden
:: Regel fuer "Privates Netzwerk" und "Oeffentliches Netzwerk", damit Handy-Zugriff in beiden Faellen geht
netsh advfirewall firewall add rule name="Kan Mandarin (WLAN)" dir=in action=allow protocol=TCP localport=8080 profile=private 2>nul
netsh advfirewall firewall add rule name="Kan Mandarin (WLAN oeffentlich)" dir=in action=allow protocol=TCP localport=8080 profile=public 2>nul
echo.
echo Port 8080 wurde in der Windows-Firewall freigegeben (Privat + Oeffentlich).
echo.
echo Naechste Schritte:
echo   1. start-server.bat starten
echo   2. Im Handy-Browser eine der angezeigten Adressen oeffnen (z.B. http://192.168.1.100:8080/app-standalone.html)
echo   3. Falls es nicht geht: Netzwerk am PC auf "Privat" stellen (siehe hilfe-handy.html)
echo.
pause
