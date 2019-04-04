export default `
##Dokumentation für Befehle\n
### Beschreibung\n
Das Befehle Plugin ermöglicht es dir, eigene Befehle für deinen Chat zu erstellen, bearbeiten und zu löschen.
Befehle können mit verschiedenen Zugriffsleveln (Zuschauer, Subs oder höher, Mods oder höher, Streamer) versehen werden.
Befehle müssen NICHT zwingend mit einem ! beginnen.
Desweiteren lässt sich über das Nutzerpanel ein Cooldown und der Status (Aktiviert/Deaktiviert) für Befehle einstellen.

***

### Befehle\n

Befehle können Parameter enthalten. Parameter werden im Format **\`\Befehl\`\** **\`\Parameter\`\** an einen Befehl angehängt. \n

| Befehl | Alternative Befehle | Parameter | Ausgabe |
|--------|---------------------|-----------|---------|
| **\`\!add\`\** | -  | \`\p1:\`\ **\`\Befehl\`\** \`\p2:\`\ **\`\Ausgabe\`\** | \`\Erstellt einen neuen Befehl mit den gegebenen Parametern p1 und p2.\`\ |
| **\`\!edit\`\** | -  | \`\p1:\`\ **\`\Befehl\`\** \`\p2:\`\ **\`\Ausgabe\`\** | \`\Bearbeitet den Befehl mit dem gegebenen Parameter p1.\`\ |
| **\`\!del\`\** | **\`\!delete\`\**  | \`\p1:\`\ **\`\Befehl\`\** | \`\Löscht den Befehl mit dem gegebenen Parameter p1.\`\ |\n

\`\p1:\`\ **\`\Befehl\`\**: Der Befehl an sich. Beispiel: !twasi\n
\`\p2:\`\ **\`\Ausgabe\`\**: Die Ausgabe eines Befehls. Beispiel: Mein Bot läuft über Twasi.

***

### Variablen\n

Variablen können in einen Befehl eingebaut werden. Variablen erzeugen eine zugewiesene Ausgabe, sie werden wie folgt angewendet **\`\!Befehl\`\** **\`\$Variable(Parameter)\`\**. \n

| Variable | Parameter | Ausgabe |
|----------|-----------|---------|
| **\`\$uses(p1)\`\** | \`\p1:\`\ **\`\Befehl\`\** | \`\Zeigt an, wie oft der Befehl (p1) genutzt wurde.\`\ |
| **\`\$random(p1,p2)\`\** | \`\p1:\`\ **\`\Zahl 1\`\** \`\p2:\`\ **\`\Zahl 2\`\** | \`\Zeigt eine zufällige Zahl von p1 bis p2 an.\`\ |\n

***

### Abhängigkeiten\n

Dieses Plugin steht in Abhängigkeit mit den folgenden Plugins:

- \`\Beispielplugin 2\`\

- \`\Beispielplugin 3\`\
`
