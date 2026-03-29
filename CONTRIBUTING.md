# Contributing to Help Desk Intake

Thank you for your interest in contributing! This guide explains our contribution process and the automated checks that enforce our standards.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/<your-username>/help-desk-intake.git`
3. Install dependencies: `pnpm install`
4. Create a feature branch: `git checkout -b feat/your-feature`

## Development Workflow

### Running Locally

```bash
pnpm dev       # Start development server
pnpm build     # Build for production
pnpm typecheck # Run TypeScript type checking
```

## Commit Message Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/). Every commit message must use one of these types:

| Type       | Description                                      |
|------------|--------------------------------------------------|
| `feat`     | A new feature                                    |
| `fix`      | A bug fix                                        |
| `docs`     | Documentation changes only                       |
| `style`    | Code style changes (formatting, no logic change) |
| `refactor` | Code refactoring                                 |
| `test`     | Adding or updating tests                         |
| `chore`    | Build process or tooling changes                 |
| `ci`       | CI/CD configuration changes                      |
| `perf`     | Performance improvements                         |
| `revert`   | Revert a previous commit                         |

**Format:** `<type>: <Subject starting with capital letter>`

Examples:
```
feat: Add ticket priority filter
fix: Resolve form validation error on empty subject
docs: Update README installation steps
```

## Pull Request Guidelines

### PR Title
Your PR title must follow the same Conventional Commits format as commit messages. The subject must start with a capital letter.

### PR Description
Every PR must include a description of at least 20 characters explaining what the changes do. Use the [PR template](.github/PULL_REQUEST_TEMPLATE.md) provided automatically when you open a PR.

### Labels
PRs without labels will automatically receive a `needs-triage` label. Labels are also applied automatically by our [auto-labeler](.github/labeler.yml) based on the files changed.

## Automated Checks

When you open or update a pull request, the following automated workflows run:

### 1. PR Validation (`.github/workflows/pr-validation.yml`)
- ✅ Validates PR title follows Conventional Commits format
- ✅ Ensures PR description is at least 20 characters
- ✅ Adds `needs-triage` label if no labels are present

### 2. File Validation (`.github/workflows/file-validation.yml`)
- ✅ Rejects ZIP files in the repository
- ✅ Rejects files larger than 1MB
- ✅ Warns if JavaScript files are changed without corresponding test files

### 3. Documentation Check (`.github/workflows/docs-validation.yml`)
- ✅ Warns if `script.js` or `index.html` changed without updating `README.md`
- ✅ Validates all Markdown links are reachable

### 4. Automated Code Review (`.github/workflows/code-review.yml`)
- ✅ Runs ESLint on JavaScript files and posts inline review comments
- ✅ Runs Stylelint on CSS files and posts inline review comments

### 5. Size Limit Check (`.github/workflows/size-limit.yml`)
- ✅ Calculates total size of JS and CSS files
- ✅ Fails if total size exceeds 100KB

### 6. Auto-labeler (`.github/workflows/labeler.yml`)
Automatically applies labels based on changed files:
- `documentation` — `README.md`, `docs/**`, `*.md`
- `javascript` — `**/*.js`
- `css` — `**/*.css`
- `html` — `**/*.html`
- `testing` — `**/*.test.js`, `**/*.spec.js`
- `ci/cd` — `.github/**`
- `dependencies` — `package.json`, `package-lock.json`

### 7. First Interaction Bot (`.github/workflows/first-interaction.yml`)
- ✅ Greets first-time contributors on issues and pull requests

## Code Style

- Follow the existing TypeScript/React conventions in the codebase
- Use Tailwind CSS utility classes for styling
- Keep components small and focused
- Add JSDoc comments for complex logic

## Testing

- Include test files for any JavaScript changes (`.test.js` or `.spec.js`)
- Ensure TypeScript typechecking passes: `pnpm typecheck`

## Questions?

Open an issue with the `question` label, and a maintainer will respond.
