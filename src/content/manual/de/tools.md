Wenn Tools aktiviert sind, können KI-Avatare verschiedene Aufgaben direkt ausführen.

## Verfügbare Tools

| Tool | Funktion | Sicherheit |
|------|----------|----------|
| execute_command | Terminalbefehle ausführen | T3 |
| read_file | Dateiinhalt lesen | T0 |
| write_file | Dateien erstellen/ändern | T2 |
| search_files | Dateisystem durchsuchen | T0 |
| web_search | Internetsuche | T1 |
| apply_diff | Dateien bearbeiten (Diff anwenden) | T2 |
| browser | Webseiten öffnen | T1 |
| sessions_spawn | Unter-Agenten erstellen | T2 |

## Anwendungsbeispiele

Sie können Tools mittels natürlicher Sprache verwenden:

| Anfrage | Verwendetes Tool |
|---------|-----------|
| "Dateien in diesem Ordner anzeigen" | search_files |
| "README.md lesen" | read_file |
| "git status ausführen" | execute_command |
| "Nach TypeScript suchen" | web_search |
| "Diesen Code überprüfen" | sessions_spawn |

## Sicherheitsfreigabe

Jedes Tool erfordert eine Freigabe basierend auf seiner Sicherheitsstufe:

- **T0 (Nur-Lese)**: Automatisch genehmigt — keine Nebenwirkungen
- **T1 (Benachrichtigung)**: Hinweis angezeigt — externer Zugriff, aber keine Änderungen
- **T2 (Vorsicht)**: Benutzergenehmigung erforderlich — Dateiänderungen, Agenten-Erstellung
- **T3 (Gefährlich)**: Benutzergenehmigung erforderlich — Befehlsausführung

Bei der ersten Genehmigung wird durch Auswahl von "Immer erlauben" dieses Tool für die Zukunft automatisch genehmigt. Sie können zugelassene Tools unter Einstellungen > Tools zurücksetzen.

## Gateway-Verbindung

Tools erfordern eine Gateway-Verbindung:

1.  Aktivieren Sie **Tools aktivieren** unter Einstellungen > Tools
2.  In normalen Benutzerumgebungen werden die Gateway-Verbindungsdetails automatisch gehandhabt
3.  Wenn Tools nicht reagieren, starten Sie die App neu und versuchen Sie es erneut
4.  Überprüfen Sie, ob die erforderlichen Fähigkeiten im Tab "Skills" aktiviert sind
5.  Nur selbst gehostete/erweiterte Setups erfordern manuelle Überprüfungen der Gateway-URL/des Tokens