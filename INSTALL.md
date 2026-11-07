# Installing Visual Themes

Visual Themes is a local DSH bundle: one Host plugin and one Web Client plugin. This guide covers installing it, verifying it, upgrading from 1.0.0, and removing it.

## Requirements

- **DeepSeek Harness desktop** with the Web GUI and the plugin manager.
- A DSH profile where you can install and enable a bundle.
- **No Node.js or package manager needed at runtime.** Node.js 18+ is only needed for the optional test harness.

The plugin package is `@surenkh/dsh-visual-themes` and targets the Web client. It uses the Client `theme`, `slots` and `locale` services and the Host `webServer` service.

## Install from the release archive

1. Download `dsh-visual-themes-1.1.0.zip` from the GitHub Releases page.
2. Extract it anywhere. The extracted folder contains `package.json`, `client.js` and `index.js` at its root.
3. Install the folder as a bundle:
   - **Plugin manager UI**: open **Plugins**, choose **Install bundle**, and point it at the extracted folder.
   - **Tool**:
     ```text
     plugin_manager action=install_bundle target="<absolute path to the extracted folder>"
     ```
4. Reload the Web GUI if it does not reload automatically.
5. Open **Visual themes** in the sidebar.

The bundle patch inserts a row with id `visual-themes` into `sidebar.panellist` and a page into the `main` slot.

## Install from a Git checkout

```bash
git clone https://github.com/Surenkh/dsh-visual-themes.git
```

Install the checkout folder (the folder containing `package.json`) with the same two steps. The package is named `@surenkh/dsh-visual-themes`.

## First-run verification

1. **Sidebar → Visual themes** opens the picker in the main area.
2. The picker shows **11 theme cards** in this order: Deep Space, Sage Studio, Ember Terminal, Neon Pulse, Swiss Studio, Retro Desktop, Aurora Glass, Ivory & Plum, Ivory & Navy, Y2K Aqua, Retro Mint Desktop.
3. Click a card. The whole workspace updates immediately; the card becomes outlined and checked.
4. Restart the app. The same theme is still active.
5. Choose **Restore original**. The app returns to its pre-theme appearance and the picker shows **Original appearance**.

The selection is stored in `localStorage` and in `<DSH_HOME>/visual-themes.json`. The host injects the stored state before the Client boots.

## Upgrading from 1.0.0

Version 1.1.0 renames the package and removes one theme (macOS Liquid Glass). The 1.0.0 bundle and 1.1.0 bundle use different package names, so remove the old one before installing the new one:

```text
plugin_manager action=remove_bundle target=@local/dsh-visual-themes
plugin_manager action=install_bundle target="<absolute path to the 1.1.0 folder>"
```

If the saved selection referred to a theme that no longer exists, the plugin normalizes it to *Original appearance* and the app returns to its host look on the next load. The saved state can also be cleared manually — see [State and reset](#state-and-reset).

## Uninstall

```text
plugin_manager action=remove_bundle target=@surenkh/dsh-visual-themes
```

Removing the bundle unregisters all 11 themes, removes the plugin's `<style>` node and the `data-vt*` attributes, and restores the host appearance. The state file under `<DSH_HOME>/visual-themes.json` is not deleted automatically; remove it if you want to erase the saved selection.

## State and reset

- **Host state**: `<DSH_HOME>/visual-themes.json` — `{ "theme": "<key|null>", "mode": "light|dark", "at": <epoch-ms> }`.
- **Local state**: `localStorage["dsh-visual-themes/state/v1"]` in the Web GUI origin.
- To reset to the original appearance, use **Restore original** in the picker. To erase all memory of the theme, remove the bundle and delete the state file.
- The host route is same-origin:
  - `GET /visual-themes/state`
  - `POST /visual-themes/state`

## Troubleshooting

### The Visual themes row is missing

- Confirm the bundle is installed **and enabled** for the current profile.
- Reload the Web GUI with **Ctrl+R** (Windows/Linux) or **Cmd+R** (macOS).
- Check that the bundle patch inserted the `visual-themes` row (the plugin manager normally reports this).
- Other sidebar bundles can occupy the panel list; the row is injected with order 20 (after Plugins and Automation tasks, before More).

### Choosing a theme does nothing

- Confirm the theme service is available; the bundle's Client half injects the theme/layout/sidebar services.
- Reload once; a live plugin reload can race an old generation.
- Check the plugin manager logs for a Client module error.

### The app looks like the original theme after a restart

- Another DSH Settings appearance change may have ended the plugin theme. The plugin listens for `theme/change`; selecting a custom theme in Settings restores the host appearance and clears the plugin state.
- Open **Visual themes** and choose the theme again; the selection is persisted immediately.

### The native title bar is not themed

The native title bar, window controls and the `Application / Edit` menu are OS chrome outside the page. They cannot be styled by a Web plugin and are intentionally left native and usable.

### Upgrading loses the old selection

That is expected when the selected theme no longer exists (for example, the removed macOS Liquid Glass theme in 1.1.0). Pick another theme or use **Restore original**.

## Permissions and safety

- The plugin writes only its own state file under `<DSH_HOME>` and its own `localStorage` key.
- It adds one `<style>` element and the `data-vt`, `data-vt-kind`, `data-vt-mode` attributes while a theme is active; both are removed on disposal/restore.
- It does not modify the app's settings, other themes, the composer geometry or the conversation data.

## Development verification

From the repository root:

```bash
npm test
npm run check
```

No dependencies are installed; the test uses Node's built-in modules and stubs `window`, `document`, React and the Cordis context.
