# Kit Ledger — Frontend

React + Vite frontend for the sports equipment inventory system, built against
the page/route spec you provided.

## Setup

```
npm install
cp .env.example .env   # already included, edit if your API URL differs
npm run dev
```

Runs on http://localhost:5173. Expects your backend at the URL in `.env`
(`VITE_API_BASE_URL`, currently `http://localhost:3000/api`).

## What's implemented

- JWT auth (`AuthContext`), token stored in localStorage, attached to every
  request in `api/client.js`. A 401 response auto-logs-out and redirects to
  `/login`.
- `ProtectedRoute` — redirects to `/login` if there's no token.
- `AdminOnlyRoute` — blocks committee accounts from admin-only pages
  client-side (Add Item, Report Lost/Damaged, Purchase Draft), per your note
  that the draft editor route needs to be hidden, not just 403'd by the API.
- All 11 pages from the spec, using the design system from the mockup
  (`index.css` — olive/khaki/parchment palette, Oswald + IBM Plex).
- Shared `LookupDropdown` for brand/category/sport/unit/wing, backed by
  `GET /lookups/:field`, with inline "add new" — the new value is passed to
  the parent form and submitted along with the record, since most APIs don't
  have a separate lookup-creation endpoint. If yours does, wire it up in
  `LookupDropdown.jsx`.
- Item photos: thumbnail in the Items table, full photo (styled like a
  Polaroid) on Item Detail, upload field with preview on Add Item.

## About image uploads — needs a decision

You said you hadn't picked a storage approach yet, so `ImageUpload.jsx`
currently only previews the picked file locally (as a data URL) and hands
the raw `File` back to the parent form via `onFileSelected` — it does **not**
upload it anywhere yet. Once you decide:

- **Your API handles it directly** — in `ItemForm.jsx`, swap the
  `createItem(payload)` call for a `FormData` submission that appends the
  photo file alongside the other fields, and have `POST /items` accept
  `multipart/form-data`.
- **Separate object storage** (S3, R2, Cloudinary, etc.) — upload the file
  there first (either directly from the browser with a signed URL, or via a
  small backend endpoint that proxies the upload), then send the resulting
  URL as `photoUrl` in the item payload.

Everywhere else in the app (`ItemsList`, `ItemDetail`) already expects a
`photoUrl` / `photo_url` field on the item object and falls back to a
"NO PHOTO" placeholder styled to match the kit-tag design when it's missing
— so once uploads are wired up, photos will just start appearing.

## Notes on API response shapes

Since I don't have your backend to test against, the pages accept a couple
of common response shapes defensively (e.g. `data.items` or a raw array;
`camelCase` or `snake_case` fields like `photoUrl`/`photo_url`). If your API
returns something structurally different, you'll mostly need to adjust the
`.then((data) => ...)` lines in each page and the field names used in JSX —
the surrounding logic (loading/error states, filters, admin gating) shouldn't
need to change.

## Build order followed

Matches what you laid out: Auth → Dashboard → Items → Lost/Damaged Records →
Reports/Purchase List. All of it is in this delivery; there's nothing left
stubbed out except the photo upload destination noted above.
