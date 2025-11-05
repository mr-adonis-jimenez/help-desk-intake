# Help Desk Intake

Lightweight, client-side help desk. Create, search, filter, close/reopen, delete tickets. Data is saved in your browser (localStorage). No backend.

## Live site
GitHub Pages deploys automatically from `main` via Actions (see `.github/workflows/pages.yml`).

## Features
- Create tickets with subject, email, priority, description
- Search by subject/email, filter by status, sort by updated/created/priority
- Close / reopen, delete, clear-all
- Export all tickets as CSV (Excel-friendly, with UTF-8 BOM)

## Run locally
Open `index.html` in a browser, or serve the folder:
```bash
# optional
python3 -m http.server 8000
