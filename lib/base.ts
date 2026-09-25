/** Unterpfad, unter dem die Seite läuft (GitHub Pages: /<repo>). Lokal leer. */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Pfad zu einer Datei in /public – mit Unterpfad. */
export const asset = (path: string) => BASE + path;
