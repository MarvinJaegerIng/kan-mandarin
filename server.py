# Kan Mandarin - Server lauscht auf allen Schnittstellen (WLAN erreichbar)
import http.server
import socketserver
PORT = 8080
Handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
    print("Kan Mandarin Server laeuft.")
    print("  Am PC:    http://localhost:%s" % PORT)
    print("  Handy:    http://DEINE-IP:%s  (ipconfig fuer die richtige IP)" % PORT)
    print("  Lauscht auf 0.0.0.0:%s (WLAN-Zugriff moeglich)" % PORT)
    print("-" * 50)
    httpd.serve_forever()
