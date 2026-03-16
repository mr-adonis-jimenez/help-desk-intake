# Help Desk Intake

A modern Help Desk Intake web application built with React, Vite, and Tailwind CSS. Provides a streamlined interface for submitting, tracking, and managing support tickets.

## Features

- **Ticket Submission** — Users can submit support tickets with subject, description, category, priority, and contact information
- **Dashboard** — View all tickets with filtering by status and priority, plus search functionality
- **Ticket Details** — Detailed view of individual tickets with status tracking
- **Statistics** — Overview of ticket counts by status (open, in progress, resolved, closed)

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and builds
- **Tailwind CSS** for styling
- **Radix UI** for accessible UI primitives
- **React Hook Form** + **Zod** for form validation
- **TanStack React Query** for data fetching
- **Wouter** for client-side routing
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

## Project Structure

```
src/
├── components/
│   ├── ui/          # Reusable UI components (buttons, cards, forms, etc.)
│   └── layout.tsx   # Dashboard layout wrapper
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── pages/
│   ├── submit-ticket.tsx   # Ticket submission form
│   ├── dashboard.tsx       # Ticket management dashboard
│   ├── ticket-detail.tsx   # Individual ticket view
│   └── not-found.tsx       # 404 page
├── App.tsx          # Root component with routing
├── main.tsx         # Application entry point
└── index.css        # Global styles
```

## License

MIT
