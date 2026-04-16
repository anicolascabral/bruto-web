# BRUTO — tapas & vinilos

Sitio web oficial del bar BRUTO (Isidoro Macabich 30, Santa Eulària des Riu, Ibiza).

## Stack

- **Next.js 14** (App Router) — 100% estático, sin API routes.
- **Tailwind CSS** — `neon #E6FF7B` + negro.
- **Archivo** (Google Fonts) — alternativa libre al Acumin Variable del PDF de marca.

## Desarrollo local

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Build de producción

```bash
npm run build
npm start
```

## Assets de marca

- `public/brand/bruto-logo.svg` — wordmark oficial, extraído del PDF de marca.
- `public/brand/icon-bottle.svg`, `icon-olives.svg`, `icon-notes.svg`, `icon-glass.svg`, `icon-fork.svg`, `icon-vinyl.svg` — iconografía oficial, página 7 del PDF.
- `public/images/*.jpg` — 3 fotos curadas para la galería de Instagram.

Todos los SVGs usan `fill="currentColor"` → se pintan del color del contexto. En fondos oscuros se invierten con la utilidad `.icon-invert` de `app/globals.css`.

## Deploy en Vercel

```bash
npx vercel --prod
```

O conectando el repo de GitHub en [vercel.com/new](https://vercel.com/new). No requiere variables de entorno.

## Paleta

| Token | Hex       | Uso                           |
|-------|-----------|-------------------------------|
| neon  | `#E6FF7B` | acento, card de platos, hero  |
| black | `#000000` | fondo principal               |
| white | `#FFFFFF` | texto                          |
