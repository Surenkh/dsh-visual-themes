# Deploying Visual Themes

Published repository: **https://github.com/Surenkh/dsh-visual-themes**
Package name: **`@surenkh/dsh-visual-themes`**
Current release: **`v1.1.0`** - https://github.com/Surenkh/dsh-visual-themes/releases/tag/v1.1.0

## Published assets

- `dsh-visual-themes-1.1.0.zip` - complete source archive; installable by pointing the DSH plugin manager at the extracted folder.
- `SHA256SUMS.txt` - SHA-256 checksums.

Release download base:

```
https://github.com/Surenkh/dsh-visual-themes/releases/download/v1.1.0/
```

The uploaded ZIP digest is `sha256:f62707a0a7a17fc0fcf795c43bf8532b23dbc8f65ee6996f37197323ad08712b`.

## Repository settings

- Description: **Eleven switchable visual themes for the DeepSeek Harness workspace, with a compact picker panel and persisted selection.**
- Homepage: the repository README.
- Topics: `deepseek-harness`, `dsh`, `plugin`, `themes`, `visual-themes`, `retro`, `aqua`, `glass`, `ui`.
- License: MIT.

## Release process for future versions

1. **Bump the version** in `package.json`, the README badge and `CHANGELOG.md`.
2. **Run the checks**:
   ```bash
   npm test
   npm run check
   ```
3. **Commit and tag**:
   ```bash
   git add -A
   git commit -m "feat: Visual Themes X.Y.Z"
   git tag -a vX.Y.Z -m "Visual Themes X.Y.Z"
   git push origin main
   git push origin vX.Y.Z
   ```
4. **Build the source archive** from the tag/commit:
   ```bash
   git archive --format=zip --prefix=dsh-visual-themes-X.Y.Z/ \
     -o release/dsh-visual-themes-X.Y.Z.zip HEAD
   ```
5. **Write the checksum**:
   ```bash
   sha256sum release/dsh-visual-themes-X.Y.Z.zip > release/SHA256SUMS.txt
   ```
   On PowerShell:
   ```powershell
   $hash = (Get-FileHash 'release\dsh-visual-themes-X.Y.Z.zip' -Algorithm SHA256).Hash.ToLower()
   "$hash  dsh-visual-themes-X.Y.Z.zip" | Set-Content 'release\SHA256SUMS.txt'
   ```
6. **Write release notes** in `release/RELEASE_NOTES-X.Y.Z.md`.
7. **Create the GitHub release** with the CLI:
   ```bash
   gh release create vX.Y.Z \
     release/dsh-visual-themes-X.Y.Z.zip \
     release/SHA256SUMS.txt \
     --title "Visual Themes X.Y.Z" \
     --notes-file release/RELEASE_NOTES-X.Y.Z.md
   ```
   Or use **Releases -> Draft a new release**, select the tag and attach both files.
8. **Verify** the release page shows both assets and the source links; download the ZIP and confirm its digest matches `SHA256SUMS.txt`.

## Local verification already performed

- `node --check client.js` and `node --check index.js`.
- `npm test` - 11 theme registrations, 11 picker cards in order, selection/persistence, restore, external theme fallback and disposal.
- The release archive was extracted and its test suite passed independently.
- The plugin bundle installs as `@surenkh/dsh-visual-themes@1.1.0`; the picker exposes 11 cards; the removed Liquid Glass state normalizes to the original appearance.

## Notes

- The GitHub repository, description, homepage, topics, MIT license, tag `v1.1.0` and release assets are live.
- The native OS title bar remains outside the page and cannot be themed by a Web plugin; the themes style only the in-window app surface.