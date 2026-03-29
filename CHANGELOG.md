# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive `.gitignore` for Node/Vite/TypeScript projects (#7)
- Accessibility enhancements: `focus-visible` ring, `prefers-reduced-motion`, skip-nav link, improved WCAG AA contrast (#9)
- GitHub Actions CI workflow: TypeScript check, build, unit tests (#10)
- GitHub Actions CodeQL security scanning (#10)
- GitHub Actions PR validation: title format, size check, branch naming (#14)
- Vitest unit testing infrastructure with coverage (#11)
- Unit tests for `cn()` utility and ticket form Zod schema (#11)
- `CHANGELOG.md` — semantic versioning documentation (#12)
- Release workflow for automated GitHub releases (#12)

---

## Versioning Strategy

This project follows [Semantic Versioning](https://semver.org/):
- **MAJOR** (`x.0.0`): Breaking changes to the public interface
- **MINOR** (`0.x.0`): New features, backward-compatible
- **PATCH** (`0.0.x`): Bug fixes, backward-compatible

Releases are created by pushing a version tag:
```bash
git tag v1.0.0
git push origin v1.0.0
```

This triggers the automated release workflow which builds the project and creates a GitHub Release.
