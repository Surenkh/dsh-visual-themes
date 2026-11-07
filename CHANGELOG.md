# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/) and the project uses [Semantic Versioning](https://semver.org/).

## 1.1.0 - 2026-11-07

### Removed

- **macOS Liquid Glass** theme and its Light/Dark mode control. The picker now contains **11 themes**. A saved selection for the removed theme is normalized to *Original appearance*.

### Changed

- Package renamed from `@local/dsh-visual-themes` to **`@surenkh/dsh-visual-themes`** for the public GitHub project.
- Version, repository, homepage, bugs and license metadata added.
- README rewritten as a complete project page with a theme table, design-reference gallery, installation, usage, architecture, development and limitations.
- New `INSTALL.md`, `DEPLOY.md`, `LICENSE`, `.gitignore` and a dependency-free `test/client.test.mjs` harness.
- Tests updated for 11 themes and the new package id; all assertions pass.
- Design references for the 11 remaining themes added under `assets/reference/`.
- Release artifacts prepared: source archive, checksums and release notes.

### Fixed

- The saved-state normalizer now writes the normalized (possibly empty) local state on startup, so a stale selection for a removed theme is cleared from `localStorage`.

## 1.0.0 - 2026-11-06

### Added

- Initial local bundle with **12 themes**: Deep Space, Sage Studio, Ember Terminal, Neon Pulse, Swiss Studio, Retro Desktop, Aurora Glass, Ivory & Plum, Ivory & Navy, macOS Liquid Glass (Light/Dark), Y2K Aqua and Retro Mint Desktop.
- Sidebar picker under **Visual themes**, immediate apply, single active theme and **Restore original**.
- Persistence in `localStorage` and `<DSH_HOME>/visual-themes.json` through a same-origin Host route.
- Scoped component stylesheet covering radii, glass, retro bevels, aqua gloss, typography and badge paint.
- Retro Desktop refinements: 1990s chrome, inset client area, framed standalone tabs, chamfered outlined bubbles, double-beveled composer, blue title strip and compact sidebar.
