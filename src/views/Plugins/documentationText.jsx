export default `
##Dokumentation für Befehle\n
### Beschreibung\n
Das Befehle Plugin ermöglicht es dir, eigene Befehle für deinen Chat zu erstellen, bearbeiten und zu löschen.
Befehle können mit verschiedenen Zugriffsleveln (Zuschauer, Subs oder höher, Mods oder höher, Streamer) versehen werden.
Befehle müssen NICHT zwingend mit einem ! beginnen.
Desweiteren lässt sich über das Nutzerpanel ein Cooldown und der Status (Aktiviert/Deaktiviert) für Befehle einstellen.

### Befehle\n
Befehle können Parameter enthalten. Parameter werden im Format **\`\Befehl\`\** **\`\Parameter\`\** an einen Befehl angehängt. \n

| Befehl | Alternative Befehle | Parameter | Ausgabe |
|--------|---------------------|-----------|---------|
| **\`\!add\`\** | -  | \`\p1:\`\ **\`\Befehl\`\** \`\p2:\`\ **\`\Ausgabe\`\** | \`\Erstellt einen neuen Befehl mit den gegebenen Parametern p1 und p2.\`\ |
| **\`\!edit\`\** | -  | \`\p1:\`\ **\`\Befehl\`\** | \`\Bearbeitet den Befehl mit dem gegebenen Parameter p1.\`\ |
| **\`\!del\`\** | **\`\!delete\`\**  | \`\p1:\`\ **\`\Befehl\`\** | \`\Löscht den Befehl mit dem gegebenen Parameter p1.\`\ |\n

\`\p1:\`\ **\`\Befehl\`\**: Der Befehl an sich. Beispiel: !twasi\n
\`\p2:\`\ **\`\Ausgabe\`\**: Die Ausgabe eines Befehls. Beispiel: Mein Bot läuft über Twasi.

### Abhängigkeiten\n

Dieses Plugin steht in Abhängigkeit mit den folgenden Plugins:

- \`\Beispielplugin 2\`\

- \`\Beispielplugin 3\`\
`
