# Deploying Visual Themes

Target repository: **https://github.com/Surenkh/dsh-visual-themes** (public)
Package name: **`@surenkh/dsh-visual-themes`**
Release: **`v1.1.0`**

This repository is committed locally and tagged `v1.1.0`. The source, design references, tests, docs and release assets are ready.

## Why the push is not automatic here

The sandbox used to prepare this release has **no GitHub credentials** and cannot reach GitHub from its shell:

- `gh` (GitHub CLI) is not installed;
- no `GITHUB_TOKEN` / `GH_TOKEN` is present;
- there is no SSH key in `~/.ssh`;
- `git`/`curl` HTTPS requests fail with `schannel: AcquireCredentialsHandle failed: SEC_E_NO_CREDENTIALS` (TLS credentials are unavailable in this environment), and the credential manager has no stored GitHub password.

Creating the remote repository and pushing therefore have to be done from a machine with GitHub authentication. Everything below is ready to run.

## 1. Authenticate

Use one of:

```bash
gh auth login
```

or create a GitHub personal access token with `repo` scope and use it as the HTTPS password when Git asks, or add an SSH key to GitHub and use the SSH remote.

## 2. Create the repository

With GitHub CLI, from the repository root:

```bash
gh repo create Surenkh/dsh-visual-themes --public --source=. --remote=origin --push
git push origin v1.1.0
```

Without `gh`, create an empty **public** repository named `dsh-visual-themes` under `Surenkh` on github.com, then:

```bash
git remote add origin https://github.com/Surenkh/dsh-visual-themes.git
git push -u origin main
git push origin v1.1.0
```

The intended remote is already configured as `origin`; if you use `gh repo create --source=.`, it may add the same remote, which is fine.

## 3. Repository settings

Suggested description:

> Eleven switchable visual themes for the DeepSeek Harness workspace, with a compact picker panel and persisted selection.

Suggested topics:

```
deepseek-harness  dsh  plugin  themes  visual-themes  retro  aqua  glass  ui
```

Homepage: the repository README (leave empty) or the Releases page.

## 4. Publish the release

The release assets live in `release/`:

- `release/dsh-visual-themes-1.1.0.zip` — complete source archive (plugin, docs, tests, 11 design references), installable by pointing the DSH plugin manager at the extracted folder;
- `release/SHA256SUMS.txt` — checksums;
- `release/RELEASE_NOTES-1.1.0.md` — release text.

With GitHub CLI:

```bash
gh release create v1.1.0 \
  release/dsh-visual-themes-1.1.0.zip \
  release/SHA256SUMS.txt \
  --title "Visual Themes 1.1.0" \
  --notes-file release/RELEASE_NOTES-1.1.0.md
```

Or use **Releases → Draft a new release** on GitHub, choose the tag `v1.1.0`, paste the notes and attach the two files.

## 5. If the owner or repository name differs

Update every place that contains the current URL/name:

- `package.json`: `name`, `homepage`, `repository`, `bugs`;
- `README.md`: badges/links, clone URL, release URL;
- `INSTALL.md`: clone URL and release name;
- `cordis.patch.yml` and `client.js`: the package/module id `@surenkh/dsh-visual-themes`;
- this file.

Then rebuild the archive and tag a new version (or amend before the first push).

## 6. Verify after publishing

1. Open the repository; the README renders with the 11 design references.
2. Create a fresh clone in a temporary folder.
3. Install it with the plugin manager; the picker shows 11 cards.
4. Download the release ZIP; extract it; install that folder too (the package root contains `package.json`).
5. Confirm the saved selection survives a restart and **Restore original** works.

## What was verified locally

- `node --check client.js` and `node --check index.js`;
- `npm test` — the dependency-free Client harness passes for 11 themes, the picker order, selection/persistence, restore, external theme changes and disposal;
- the plugin bundle installs from this folder and the picker exposes 11 cards;
- the removed theme's saved state normalizes to the original appearance.

The visual result in the running GUI could not be captured from this sandbox; the release should be visually checked on the target machine.
