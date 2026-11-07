/**
 * Visual Themes ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â Client half.
 *
 * The twelve themes are registered as first-class themes through the Client
 * `theme` service, so the host presenter applies their color tokens (and the
 * light/dark palette attribute) exactly like the built-in themes. A second,
 * narrowly scoped stylesheet adds the parts a color token cannot express:
 * radii, elevation, glass, bevels, typography and the brand badge colors.
 *
 * Every rule in that stylesheet is scoped under `html[data-vt]`, which exists
 * only while a theme from this plugin is active, so the original appearance is
 * untouched until the user chooses one and is restored completely afterwards.
 */
window.__ModuleLoader__.load({
  id: '@surenkh/dsh-visual-themes',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const NS = 'visual-themes';
    const PANEL_ID = 'visual-themes';
    const STORAGE_KEY = 'dsh-visual-themes/state/v1';
    const STATE_ROUTE = '/visual-themes/state';

    /* ------------------------------------------------------------------ */
    /* Theme definitions                                                   */
    /* ------------------------------------------------------------------ */

    const RADII = {
      soft: ['4px', '8px', '12px', '16px', '20px', '28px'],
      space: ['4px', '8px', '12px', '16px', '20px', '26px'],
      ember: ['3px', '6px', '9px', '12px', '14px', '18px'],
      neon: ['6px', '10px', '14px', '18px', '22px', '28px'],
      swiss: ['0px', '2px', '4px', '6px', '8px', '12px'],
      flat: ['0px', '0px', '0px', '2px', '2px', '0px'],
      glass: ['8px', '12px', '16px', '20px', '24px', '30px'],
      aqua: ['6px', '10px', '14px', '18px', '22px', '26px'],
    };

    /**
     * Build one theme definition. Only the identity and the colors that carry a
     * theme's character are written per theme; everything shared by a family
     * (borders, hover washes, code surfaces, shadows) is derived here.
     */
    function theme(spec) {
      const dark = spec.scheme === 'dark';
      const accentMix = (pct) => `color-mix(in srgb, ${spec.accent} ${pct}%, transparent)`;
      const brandMix = (pct) => `color-mix(in srgb, ${spec.brand} ${pct}%, transparent)`;
      /** Primary action color: the brand color unless a theme separates controls from links. */
      const business = spec.business ?? spec.brand;
      const businessMix = (pct) => `color-mix(in srgb, ${business} ${pct}%, transparent)`;
      const radii = RADII[spec.radii ?? 'soft'];
      const kind = spec.kind ?? 'modern';

      const radiusOf = (index, fallback) => radii[index] ?? fallback;

      const tokens = {
        /* surfaces */
        '--dsw-alias-bg-base': spec.bg,
        '--dsw-alias-bg-layer-1': spec.panel,
        '--dsw-alias-bg-layer-2': spec.panel,
        '--dsw-alias-bg-layer-3': spec.panel,
        '--dsw-alias-bg-overlay': spec.overlay ?? spec.panel,
        '--dsw-alias-bg-module-platform': spec.chip,
        '--dsw-alias-bg-multi-select': spec.chip,
        '--dsw-alias-bg-skeleton': spec.hover,
        '--dsw-alias-bg-document-preview': spec.panel,
        '--dsw-alias-bg-document-selection': accentMix(30),
        '--dsw-alias-menu-group-header-fill': spec.menuHeader ?? spec.panel,
        '--dsw-alias-settings-card-fill': spec.panel,
        '--dsw-alias-settings-card-stroke': spec.border2,
        '--dsw-menu-surface-fill': spec.menu ?? spec.panel,
        '--dsw-menu-backdrop-filter': spec.menuBlur ?? 'blur(40px) saturate(150%)',
        '--dsw-specific-menu': spec.menu ?? spec.panel,
        '--dsw-specific-input-major': spec.input ?? spec.panel,
        '--dsw-specific-login-input': spec.chip,
        '--dsw-specific-sidebar-fill': spec.sidebar,
        '--dsw-specific-selector': spec.chip,
        '--dsw-specific-tip': spec.chip,
        '--dsw-specific-sidebar-nav-item-active': spec.navActive ?? spec.chip,
        '--dsw-specific-sidebar-nav-item-active-accent': spec.navAccent ?? spec.accent,
        '--dsw-specific-bubble': spec.bubble,
        '--dsw-specific-bubble-highlight': spec.bubbleHighlight ?? spec.bubble,

        /* text */
        '--dsw-alias-label-primary': spec.text,
        '--dsw-alias-label-secondary': spec.text2,
        '--dsw-alias-label-tertiary': spec.text3,
        '--dsw-alias-label-caption': spec.caption ?? spec.text3,
        '--dsw-alias-label-dimmed': spec.caption ?? spec.text3,
        '--dsw-alias-label-primary-inverted': spec.inverted ?? (dark ? spec.bg : '#ffffff'),
        '--dsw-alias-label-primary-foreground': spec.brandText ?? '#ffffff',
        '--dsw-alias-label-deep-diving': spec.accent,
        '--dsw-alias-label-deep-diving-shimmer': accentMix(40),
        '--dsw-alias-label-shimmer': accentMix(30),
        '--dsw-alias-label-primary-bluish': spec.accent,
        '--dsw-alias-label-document-preview': spec.text,
        '--dsw-alias-menu-icon': spec.text2,

        /* borders */
        '--dsw-alias-border-l1': spec.border1,
        '--dsw-alias-border-l2': spec.border2,
        '--dsw-alias-border-l3': spec.border3,
        '--dsw-alias-border-l4': spec.border4,
        '--dsw-alias-border-l2-darkmode-thin': spec.border2,
        '--dsw-alias-separator-primary': spec.border2,
        '--dsw-alias-border-inverted': spec.border3,
        '--dsw-alias-border-inverted2': spec.border4,

        /* brand and actions */
        '--dsw-alias-brand-primary': spec.brand,
        '--dsw-alias-brand-primary-invert': spec.inverted ?? (dark ? spec.bg : '#ffffff'),
        '--dsw-alias-brand-text': spec.brandText ?? '#ffffff',
        '--dsw-alias-link': spec.accent,
        '--dsw-alias-button-primary-fill': spec.brand,
        '--dsw-alias-button-primary-hover': spec.brandHover ?? spec.brand,
        '--dsw-alias-button-primary-dimmed': spec.chip,
        '--dsw-alias-button-info-fill': business,
        '--dsw-alias-button-info-hover': spec.accentHover ?? spec.accent,
        '--dsw-alias-button-elevated-fill': spec.panel,
        '--dsw-alias-button-floating-fill': spec.panel,
        '--dsw-alias-button-floating-hover': spec.chip,
        '--dsw-alias-button-contrast-fill': spec.text,
        '--dsw-alias-button-ghost-active-fill': spec.chip,
        '--dsw-alias-button-ghost-active-hover': spec.navActive ?? spec.chip,
        '--dsw-alias-button-ghost-active-border': spec.border4,
        '--dsw-alias-interactive-bg-hover': spec.hover,
        '--dsw-alias-interactive-bg-active': spec.active ?? spec.hover,
        '--dsw-alias-interactive-bg-hover-accent': accentMix(12),
        '--dsw-alias-interactive-bg-hover-solid': spec.chip,
        '--dsw-alias-interactive-bg-hover-danger': 'color-mix(in srgb, #e5484d 12%, transparent)',
        '--dsw-alias-state-business-primary': business,
        '--dsw-alias-state-business-tertiary': businessMix(14),
        '--dsw-alias-state-idle-primary': spec.text3,
        '--dsw-alias-state-success-primary': spec.success ?? (dark ? '#5ad2a0' : '#24845f'),
        '--dsw-alias-state-success-secondary': spec.success ?? (dark ? '#5ad2a0' : '#24845f'),
        '--dsw-alias-state-success-tertiary': 'color-mix(in srgb, #3dbd8d 14%, transparent)',
        '--dsw-alias-state-error-primary': spec.error ?? (dark ? '#ff7b72' : '#c2372c'),
        '--dsw-alias-state-error-secondary': spec.error ?? (dark ? '#ff7b72' : '#c2372c'),
        '--dsw-alias-state-warn-primary': spec.warn ?? (dark ? '#f5b454' : '#9a6410'),
        '--dsw-alias-state-warn-label': spec.warn ?? (dark ? '#f5b454' : '#9a6410'),
        '--dsw-alias-state-warn-secondary': spec.warn ?? (dark ? '#f5b454' : '#9a6410'),
        '--dsw-alias-state-warn-tertiary': 'color-mix(in srgb, #f0a03c 14%, transparent)',
        '--dsw-alias-switch-thumb': spec.panel,
        '--dsw-alias-tooltip-bg': spec.tooltipBg ?? (dark ? '#2b323d' : '#1f2630'),
        '--dsw-alias-tooltip-key-bg': dark ? 'rgba(255,255,255,.14)' : 'rgba(255,255,255,.16)',
        '--dsw-alias-toast-bg': spec.toastBg ?? (dark ? '#2b323d' : '#1f2630'),
        '--dsw-alias-toast-label': '#f7f9fc',
        '--dsw-alias-scrollbar-bg-l1': spec.scroll ?? (dark ? 'rgba(255,255,255,.22)' : 'rgba(15,23,42,.20)'),
        '--dsw-alias-scrollbar-bg-l2': spec.scroll ?? (dark ? 'rgba(255,255,255,.22)' : 'rgba(15,23,42,.20)'),
        '--dsw-alias-scrollbar-hover-l1': spec.scrollHover ?? (dark ? 'rgba(255,255,255,.36)' : 'rgba(15,23,42,.36)'),
        '--dsw-alias-scrollbar-hover-l2': spec.scrollHover ?? (dark ? 'rgba(255,255,255,.36)' : 'rgba(15,23,42,.36)'),
        '--dsw-alias-markdown-code-block': spec.codeBg ?? spec.chip,
        '--dsw-alias-markdown-code-block-banner': spec.codeBg ?? spec.chip,
        '--dsw-alias-markdown-inline-code': spec.codeBg ?? spec.chip,
        '--dsw-alias-markdown-code-segment-selected': spec.panel,
        '--dsw-alias-markdown-code-segment-unselected': spec.chip,
        '--dsw-alias-turn-trigger-bg': spec.codeBg ?? spec.chip,
        '--dsw-alias-turn-trigger-bg-hover': spec.chip,
        '--dsw-alias-bg-mask-1': dark ? 'rgba(0,0,0,.42)' : 'rgba(15,23,42,.26)',
        '--dsw-alias-bg-mask-2': dark ? 'rgba(0,0,0,.28)' : 'rgba(15,23,42,.16)',
        '--dsw-alias-bg-mask-3': dark ? 'rgba(0,0,0,.58)' : 'rgba(15,23,42,.42)',

        /* geometry */
        '--dsw-radius-xs': radiusOf(0, '4px'),
        '--dsw-radius-sm': radiusOf(1, '8px'),
        '--dsw-radius-md': radiusOf(2, '12px'),
        '--dsw-radius-lg': radiusOf(3, '16px'),
        '--dsw-radius-xl': radiusOf(4, '20px'),
        '--dsw-radius-panel': radiusOf(5, '28px'),

        /* typography */
        '--dsh-font-family-text': spec.font,
        '--dsh-font-family-code': spec.code,
        '--dsw-focus-ring-color': business,
        '--dsw-focus-ring-width': '2px',

        /* plugin-private paint used by the scoped stylesheet */
        '--vs-selection': accentMix(26),
        '--vs-bubble-radius': spec.bubbleRadius ?? 'var(--dsw-radius-xl)',
        '--vs-bubble-shadow': spec.bubbleShadow ?? 'none',
        '--vs-bubble-border': spec.bubbleBorder ?? (dark ? 'rgba(255,255,255,.28)' : '#808080'),
        '--vs-composer-radius': spec.composerRadius ?? 'var(--dsw-radius-panel)',
        '--vs-composer-shadow': spec.composerShadow,
        '--vs-row-radius': spec.rowRadius ?? 'var(--dsw-radius-md)',
        '--vs-button-radius': spec.buttonRadius ?? 'var(--dsw-radius-md)',
        '--vs-send-radius': spec.sendRadius ?? '999px',
        '--vs-add-radius': spec.addRadius ?? '999px',
        '--vs-send-bg': spec.sendBg ?? business,
        '--vs-send-hover': spec.sendHover ?? spec.accentHover ?? business,
        '--vs-send-text': spec.sendText ?? '#ffffff',
        '--vs-send-shadow': spec.sendShadow ?? 'none',
        '--vs-new-session-bg': spec.newSessionBg ?? spec.brand,
        '--vs-new-session-hover': spec.newSessionHover ?? spec.brandHover ?? spec.brand,
        '--vs-new-session-text': spec.newSessionText ?? '#ffffff',
        '--vs-new-session-shadow': spec.newSessionShadow ?? 'none',
        '--vs-badge': spec.badge ?? spec.accent,
        '--vs-badge-text': spec.badgeText ?? spec.bg,
        '--vs-menu-blur': spec.menuBlurValue ?? 'none',
        '--vs-underline-radius': kind === 'retro' ? '0px' : '2px',
        '--vs-client': spec.client ?? spec.panel,
        '--vs-chrome': spec.chrome ?? spec.bg,
        '--vs-frame-dark': spec.frameDark ?? (dark ? 'rgba(255,255,255,.24)' : '#808080'),
        '--vs-frame-light': spec.frameLight ?? (dark ? 'rgba(0,0,0,.35)' : '#FFFFFF'),
        '--vs-frame-mid': spec.frameMid ?? (dark ? 'rgba(255,255,255,.14)' : '#A0A5AD'),
        '--vs-tab-active': spec.tabActive ?? business,
        '--vs-tab-active-text': spec.tabActiveText ?? '#FFFFFF',
        '--vs-bevel-dark': spec.bevelDark ?? '#6d7a89',
        '--vs-bevel-light': spec.bevelLight ?? '#ffffff',
        '--vs-bevel-mid': spec.bevelMid ?? '#a7b1bd',
        '--vs-select-bg': spec.selectBg ?? spec.accent,
        '--vs-select-text': spec.selectText ?? '#ffffff',
        '--vs-row-active-text': spec.rowActiveText ?? 'var(--dsw-alias-label-primary)',
        '--vs-glass-sidebar': spec.glassSidebar ?? 'transparent',
        '--vs-glass-blur': spec.glassBlur ?? 'blur(20px) saturate(150%)',
      };

      if (spec.pageBg) tokens['--vs-page-bg'] = spec.pageBg;
      if (spec.sidebarBg) tokens['--vs-sidebar-bg'] = spec.sidebarBg;
      if (spec.gradient) tokens['--vs-heading-gradient'] = spec.gradient;

      return {
        key: spec.key,
        name: spec.name,
        scheme: spec.scheme,
        kind,
        modes: spec.modes,
        swatch: spec.swatch,
        tokens: spec.modes === undefined ? tokens : spec.modes.reduce((all, mode) => {
          all[mode] = spec.variants[mode] ? { ...tokens, ...spec.variants[mode] } : tokens;
          return all;
        }, {}),
      };
    }

    const THEMES = [
      theme({
        key: 'deep-space',
        name: 'Deep Space',
        scheme: 'dark',
        kind: 'modern',
        radii: 'space',
        swatch: ['#0B1020', '#161F36', '#4F7CFF'],
        bg: '#0B1020',
        sidebar: '#0F172A',
        panel: '#161F36',
        chip: '#1B2440',
        text: '#EDF2FF',
        text2: '#B9C4E0',
        text3: '#8E9AB8',
        caption: '#7C87A3',
        border1: 'rgba(120,150,220,.10)',
        border2: 'rgba(120,150,220,.16)',
        border3: 'rgba(120,150,220,.22)',
        border4: 'rgba(120,150,220,.30)',
        brand: '#4F7CFF',
        brandHover: '#6B91FF',
        brandText: '#FFFFFF',
        accent: '#A78BFA',
        accentHover: '#BAA4FF',
        bubble: '#3555B8',
        bubbleHighlight: '#3F5CB0',
        hover: 'rgba(167,139,250,.10)',
        active: 'rgba(167,139,250,.16)',
        navActive: '#1B2642',
        codeBg: '#121A2E',
        font: '"Inter", "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif',
        code: '"JetBrains Mono", "SF Mono", Consolas, monospace',
        composerShadow: '0 0 0 1px rgba(120,150,220,.22), 0 12px 34px rgba(3,7,18,.55)',
        bubbleShadow: '0 1px 2px rgba(3,7,18,.35)',
        sendBg: '#4F7CFF',
        sendHover: '#6B91FF',
        sendShadow: '0 4px 14px rgba(79,124,255,.35)',
        badge: '#4F7CFF',
        badgeText: '#F2F6FF',
        pageBg: 'radial-gradient(1100px 520px at 18% -8%, rgba(79,124,255,.14), transparent 62%), radial-gradient(900px 480px at 100% 0%, rgba(167,139,250,.12), transparent 58%)',
        sidebarBg: 'linear-gradient(180deg, rgba(79,124,255,.09), rgba(15,23,42,0) 46%)',
        menuBlurValue: 'none',
        glassBlur: 'none',
      }),
      theme({
        key: 'sage-studio',
        name: 'Sage Studio',
        scheme: 'light',
        kind: 'modern',
        radii: 'soft',
        swatch: ['#F6F5EF', '#E8EDE5', '#2F6B57'],
        bg: '#F6F5EF',
        sidebar: '#E8EDE5',
        panel: '#FFFFFF',
        chip: '#EFF3EC',
        text: '#1E2D26',
        text2: '#4C5B52',
        text3: '#6E7C73',
        caption: '#8A968D',
        border1: 'rgba(30,45,38,.07)',
        border2: 'rgba(30,45,38,.12)',
        border3: 'rgba(30,45,38,.17)',
        border4: 'rgba(30,45,38,.23)',
        brand: '#2F6B57',
        brandHover: '#3A8069',
        accent: '#2F6B57',
        accentHover: '#3A8069',
        bubble: '#DCE9DF',
        bubbleHighlight: '#CBDDCF',
        hover: 'rgba(47,107,87,.07)',
        active: 'rgba(47,107,87,.12)',
        navActive: '#DCE7DF',
        codeBg: '#F1F0E8',
        font: '"Inter", "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif',
        code: '"JetBrains Mono", "SF Mono", Consolas, monospace',
        composerShadow: '0 0 0 1px rgba(30,45,38,.10), 0 8px 24px rgba(47,107,87,.08)',
        bubbleShadow: '0 1px 1px rgba(30,45,38,.05)',
        sendBg: '#2F6B57',
        sendHover: '#3A8069',
        newSessionBg: '#2F6B57',
        newSessionHover: '#3A8069',
        newSessionText: '#F9FBF7',
        sendShadow: '0 3px 10px rgba(47,107,87,.22)',
        badge: '#2F6B57',
        badgeText: '#F6F5EF',
        sidebarBg: 'linear-gradient(180deg, rgba(255,255,255,.55), rgba(232,237,229,0) 55%)',
        menuBlurValue: 'none',
        glassBlur: 'none',
      }),
      theme({
        key: 'ember-terminal',
        name: 'Ember Terminal',
        scheme: 'dark',
        kind: 'modern',
        radii: 'ember',
        swatch: ['#111214', '#22252A', '#F5AE45'],
        bg: '#111214',
        sidebar: '#181A1D',
        panel: '#22252A',
        chip: '#2A2E33',
        text: '#F4EDE2',
        text2: '#CDC3B4',
        text3: '#A1978A',
        caption: '#8B8175',
        border1: 'rgba(244,237,226,.06)',
        border2: 'rgba(244,237,226,.11)',
        border3: 'rgba(244,237,226,.16)',
        border4: 'rgba(244,237,226,.22)',
        brand: '#F5AE45',
        brandHover: '#FFC163',
        brandText: '#1A1307',
        sendText: '#1A1307',
        newSessionText: '#1A1307',
        accent: '#F5AE45',
        accentHover: '#FFC163',
        bubble: '#3B3022',
        bubbleHighlight: '#4A3B29',
        hover: 'rgba(245,174,69,.08)',
        active: 'rgba(245,174,69,.14)',
        navActive: '#2E2A22',
        codeBg: '#1B1C1F',
        font: '"Inter", "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif',
        code: '"JetBrains Mono", "SF Mono", Consolas, monospace',
        composerShadow: '0 0 0 1px rgba(245,174,69,.18), 0 10px 26px rgba(0,0,0,.5)',
        bubbleShadow: 'inset 0 0 0 1px rgba(245,174,69,.14)',
        sendBg: '#F5AE45',
        sendHover: '#FFC163',
        sendShadow: '0 3px 12px rgba(245,174,69,.28)',
        badge: '#F5AE45',
        badgeText: '#17130B',
        menuBlurValue: 'none',
        glassBlur: 'none',
      }),
      theme({
        key: 'neon-pulse',
        name: 'Neon Pulse',
        scheme: 'dark',
        kind: 'neon',
        radii: 'neon',
        swatch: ['#120C21', '#25183D', '#FF4FD8'],
        bg: '#120C21',
        sidebar: '#1B1130',
        panel: '#25183D',
        chip: '#2E1F49',
        text: '#F6EEFF',
        text2: '#CDBBE9',
        text3: '#A18CBF',
        caption: '#8A75A9',
        border1: 'rgba(255,79,216,.10)',
        border2: 'rgba(255,79,216,.18)',
        border3: 'rgba(72,229,247,.22)',
        border4: 'rgba(255,79,216,.34)',
        brand: '#FF4FD8',
        brandHover: '#FF74E2',
        brandText: '#20061C',
        sendText: '#17071B',
        newSessionText: '#17071B',
        accent: '#48E5F7',
        accentHover: '#74EEFB',
        bubble: '#3B1B54',
        bubbleHighlight: '#4A2368',
        hover: 'rgba(255,79,216,.10)',
        active: 'rgba(255,79,216,.16)',
        navActive: '#331F52',
        codeBg: '#1B1230',
        font: '"Inter", "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif',
        code: '"JetBrains Mono", "SF Mono", Consolas, monospace',
        composerShadow: '0 0 0 1px rgba(255,79,216,.28), 0 0 26px rgba(255,79,216,.16), 0 14px 36px rgba(2,0,10,.6)',
        bubbleShadow: '0 0 0 1px rgba(255,79,216,.24), 0 0 18px rgba(255,79,216,.10)',
        sendBg: '#FF4FD8',
        sendHover: '#FF74E2',
        sendShadow: '0 0 18px rgba(255,79,216,.55)',
        badge: '#FF4FD8',
        badgeText: '#17071B',
        pageBg: 'radial-gradient(1000px 520px at 85% -10%, rgba(255,79,216,.18), transparent 60%), radial-gradient(900px 500px at 0% 100%, rgba(72,229,247,.14), transparent 55%)',
        sidebarBg: 'linear-gradient(180deg, rgba(255,79,216,.10), rgba(27,17,48,0) 52%)',
        menuBlurValue: 'blur(18px) saturate(140%)',
        glassBlur: 'none',
      }),
      theme({
        key: 'swiss-studio',
        name: 'Swiss Studio',
        scheme: 'light',
        kind: 'modern',
        radii: 'swiss',
        swatch: ['#F7F5F0', '#E9E5DC', '#E34234'],
        bg: '#F7F5F0',
        sidebar: '#E9E5DC',
        panel: '#FFFDF9',
        chip: '#F0EBE2',
        text: '#212121',
        text2: '#4B4742',
        text3: '#6F6A63',
        caption: '#8C867D',
        border1: 'rgba(33,33,33,.08)',
        border2: 'rgba(33,33,33,.14)',
        border3: 'rgba(33,33,33,.20)',
        border4: 'rgba(33,33,33,.28)',
        brand: '#E34234',
        brandHover: '#F0574A',
        accent: '#E34234',
        accentHover: '#F0574A',
        bubble: '#F7E1DB',
        bubbleHighlight: '#F2D2CA',
        hover: 'rgba(33,33,33,.05)',
        active: 'rgba(33,33,33,.09)',
        navActive: '#E4DED2',
        codeBg: '#F1EDE4',
        font: '"Helvetica Neue", "Inter", Helvetica, Arial, sans-serif',
        code: '"SF Mono", "JetBrains Mono", Consolas, monospace',
        composerShadow: '0 0 0 1px rgba(33,33,33,.16), 0 6px 0 rgba(33,33,33,.04)',
        bubbleShadow: 'none',
        sendBg: '#E34234',
        sendHover: '#F0574A',
        sendRadius: '4px',
        addRadius: '4px',
        buttonRadius: '4px',
        rowRadius: '4px',
        bubbleRadius: '6px',
        composerRadius: '12px',
        sendShadow: 'none',
        badge: '#E34234',
        badgeText: '#FFFDF9',
        menuBlurValue: 'none',
        glassBlur: 'none',
      }),
      theme({
        key: 'retro-desktop',
        name: 'Retro Desktop',
        scheme: 'light',
        kind: 'retro',
        radii: 'flat',
        swatch: ['#DFE2E7', '#F5F5F3', '#0E41BF'],
        bg: '#D9DCE2',
        sidebar: '#DFE2E7',
        panel: '#F5F5F3',
        chip: '#D5D9DF',
        overlay: '#F5F5F3',
        menu: '#DFE2E7',
        input: '#FFFFFF',
        text: '#172033',
        text2: '#33415C',
        text3: '#4E5D73',
        caption: '#64748B',
        border1: '#B9BFC8',
        border2: '#9AA1AC',
        border3: '#7C8492',
        border4: '#5F6878',
        brand: '#0E41BF',
        brandHover: '#1E52D6',
        accent: '#0E41BF',
        accentHover: '#1E52D6',
        bubble: '#D0E4FD',
        bubbleHighlight: '#BFD9FB',
        hover: '#D3D7DE',
        active: '#C7CBD3',
        navActive: '#0E41BF',
        rowActiveText: '#FFFFFF',
        codeBg: '#EFEFEC',
        font: '"Segoe UI", Tahoma, Geneva, sans-serif',
        code: 'Consolas, "Courier New", monospace',
        composerShadow: 'inset 1px 1px 0 #FFFFFF, inset -1px -1px 0 #808080, 0 0 0 1px #5F6878',
        bubbleShadow: 'none',
        bubbleBorder: '#5F7FA8',
        sendBg: '#0E41BF',
        sendHover: '#1E52D6',
        sendRadius: '0px',
        addRadius: '0px',
        buttonRadius: '0px',
        rowRadius: '0px',
        bubbleRadius: '0px',
        composerRadius: '0px',
        sendShadow: 'inset 1px 1px 0 #7D9BE8, inset -1px -1px 0 #08215E, 0 0 0 1px #00124F',
        newSessionBg: '#0E41BF',
        newSessionHover: '#1E52D6',
        newSessionText: '#FFFFFF',
        newSessionShadow: 'inset 1px 1px 0 #7D9BE8, inset -1px -1px 0 #08215E, 0 0 0 1px #FFFFFF, 0 0 0 3px #808080',
        badge: '#05051F',
        badgeText: '#FFFFFF',
        bevelDark: '#5F6878',
        bevelLight: '#FFFFFF',
        bevelMid: '#A6ABB3',
        selectBg: '#0E41BF',
        selectText: '#FFFFFF',
        chrome: '#D9DCE2',
        client: '#F5F5F3',
        frameDark: '#808080',
        frameLight: '#FFFFFF',
        frameMid: '#A6ABB3',
        tabActive: '#0E41BF',
        tabActiveText: '#FFFFFF',
        menuBlur: 'none',
        menuBlurValue: 'none',
        glassBlur: 'none',
      }),
      theme({
        key: 'aurora-glass',
        name: 'Aurora Glass',
        scheme: 'light',
        kind: 'glass',
        radii: 'glass',
        swatch: ['#EAF4FA', '#D6EAF2', '#5B74D6'],
        bg: '#EAF4FA',
        sidebar: '#D6EAF2',
        panel: '#F7FBFD',
        chip: '#E4F0F8',
        overlay: 'rgba(247,251,253,.92)',
        menu: 'rgba(247,251,253,.72)',
        input: 'rgba(255,255,255,.72)',
        text: '#253C50',
        text2: '#47617A',
        text3: '#6B8299',
        caption: '#8299AC',
        border1: 'rgba(91,116,214,.12)',
        border2: 'rgba(91,116,214,.20)',
        border3: 'rgba(91,116,214,.26)',
        border4: 'rgba(91,116,214,.34)',
        brand: '#5B74D6',
        brandHover: '#7189E4',
        accent: '#21B7AE',
        accentHover: '#38CEC5',
        bubble: '#DCEBF8',
        bubbleHighlight: '#CBE2F5',
        hover: 'rgba(91,116,214,.08)',
        active: 'rgba(91,116,214,.14)',
        navActive: 'rgba(214,234,242,.9)',
        codeBg: 'rgba(234,244,250,.9)',
        font: '"Inter", "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif',
        code: '"JetBrains Mono", "SF Mono", Consolas, monospace',
        composerShadow: '0 0 0 1px rgba(91,116,214,.18), 0 16px 40px rgba(91,116,214,.10), inset 0 1px 0 rgba(255,255,255,.8)',
        bubbleShadow: '0 1px 2px rgba(37,60,80,.06)',
        sendBg: '#5B74D6',
        sendHover: '#7189E4',
        sendShadow: '0 6px 18px rgba(91,116,214,.28)',
        badge: '#5B74D6',
        badgeText: '#F4FAFD',
        pageBg: 'radial-gradient(900px 520px at 12% -10%, #DFF3F7 0%, rgba(223,243,247,0) 60%), radial-gradient(900px 560px at 100% 0%, #E6E1FA 0%, rgba(230,225,250,0) 58%), linear-gradient(180deg, #EAF4FA, #E8F2FA)',
        sidebarBg: 'linear-gradient(180deg, rgba(255,255,255,.55), rgba(214,234,242,.25))',
        glassSidebar: 'linear-gradient(180deg, rgba(255,255,255,.55), rgba(214,234,242,.30))',
        menuBlurValue: 'blur(22px) saturate(160%)',
        glassBlur: 'blur(22px) saturate(160%)',
      }),
      theme({
        key: 'ivory-plum',
        name: 'Ivory & Plum',
        scheme: 'light',
        kind: 'modern',
        radii: 'soft',
        swatch: ['#FAF7EF', '#F2EBE5', '#643B6F'],
        bg: '#FAF7EF',
        sidebar: '#F2EBE5',
        panel: '#FFFDF9',
        chip: '#F1E9F2',
        text: '#2B2133',
        text2: '#574A61',
        text3: '#7A6C84',
        caption: '#8E8198',
        border1: 'rgba(43,33,51,.07)',
        border2: 'rgba(100,59,111,.14)',
        border3: 'rgba(100,59,111,.19)',
        border4: 'rgba(100,59,111,.26)',
        brand: '#643B6F',
        brandHover: '#794A85',
        accent: '#643B6F',
        accentHover: '#794A85',
        bubble: '#EDE1F1',
        bubbleHighlight: '#E3D2E9',
        hover: 'rgba(100,59,111,.06)',
        active: 'rgba(100,59,111,.11)',
        navActive: '#EFE3F2',
        codeBg: '#F4EFF4',
        font: '"Inter", "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif',
        code: '"JetBrains Mono", "SF Mono", Consolas, monospace',
        composerShadow: '0 0 0 1px rgba(100,59,111,.14), 0 10px 26px rgba(100,59,111,.08)',
        bubbleShadow: 'none',
        sendBg: '#643B6F',
        sendHover: '#794A85',
        newSessionBg: '#643B6F',
        newSessionHover: '#794A85',
        newSessionText: '#FDFAF7',
        sendShadow: '0 4px 12px rgba(100,59,111,.24)',
        badge: '#643B6F',
        badgeText: '#FAF7EF',
        sidebarBg: 'linear-gradient(180deg, rgba(255,255,255,.45), rgba(242,235,229,0) 60%)',
        menuBlurValue: 'none',
        glassBlur: 'none',
      }),
      theme({
        key: 'ivory-navy',
        name: 'Ivory & Navy',
        scheme: 'light',
        kind: 'modern',
        radii: 'soft',
        swatch: ['#F8F6F0', '#EEEAE1', '#17345C'],
        bg: '#F8F6F0',
        sidebar: '#EEEAE1',
        panel: '#FFFDF9',
        chip: '#EFEBE2',
        text: '#17283F',
        text2: '#3F5069',
        text3: '#64748B',
        caption: '#7B8A9E',
        border1: 'rgba(23,52,92,.07)',
        border2: 'rgba(23,52,92,.13)',
        border3: 'rgba(23,52,92,.18)',
        border4: 'rgba(23,52,92,.25)',
        brand: '#17345C',
        brandHover: '#22456F',
        accent: '#17345C',
        accentHover: '#22456F',
        bubble: '#DFE9F2',
        bubbleHighlight: '#CFDDEB',
        hover: 'rgba(23,52,92,.06)',
        active: 'rgba(23,52,92,.11)',
        navActive: '#E3E9F1',
        codeBg: '#F1EEE7',
        font: '"Inter", "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif',
        code: '"JetBrains Mono", "SF Mono", Consolas, monospace',
        composerShadow: '0 0 0 1px rgba(23,52,92,.12), 0 8px 24px rgba(23,52,92,.07)',
        bubbleShadow: 'none',
        sendBg: '#17345C',
        sendHover: '#22456F',
        newSessionBg: '#17345C',
        newSessionHover: '#22456F',
        newSessionText: '#FBF9F4',
        sendShadow: '0 3px 10px rgba(23,52,92,.24)',
        badge: '#17345C',
        badgeText: '#F8F6F0',
        sidebarBg: 'linear-gradient(180deg, rgba(255,255,255,.4), rgba(238,234,225,0) 60%)',
        menuBlurValue: 'none',
        glassBlur: 'none',
      }),
      theme({
        key: 'y2k-aqua',
        name: 'Y2K Aqua',
        scheme: 'light',
        kind: 'aqua',
        radii: 'aqua',
        swatch: ['#EAF3FF', '#D9E4F6', '#1269A5'],
        bg: '#EAF3FF',
        sidebar: '#D9E4F6',
        panel: '#F6FAFF',
        chip: '#E1EDFA',
        overlay: '#F8FBFF',
        menu: '#F7FBFF',
        input: '#FFFFFF',
        text: '#17344D',
        text2: '#3A5670',
        text3: '#5E7A94',
        caption: '#7892A8',
        border1: 'rgba(18,105,165,.12)',
        border2: 'rgba(18,105,165,.22)',
        border3: 'rgba(18,105,165,.30)',
        border4: 'rgba(18,105,165,.40)',
        brand: '#1269A5',
        brandHover: '#1A7CBE',
        accent: '#1269A5',
        accentHover: '#1A7CBE',
        bubble: '#D6F0FF',
        bubbleHighlight: '#BFE7FF',
        hover: 'rgba(18,105,165,.08)',
        active: 'rgba(18,105,165,.14)',
        navActive: '#CFE4F8',
        codeBg: '#EEF6FF',
        font: '"Lucida Grande", "Segoe UI", "Helvetica Neue", sans-serif',
        code: '"Monaco", "SF Mono", Consolas, monospace',
        composerShadow: 'inset 0 1px 0 #FFFFFF, 0 0 0 1px rgba(18,105,165,.22), 0 10px 26px rgba(18,105,165,.14)',
        bubbleShadow: 'inset 0 1px 0 rgba(255,255,255,.7), 0 1px 2px rgba(18,105,165,.12)',
        sendBg: '#1269A5',
        sendHover: '#1A7CBE',
        sendShadow: 'inset 0 1px 0 rgba(255,255,255,.55), 0 2px 6px rgba(12,60,96,.30)',
        buttonRadius: '999px',
        rowRadius: '999px',
        bubbleRadius: '18px',
        composerRadius: '24px',
        sendRadius: '999px',
        addRadius: '999px',
        badge: '#1269A5',
        badgeText: '#EAF3FF',
        pageBg: 'radial-gradient(900px 480px at 50% -20%, rgba(255,255,255,.9), transparent 60%), linear-gradient(180deg, #EAF3FF, #DCEBFC)',
        sidebarBg: 'linear-gradient(180deg, #E8F2FF 0%, #D5E4F7 55%, #DCE9F8 100%)',
        menuBlurValue: 'blur(14px) saturate(160%)',
        glassBlur: 'none',
      }),
      theme({
        key: 'retro-mint',
        name: 'Retro Mint Desktop',
        scheme: 'light',
        kind: 'retro',
        radii: 'flat',
        swatch: ['#F3F0E5', '#E5E1D3', '#245D59'],
        bg: '#F3F0E5',
        sidebar: '#E5E1D3',
        panel: '#FAF8F0',
        chip: '#EDE9DC',
        overlay: '#FAF8F0',
        menu: '#F2EFE3',
        input: '#FFFFFF',
        text: '#202D2A',
        text2: '#3C4C48',
        text3: '#5F6F6A',
        caption: '#7A8883',
        border1: '#C9C4B4',
        border2: '#ADA695',
        border3: '#8F8877',
        border4: '#6E6859',
        brand: '#245D59',
        brandHover: '#2E736E',
        accent: '#245D59',
        accentHover: '#2E736E',
        bubble: '#DCECE1',
        bubbleHighlight: '#CBE2D5',
        hover: '#E9E5D8',
        active: '#DDD8C9',
        navActive: '#245D59',
        rowActiveText: '#F6F3E7',
        codeBg: '#EFEBDD',
        font: '"Segoe UI", Tahoma, Geneva, sans-serif',
        code: 'Consolas, "Courier New", monospace',
        composerShadow: 'inset 1px 1px 0 #FFFFFF, inset -1px -1px 0 #6E6859, 0 0 0 1px #6E6859',
        bubbleShadow: 'none',
        bubbleBorder: '#8F8877',
        sendBg: '#245D59',
        sendText: '#F6F3E7',
        sendHover: '#2E736E',
        sendRadius: '0px',
        addRadius: '0px',
        buttonRadius: '0px',
        rowRadius: '0px',
        bubbleRadius: '0px',
        composerRadius: '0px',
        sendShadow: 'inset -1px -1px 0 #143532, inset 1px 1px 0 #7FA9A2, 0 0 0 1px #143532',
        newSessionBg: '#245D59',
        newSessionHover: '#2E736E',
        newSessionText: '#F6F3E7',
        newSessionShadow: 'inset 1px 1px 0 #7FA9A2, inset -1px -1px 0 #143532, 0 0 0 1px #FFFFFF, 0 0 0 2px #6E6859',
        badge: '#245D59',
        badgeText: '#F3F0E5',
        bevelDark: '#6E6859',
        bevelLight: '#FFFFFF',
        bevelMid: '#ADA695',
        selectBg: '#245D59',
        selectText: '#F3F0E5',
        chrome: '#E5E1D3',
        client: '#FAF8F0',
        frameDark: '#6E6859',
        frameLight: '#FFFFFF',
        frameMid: '#ADA695',
        tabActive: '#245D59',
        tabActiveText: '#F6F3E7',
        menuBlurValue: 'none',
        glassBlur: 'none',
      }),
    ];

    /**
     * A theme with a mode control registers one definition per color scheme;
     * every other theme maps to a single registry id.
     */
    function registryId(def, mode) {
      if (def.modes !== undefined) return `vt-${def.key}-${mode}`;
      return `vt-${def.key}`;
    }

    function themeById(key) {
      return THEMES.find((entry) => entry.key === key);
    }

    function tokensFor(def, mode) {
      if (def.modes === undefined) return def.tokens;
      return def.tokens[mode === 'dark' ? 'dark' : 'light'];
    }

    /* ------------------------------------------------------------------ */
    /* Scoped stylesheet                                                   */
    /* ------------------------------------------------------------------ */

    const CSS = `
/* ============================================================
   Visual Themes ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â component chrome.
   Every selector requires html[data-vt], which this plugin sets only
   while one of its themes is active. Nothing here changes layout:
   borders are painted with box-shadow, so the composer keeps its own
   box and its input can never overflow the surrounding frame.
   ============================================================ */

html[data-vt] ::selection {
  background: var(--vs-selection, var(--dsw-alias-state-business-tertiary));
}
html[data-vt] body {
  -webkit-font-smoothing: antialiased;
}

/* ---- frame and sidebar ---- */
html[data-vt] [class*="frame"]:has(> [class*="sidebarCol"]) {
  background: var(--vs-page-bg, var(--dsw-alias-bg-base));
}
html[data-vt] [class*="sidebarCol"] {
  background: var(--vs-sidebar-bg, var(--dsw-specific-sidebar-fill));
}
html[data-vt] a[class*="newSession"],
html[data-vt] button[class*="newSession"] {
  border-radius: var(--vs-button-radius, var(--dsw-radius-md));
  border-color: transparent;
  background: var(--vs-new-session-bg, var(--dsw-alias-button-primary-fill));
  background-image: none;
  color: var(--vs-new-session-text, #ffffff);
  box-shadow: var(--vs-new-session-shadow, none);
}
html[data-vt] a[class*="newSession"]:hover,
html[data-vt] button[class*="newSession"]:hover {
  background: var(--vs-new-session-hover, var(--dsw-alias-button-primary-hover));
  background-image: none;
}
html[data-vt] [class*="panelRow"] {
  border-radius: var(--vs-row-radius, var(--dsw-radius-md));
}
html[data-vt] [class*="panelActive"] {
  background: var(--dsw-specific-sidebar-nav-item-active);
  color: var(--vs-row-active-text, var(--dsw-alias-label-primary));
  box-shadow: inset 0 0 0 1px var(--vs-row-active-border, transparent);
}
html[data-vt] [class*="sidebarCol"] [class*="_sessionRow"][class*="_selected"],
html[data-vt] [class*="sidebarCol"] [class*="_searchResultRow"][class*="_selected"] {
  background-color: var(--dsw-specific-sidebar-nav-item-active);
  color: var(--vs-row-active-text, var(--dsw-alias-label-primary));
}

/* ---- brand wordmark: keep the HARNESS pill and its letters readable on
   every palette; the pill is the accent, the letters are the sidebar. ---- */
html[data-vt] [class*="brandName"] svg rect {
  fill: var(--vs-badge, currentColor);
}
html[data-vt] [class*="brandName"] svg g[clip-path] path {
  fill: var(--vs-badge-text, var(--dsw-specific-sidebar-fill));
}

/* ---- composer: paint only, never geometry ---- */
html[data-vt] [class*="composerSeat"] [class*="_card"] {
  background: var(--dsw-specific-input-major);
  border: 0;
  border-radius: var(--vs-composer-radius, var(--dsw-radius-panel));
  box-shadow: var(--vs-composer-shadow, var(--dsw-elevation-soft));
}
html[data-vt] [class*="composerSeat"] [class*="_card"]:focus-within {
  box-shadow: inset 0 0 0 1px var(--dsw-alias-state-business-primary, var(--dsw-alias-brand-primary)),
    var(--vs-composer-shadow, var(--dsw-elevation-soft));
}
html[data-vt] [class*="composerSeat"] [class*="_input"] {
  background: transparent;
  color: var(--dsw-alias-label-primary);
  caret-color: var(--dsw-alias-state-business-primary);
}
html[data-vt] [class*="composerSeat"] [class*="_placeholder"] {
  color: var(--dsw-alias-label-caption);
}
html[data-vt] [class*="composerSeat"] [class*="_primary"] {
  background: var(--vs-send-bg, var(--dsw-alias-button-info-fill));
  color: var(--vs-send-text, #ffffff);
  border-radius: var(--vs-send-radius, 999px);
  box-shadow: var(--vs-send-shadow, none);
}
html[data-vt] [class*="composerSeat"] [class*="_primary"]:hover:not(:disabled) {
  background: var(--vs-send-hover, var(--dsw-alias-button-info-hover));
}
html[data-vt] [class*="composerSeat"] [class*="_add"] {
  background: var(--dsw-specific-selector);
  border-radius: var(--vs-add-radius, 999px);
}
html[data-vt] [class*="composerSeat"] [class*="_select"] {
  color: var(--dsw-alias-label-secondary);
}

/* ---- conversation ---- */
html[data-vt] [data-message-bubble] {
  background: var(--dsw-specific-bubble);
  border-radius: var(--vs-bubble-radius, var(--dsw-radius-xl));
  box-shadow: var(--vs-bubble-shadow, none);
}
html[data-vt] [class*="_tabActive"]:after {
  background: var(--dsw-alias-state-business-primary);
  border-radius: var(--vs-underline-radius, 2px);
}
html[data-vt] [class*="_runningDivider"] {
  background: var(--dsw-alias-border-l2);
}

/* ---- menus and overlays ---- */
html[data-vt] [data-menu-phase] {
  -webkit-backdrop-filter: var(--vs-menu-blur, var(--dsw-menu-backdrop-filter));
  backdrop-filter: var(--vs-menu-blur, var(--dsw-menu-backdrop-filter));
}

/* ============================================================
   Glass family (Aurora Glass)
   ============================================================ */
html[data-vt-kind="glass"] [class*="sidebarCol"] {
  background: var(--vs-glass-sidebar, var(--dsw-specific-sidebar-fill));
  -webkit-backdrop-filter: var(--vs-glass-blur, blur(20px) saturate(150%));
  backdrop-filter: var(--vs-glass-blur, blur(20px) saturate(150%));
  box-shadow: inset -1px 0 0 rgba(255, 255, 255, 0.26), inset 0 1px 0 rgba(255, 255, 255, 0.34);
}
html[data-vt-kind="glass"] [class*="composerSeat"] [class*="_card"] {
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  backdrop-filter: blur(18px) saturate(160%);
}
html[data-vt-kind="glass"] [data-menu-phase] {
  -webkit-backdrop-filter: var(--vs-glass-blur, blur(22px) saturate(160%));
  backdrop-filter: var(--vs-glass-blur, blur(22px) saturate(160%));
}

/* ============================================================
   Neon family (Neon Pulse): controlled glow, no motion
   ============================================================ */
html[data-vt-kind="neon"] a[class*="newSession"],
html[data-vt-kind="neon"] button[class*="newSession"] {
  box-shadow: 0 0 0 1px rgba(255, 79, 216, 0.45), 0 0 22px rgba(255, 79, 216, 0.28);
}
html[data-vt-kind="neon"] [class*="panelActive"] {
  box-shadow: inset 0 0 0 1px rgba(255, 79, 216, 0.28);
}

/* ============================================================
   Retro family (Retro Desktop, Retro Mint Desktop)
   A 1990s desktop: silver chrome, an inset white client area,
   compact framed tabs and buttons, monospaced chat text. Every
   edge is a box-shadow or a background; layout is untouched
   apart from compact tab and row spacing.
   ============================================================ */
html[data-vt-kind="retro"] button,
html[data-vt-kind="retro"] [class*="themeCube"],
html[data-vt-kind="retro"] a[class*="newSession"] {
  border-radius: 0;
}
html[data-vt-kind="retro"] [class*="sidebarCol"] {
  box-shadow: inset -1px 0 0 var(--vs-frame-dark, #808080), inset -2px 0 0 var(--vs-frame-light, #ffffff);
}
html[data-vt-kind="retro"] a[class*="newSession"],
html[data-vt-kind="retro"] button[class*="newSession"] {
  border-radius: 0;
  font-weight: 700;
  box-shadow: var(--vs-new-session-shadow, none);
}
/* classical separators and compact rows */
html[data-vt-kind="retro"] [class*="panelList"] {
  border-top: 1px solid var(--vs-frame-dark, #808080);
  box-shadow: inset 0 1px 0 var(--vs-frame-light, #ffffff);
  padding-top: 8px;
  gap: 4px;
}
html[data-vt-kind="retro"] [class*="collapsed"] [class*="panelList"] {
  gap: 12px;
}
html[data-vt-kind="retro"] [class*="regionArea"] {
  border-top: 1px solid var(--vs-frame-dark, #808080);
  box-shadow: inset 0 1px 0 var(--vs-frame-light, #ffffff);
  padding-top: 6px;
}
html[data-vt-kind="retro"] [class*="footerActions"] button,
html[data-vt-kind="retro"] [class*="footerActions"] a,
html[data-vt-kind="retro"] [class*="settingsArea"] button,
html[data-vt-kind="retro"] [class*="settingsArea"] a,
html[data-vt-kind="retro"] [class*="footArea"] button,
html[data-vt-kind="retro"] [class*="footArea"] a {
  border-radius: 0;
  background: var(--vs-chrome, #d9dce2);
  box-shadow: inset 1px 1px 0 var(--vs-frame-light, #ffffff),
    inset -1px -1px 0 var(--vs-frame-dark, #808080),
    0 0 0 1px var(--vs-frame-dark, #808080);
}
html[data-vt-kind="retro"] [class*="sidebarCol"] button[class*="iconButton"],
html[data-vt-kind="retro"] [class*="sidebarCol"] button[class*="searchButton"],
html[data-vt-kind="retro"] [class*="sidebarCol"] button[class*="clearButton"],
html[data-vt-kind="retro"] [class*="sidebarCol"] button[class*="toggle"] {
  border-radius: 0;
  background: var(--vs-chrome, #d9dce2);
  box-shadow: inset 1px 1px 0 var(--vs-frame-light, #ffffff),
    inset -1px -1px 0 var(--vs-frame-dark, #808080),
    0 0 0 1px var(--vs-frame-dark, #808080);
}
/* inset white client area */
html[data-vt-kind="retro"] [class*="scrollBody"] {
  background: var(--vs-client, #f5f5f3);
  scroll-padding-bottom: 16px;
  box-shadow: inset 1px 1px 0 var(--vs-frame-dark, #808080),
    inset 2px 2px 0 var(--vs-frame-light, #ffffff),
    inset -1px -1px 0 var(--vs-frame-light, #ffffff),
    inset -2px -2px 0 var(--vs-frame-dark, #808080);
}
html[data-vt-kind="retro"] [class*="composerSeat"] {
  background: var(--vs-client, #f5f5f3);
}
/* compact monospaced chat */
html[data-vt-kind="retro"] [data-slot="conversation.chat.flow"] {
  font-family: var(--ds-font-family-code);
  --dsw-font-family: var(--ds-font-family-code);
}
/* in-app title strip: one slim full-width #001EAE row below the native
   menu. The brand sits at the left edge (sidebar column); the session
   title moves to the gray toolbar beneath it, as in the reference. */
html[data-vt-kind="retro"] [data-phase] header[data-window-drag] {
  padding-top: 32px;
  background: linear-gradient(#001eae 0, #001eae 32px, transparent 32px);
}
/* square the content corner so the strip meets the sidebar without a
   white notch */
html[data-vt-kind="retro"] [class*="frame"]:has(> [class*="sidebarCol"]) {
  --dsh-windows-content-radius: 0px;
}
html[data-vt-kind="retro"] [class*="sidebarCol"] {
  background-image: linear-gradient(#001eae 0, #001eae 32px, transparent 32px);
}
html[data-vt-kind="retro"] [class*="sidebarCol"] > [class*="_root"] {
  background-image: linear-gradient(#001eae 0, #001eae 32px, transparent 32px);
}
/* the brand row is the sidebar's drag strip: paint it edge to edge and
   center the brand in the slim row */
html[data-vt-kind="retro"] [class*="sidebarCol"] [data-window-drag][class*="logoRow"] {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 32px;
  margin: -6px -8px 6px;
  padding: 0 8px;
  background: #001eae;
}
html[data-vt-kind="retro"] [class*="sidebarCol"] [class*="collapsed"] [data-window-drag][class*="logoRow"] {
  height: 0;
  margin: 0;
  padding: 0;
  background: transparent;
}
html[data-vt-kind="retro"] [class*="sidebarCol"] [class*="collapsed"][class*="_root"] {
  background-image: none;
}
html[data-vt-kind="retro"] [class*="sidebarCol"] [class*="logoRow"],
html[data-vt-kind="retro"] [class*="sidebarCol"] [class*="brand"],
html[data-vt-kind="retro"] [class*="sidebarCol"] [class*="topStrip"] {
  color: #ffffff;
}
html[data-vt-kind="retro"] [class*="crumbCurrent"] {
  font-weight: 700;
}
/* tabs: standalone framed buttons with centered labels and small gaps */
html[data-vt-kind="retro"] [class*="tabs"] {
  gap: 6px;
  padding-bottom: 6px;
}
html[data-vt-kind="retro"] [class*="viewTabs"] {
  gap: 6px;
}
html[data-vt-kind="retro"] [class*="viewTabs"] > button {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  min-height: 26px;
  margin: 0;
  padding: 0 12px;
  border: 0;
  border-radius: 0;
  background: var(--vs-chrome, #d9dce2);
  color: var(--dsw-alias-label-primary);
  font-size: 13px;
  font-weight: 500;
  line-height: 18px;
  white-space: nowrap;
  box-shadow: inset 1px 1px 0 var(--vs-frame-light, #ffffff),
    inset -1px -1px 0 var(--vs-frame-dark, #808080),
    0 0 0 1px var(--vs-frame-dark, #808080);
}
html[data-vt-kind="retro"] [class*="viewTabs"] > button[class*="_tabActive"] {
  background: var(--vs-tab-active, #0e41bf);
  color: var(--vs-tab-active-text, #ffffff);
  box-shadow: inset 1px 1px 0 #5c7bd0, inset -1px -1px 0 #08215e, 0 0 0 1px #00124f;
}
html[data-vt-kind="retro"] [class*="viewTabs"] > button > span {
  position: static;
  display: block;
  line-height: inherit;
}
html[data-vt-kind="retro"] button[class*="viewsMore"] {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  min-height: 26px;
  margin: 0;
  padding: 0;
  border-radius: 0;
  background: var(--vs-chrome, #d9dce2);
  color: var(--dsw-alias-label-primary);
  box-shadow: inset 1px 1px 0 var(--vs-frame-light, #ffffff),
    inset -1px -1px 0 var(--vs-frame-dark, #808080),
    0 0 0 1px var(--vs-frame-dark, #808080);
}
html[data-vt-kind="retro"] [class*="viewsMoreAnchor"] {
  margin-top: 0;
}
html[data-vt-kind="retro"] [class*="_tabActive"]:after {
  display: none;
}
/* the host paints a gradient toward the base color behind the composer;
   the chat must stay off-white all the way to the bottom */
html[data-vt-kind="retro"] [data-phase] [class*="composerSeat"],
html[data-vt-kind="retro"] [class*="composerSeat"] {
  background-color: var(--vs-client, #f5f5f3);
  background-image: none;
}
/* extra room at the tail so long messages can clear the composer */
html[data-vt-kind="retro"] [data-slot="conversation.chat.flow"] {
  padding-bottom: 8px;
}
html[data-vt-kind="retro"] [data-slot="conversation.chat.flow"] [class*="_column"] {
  padding-bottom: 24px;
}
/* composer: a raised silver frame around a sunken white field that
   contains the input and every control */
html[data-vt-kind="retro"] [class*="composerSeat"] [class*="_card"] {
  position: relative;
  z-index: 0;
  border-radius: 0;
  background: var(--vs-chrome, #d9dce2);
  padding-inline: 6px;
  box-shadow: var(--vs-composer-shadow, none);
}
html[data-vt-kind="retro"] [class*="composerSeat"] [class*="_card"]::before {
  content: "";
  position: absolute;
  inset: 5px;
  z-index: -1;
  background: #f8f8f5;
  box-shadow: inset 1px 1px 0 var(--vs-frame-dark, #808080), inset -1px -1px 0 var(--vs-frame-light, #ffffff);
  clip-path: polygon(3px 0, calc(100% - 3px) 0, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 0 calc(100% - 3px), 0 3px);
  pointer-events: none;
}
html[data-vt-kind="retro"] [class*="composerSeat"] [class*="_card"]:focus-within {
  box-shadow: inset 1px 1px 0 var(--vs-frame-light, #ffffff),
    inset -1px -1px 0 var(--vs-frame-dark, #808080),
    0 0 0 1px var(--dsw-alias-state-business-primary);
}
html[data-vt-kind="retro"] [class*="composerSeat"] [class*="_card"]:focus-within::before {
  box-shadow: inset 0 0 0 1px var(--dsw-alias-state-business-primary);
}
html[data-vt-kind="retro"] [class*="composerSeat"] [class*="_scroll"] {
  background: transparent;
  box-shadow: none;
}
html[data-vt-kind="retro"] [class*="composerSeat"] [class*="_input"],
html[data-vt-kind="retro"] [class*="composerSeat"] [class*="_placeholder"] {
  font-family: var(--ds-font-family-code);
}
html[data-vt-kind="retro"] [class*="composerSeat"] [class*="_row"] {
  border-top: 0;
  box-shadow: none;
}
html[data-vt-kind="retro"] [class*="composerSeat"] [class*="_card"] [class*="_select"] {
  border-radius: 0;
  background-color: var(--vs-chrome, #d9dce2);
  box-shadow: inset 1px 1px 0 var(--vs-frame-light, #ffffff),
    inset -1px -1px 0 var(--vs-frame-dark, #808080),
    0 0 0 1px var(--vs-frame-dark, #808080);
}
html[data-vt-kind="retro"] [class*="composerSeat"] [class*="_card"] button:not([class*="_primary"]):not([class*="_add"]) {
  border-radius: 0;
  background: var(--vs-chrome, #d9dce2);
  box-shadow: inset 1px 1px 0 var(--vs-frame-light, #ffffff),
    inset -1px -1px 0 var(--vs-frame-dark, #808080),
    0 0 0 1px var(--vs-frame-dark, #808080);
}
html[data-vt-kind="retro"] [class*="composerSeat"] [class*="_primary"] {
  border-radius: 0;
  box-shadow: var(--vs-send-shadow, none);
}
html[data-vt-kind="retro"] [class*="composerSeat"] [class*="_primary"]:disabled:not([data-sending]) {
  background: var(--vs-chrome, #d9dce2);
  color: var(--dsw-alias-label-tertiary);
  opacity: 1;
  box-shadow: inset 1px 1px 0 var(--vs-frame-light, #ffffff),
    inset -1px -1px 0 var(--vs-frame-dark, #808080),
    0 0 0 1px var(--vs-frame-dark, #808080);
}
html[data-vt-kind="retro"] [class*="composerSeat"] [class*="_add"] {
  border-radius: 0;
  box-shadow: inset -1px -1px 0 var(--vs-bevel-dark, #5f6878),
    inset 1px 1px 0 var(--vs-bevel-light, #ffffff),
    0 0 0 1px var(--vs-frame-dark, #808080);
}
/* menus: square silver surfaces with a raised edge */
html[data-vt-kind="retro"] [data-menu-phase] {
  border-radius: 0;
  background: var(--dsw-specific-menu, #dfe2e7);
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
  box-shadow: inset 1px 1px 0 var(--vs-frame-light, #ffffff),
    inset -1px -1px 0 var(--vs-frame-dark, #808080),
    0 0 0 1px var(--vs-frame-dark, #808080);
}
html[data-vt-kind="retro"] [data-menu-phase] [role="menuitem"]:hover,
html[data-vt-kind="retro"] [data-menu-phase] [role="menuitem"]:focus-visible,
html[data-vt-kind="retro"] [data-menu-phase] [role="menuitemradio"]:hover,
html[data-vt-kind="retro"] [data-menu-phase] [role="option"]:hover {
  background: var(--dsw-alias-state-business-primary);
  color: #ffffff;
}
html[data-vt-kind="retro"] [class*="headerUtilities"] button,
html[data-vt-kind="retro"] [class*="headerActions"] button,
html[data-vt-kind="retro"] [class*="headerCorner"] button {
  border-radius: 0;
  background: var(--vs-chrome, #d9dce2);
  box-shadow: inset 1px 1px 0 var(--vs-frame-light, #ffffff), inset -1px -1px 0 var(--vs-frame-dark, #808080);
}
/* selection and focus */
html[data-vt-kind="retro"] [class*="panelRow"],
html[data-vt-kind="retro"] [class*="panelActive"] {
  border-radius: 0;
}
html[data-vt-kind="retro"] [class*="panelActive"]:focus-visible {
  outline: 1px dotted var(--dsw-alias-label-primary);
  outline-offset: -3px;
}
html[data-vt-kind="retro"] :focus-visible {
  outline: 1px dotted var(--dsw-alias-label-primary);
  outline-offset: 1px;
}
html[data-vt-kind="retro"] .vt-card,
html[data-vt-kind="retro"] .vt-modes,
html[data-vt-kind="retro"] .vt-mode,
html[data-vt-kind="retro"] .vt-restore {
  border-radius: 0;
}
html[data-vt-kind="retro"] [class*="fileCard"],
html[data-vt-kind="retro"] .vt-card:not([data-active]) {
  border-radius: 0;
  box-shadow: inset 1px 1px 0 var(--vs-frame-light, #ffffff), inset -1px -1px 0 var(--vs-frame-dark, #808080);
}
/* project/workspace rows: a plain dark folder glyph, no colored tile */
html[data-vt-kind="retro"] [class*="_projectRow"] > :first-child,
html[data-vt-kind="retro"] [class*="_projectRow"] > :first-child * {
  background: transparent;
  box-shadow: none;
  border: 0;
  border-radius: 0;
  color: var(--dsw-alias-label-primary);
}
/* selected conversation: a flat blue bar with white text and no frame;
   folders and workspaces keep the gray sidebar treatment */
html[data-vt-kind="retro"] [class*="sidebarCol"] [class*="_sessionRow"][class*="_selected"],
html[data-vt-kind="retro"] [class*="sidebarCol"] [class*="_searchResultRow"][class*="_selected"] {
  background-color: #0e41bf;
  background-clip: border-box;
  color: #ffffff;
  border-color: transparent;
  box-shadow: none;
  outline: none;
}
html[data-vt-kind="retro"] [class*="sidebarCol"] [class*="_sessionRow"][class*="_selected"] *,
html[data-vt-kind="retro"] [class*="sidebarCol"] [class*="_searchResultRow"][class*="_selected"] * {
  color: inherit;
}
html[data-vt-kind="retro"] [data-message-bubble] {
  position: relative;
  z-index: 0;
  border-radius: 0;
  background: var(--vs-bubble-border, #5f7fa8);
  box-shadow: none;
  clip-path: polygon(3px 0, calc(100% - 3px) 0, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 0 calc(100% - 3px), 0 3px);
}
html[data-vt-kind="retro"] [data-message-bubble]::before {
  content: "";
  position: absolute;
  inset: 1px;
  z-index: -1;
  background: var(--dsw-specific-bubble, #d0e4fd);
  clip-path: polygon(3px 0, calc(100% - 3px) 0, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 0 calc(100% - 3px), 0 3px);
}

/* ============================================================
   Aqua family (Y2K Aqua)
   Glossy gradients and soft highlights.
   ============================================================ */
html[data-vt-kind="aqua"] a[class*="newSession"],
html[data-vt-kind="aqua"] button[class*="newSession"] {
  border-radius: 999px;
  background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.42), rgba(255, 255, 255, 0) 55%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 2px 5px rgba(12, 60, 96, 0.26);
}
html[data-vt-kind="aqua"] [class*="composerSeat"] [class*="_card"] {
  background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.66), rgba(222, 240, 255, 0.32));
}
html[data-vt-kind="aqua"] [class*="composerSeat"] [class*="_primary"] {
  background-image: linear-gradient(180deg, #6fb9e9 0%, #2a86bf 52%, #1269a5 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.65), 0 2px 6px rgba(12, 60, 96, 0.28);
}
html[data-vt-kind="aqua"] [class*="composerSeat"] [class*="_add"] {
  background-image: linear-gradient(180deg, #ffffff, #dbeaf8);
  box-shadow: inset 0 1px 0 #ffffff, 0 0 0 1px rgba(18, 105, 165, 0.18);
}
html[data-vt-kind="aqua"] [class*="panelActive"] {
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

/* ============================================================
   Picker panel (plugin-owned markup; host tokens only)
   ============================================================ */
.vt-page {
  box-sizing: border-box;
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  padding: 36px 28px 44px;
  color: var(--dsw-alias-label-primary);
}
.vt-head {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.vt-title {
  margin: 0;
  font-size: 21px;
  line-height: 30px;
  font-weight: 600;
  letter-spacing: -0.01em;
}
.vt-sub {
  margin: 0;
  max-width: 60ch;
  color: var(--dsw-alias-label-secondary);
  font-size: 13px;
  line-height: 20px;
}
.vt-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 22px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--dsw-alias-border-l2);
}
.vt-bar-label {
  color: var(--dsw-alias-label-tertiary);
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.vt-bar-value {
  color: var(--dsw-alias-label-primary);
  font-size: 13px;
  font-weight: 500;
}
.vt-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(228px, 1fr));
  gap: 10px;
  margin-top: 16px;
}
.vt-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 58px;
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.12s ease, border-color 0.12s ease, box-shadow 0.12s ease;
}
.vt-card:hover {
  background: var(--dsw-alias-interactive-bg-hover);
}
.vt-card:focus-visible {
  outline: 2px solid var(--dsw-alias-state-business-primary);
  outline-offset: 2px;
}
.vt-card[data-active] {
  border-color: var(--dsw-alias-state-business-primary);
  box-shadow: inset 0 0 0 1px var(--dsw-alias-state-business-primary);
}
.vt-swatch {
  position: relative;
  flex: none;
  width: 46px;
  height: 38px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--dsw-alias-border-l2);
  background: var(--vt-swatch-base);
}
.vt-swatch-panel {
  position: absolute;
  inset: 6px 6px 12px 18px;
  border-radius: 4px;
}
.vt-swatch-accent {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 7px;
}
.vt-card-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.vt-card-name {
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
  color: var(--dsw-alias-label-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.vt-card-meta {
  font-size: 11px;
  line-height: 16px;
  color: var(--dsw-alias-label-tertiary);
}
.vt-check {
  flex: none;
  margin-left: auto;
  color: var(--dsw-alias-state-business-primary);
  display: inline-flex;
}
.vt-card[data-wide] {
  grid-column: 1 / -1;
}
.vt-modes {
  display: inline-flex;
  margin-left: auto;
  margin-right: 3px;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 999px;
  overflow: hidden;
  background: var(--dsw-alias-bg-layer-2);
}
.vt-mode {
  border: 0;
  background: transparent;
  color: var(--dsw-alias-label-tertiary);
  font: inherit;
  font-size: 11px;
  line-height: 16px;
  padding: 3px 10px;
  cursor: pointer;
}
.vt-mode[data-on] {
  background: var(--dsw-alias-state-business-primary);
  color: var(--dsw-alias-bg-base);
}
.vt-mode:focus-visible {
  outline: 1px solid var(--dsw-alias-state-business-primary);
  outline-offset: -2px;
}
.vt-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-top: 26px;
  padding-top: 16px;
  border-top: 1px solid var(--dsw-alias-border-l2);
}
.vt-restore {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 13px;
  line-height: 20px;
  cursor: pointer;
}
.vt-restore:hover:not(:disabled) {
  background: var(--dsw-alias-interactive-bg-hover);
}
.vt-restore:disabled {
  color: var(--dsw-alias-label-tertiary);
  cursor: default;
}
.vt-restore:focus-visible {
  outline: 2px solid var(--dsw-alias-state-business-primary);
  outline-offset: 2px;
}
.vt-note {
  color: var(--dsw-alias-label-tertiary);
  font-size: 12px;
  line-height: 18px;
}
@media (max-width: 640px) {
  .vt-page {
    padding: 22px 16px 32px;
  }
  .vt-grid {
    grid-template-columns: 1fr;
  }
}
`;

    /* ------------------------------------------------------------------ */
    /* Icons                                                               */
    /* ------------------------------------------------------------------ */

    function PaletteGlyph({ size = 16 }) {
      return h('svg', {
        width: size,
        height: size,
        viewBox: '0 0 16 16',
        fill: 'none',
        'aria-hidden': 'true',
      }, h('path', {
        d: 'M8 1.75a6.25 6.25 0 1 0 0 12.5h.86a1.6 1.6 0 0 0 1.13-2.74 1.6 1.6 0 0 1 1.13-2.73h1.02A2.11 2.11 0 0 0 14.25 6.7 6.25 6.25 0 0 0 8 1.75Z',
        stroke: 'currentColor',
        strokeWidth: 1.3,
        strokeLinejoin: 'round',
      }), h('circle', { cx: 5.1, cy: 6.5, r: 1.05, fill: 'currentColor' }), h('circle', {
        cx: 8,
        cy: 4.6,
        r: 1.05,
        fill: 'currentColor',
      }), h('circle', { cx: 10.9, cy: 6.4, r: 1.05, fill: 'currentColor' }));
    }

    function CheckGlyph() {
      return h('svg', {
        width: 16,
        height: 16,
        viewBox: '0 0 16 16',
        fill: 'none',
        'aria-hidden': 'true',
      }, h('path', {
        d: 'm3.5 8.4 2.9 2.9 6.1-6.2',
        stroke: 'currentColor',
        strokeWidth: 1.7,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }));
    }

    /* ------------------------------------------------------------------ */
    /* Persistence helpers                                                 */
    /* ------------------------------------------------------------------ */

    const EMPTY_STATE = Object.freeze({ theme: null, mode: 'light', at: 0 });

    function normalizeState(value) {
      if (value === null || typeof value !== 'object') return null;
      const at = Number.isFinite(value.at) ? value.at : 0;
      if (at <= 0) return null; // written by this plugin only
      const theme = typeof value.theme === 'string' && themeById(value.theme) !== undefined ? value.theme : null;
      const mode = value.mode === 'dark' ? 'dark' : 'light';
      return { theme, mode, at };
    }

    function readLocalState() {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw === null) return null;
        return normalizeState(JSON.parse(raw));
      } catch {
        return null;
      }
    }

    function writeLocalState(state) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        /* Storage can be disabled; the Host copy still carries the selection. */
      }
    }

    function readInjectedState() {
      try {
        return normalizeState(window.__DSH_VISUAL_THEMES__);
      } catch {
        return null;
      }
    }

    function persistState(state) {
      writeLocalState(state);
      try {
        void fetch(STATE_ROUTE, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          credentials: 'same-origin',
          body: JSON.stringify(state),
        }).catch(() => {});
      } catch {
        /* No fetch or no route: the local copy remains authoritative. */
      }
    }

    function createStore(initial) {
      let value = initial;
      const listeners = new Set();
      return {
        get: () => value,
        set(next) {
          value = next;
          for (const listener of [...listeners]) listener();
        },
        subscribe(listener) {
          listeners.add(listener);
          return () => {
            listeners.delete(listener);
          };
        },
      };
    }

    const BUILTIN_PREFERENCES = ['light', 'dark', 'system'];

    function builtinPreference(preference) {
      return BUILTIN_PREFERENCES.includes(preference) ? preference : 'light';
    }

    /* ------------------------------------------------------------------ */
    /* Panel                                                               */
    /* ------------------------------------------------------------------ */

    function modeLabel(def) {
      if (def.modes !== undefined) return 'Light & dark';
      return def.scheme === 'dark' ? 'Dark' : 'Light';
    }

    function VisualThemesPage(props) {
      const vt = props.vt;
      const t = props.t || vt.t;
      const state = React.useSyncExternalStore(vt.store.subscribe, vt.store.get, vt.store.get);
      const active = state.theme === null ? null : themeById(state.theme);

      const cards = THEMES.map((def) => {
        const isActive = def.key === state.theme;
        const children = [
          h('span', {
            key: 'swatch',
            className: 'vt-swatch',
            style: { '--vt-swatch-base': def.swatch[0] },
            'aria-hidden': 'true',
          }, [
            h('span', {
              key: 'panel',
              className: 'vt-swatch-panel',
              style: { background: def.swatch[1] },
            }),
            h('span', {
              key: 'accent',
              className: 'vt-swatch-accent',
              style: { background: def.swatch[2] },
            }),
          ]),
          h('span', { key: 'body', className: 'vt-card-body' },
            h('span', { className: 'vt-card-name' }, def.name),
            h('span', { className: 'vt-card-meta' }, modeLabel(def))),
        ];
        if (def.modes !== undefined) {
          children.push(h('span', {
            key: 'modes',
            className: 'vt-modes',
            onClick: (event) => event.stopPropagation(),
            onKeyDown: (event) => event.stopPropagation(),
          }, ['light', 'dark'].map((mode) => h('button', {
            key: mode,
            type: 'button',
            className: 'vt-mode',
            'data-on': state.mode === mode ? '' : undefined,
            'aria-pressed': state.mode === mode,
            onClick: () => vt.selectMode(def.key, mode),
          }, mode === 'dark' ? t('dark') : t('light')))));
        }

        if (isActive) {
          children.push(h('span', { key: 'check', className: 'vt-check' }, h(CheckGlyph)));
        }

        return h('div', {
          key: def.key,
          className: 'vt-card',
          role: 'button',
          tabIndex: 0,
          'data-active': isActive ? '' : undefined,
          'data-wide': def.modes !== undefined ? '' : undefined,
          'aria-pressed': isActive,
          'aria-label': def.name,
          onClick: () => vt.select(def.key),
          onKeyDown: (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              vt.select(def.key);
            }
          },
        }, children);
      });

      return h('div', { className: 'vt-page' },
        h('div', { className: 'vt-head' },
          h('h1', { className: 'vt-title' }, t('title')),
          h('p', { className: 'vt-sub' }, t('intro'))),
        h('div', { className: 'vt-bar' },
          h('span', { className: 'vt-bar-label' }, t('current')),
          h('span', { className: 'vt-bar-value' }, active === null ? t('original') : active.name)),
        h('div', { className: 'vt-grid' }, cards),
        h('div', { className: 'vt-foot' },
          h('button', {
            type: 'button',
            className: 'vt-restore',
            disabled: state.theme === null,
            onClick: () => vt.restore(),
          }, h(PaletteGlyph, { size: 14 }), t('restore')),
          h('span', { className: 'vt-note' }, t('persisted'))));
    }

    /* ------------------------------------------------------------------ */
    /* Plugin                                                              */
    /* ------------------------------------------------------------------ */

    const EN = {
      panel: 'Visual themes',
      title: 'Visual themes',
      intro: 'Pick a look for the whole workspace. The choice applies immediately, is saved for the next start, and only one theme is active at a time.',
      current: 'Active theme',
      original: 'Original appearance',
      restore: 'Restore original',
      persisted: 'Saved automatically on this profile.',
      light: 'Light',
      dark: 'Dark',
    };

    const ZH = {
      panel: 'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¨ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¨ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â»ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¹ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“',
      title: 'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¨ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¨ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â»ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¹ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“',
      intro: 'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂºÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â´ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂªÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â·ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â½ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂºÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¨ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¹ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â«ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¹ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â³ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¹ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¹ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¨ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â»ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¿ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¾ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â´ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂªÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¨ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂªÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â»ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¹ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡',
      current: 'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â½ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â»ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¹ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“',
      original: 'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â½ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¹ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¨ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡',
      restore: 'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â½ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¹ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¨ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡',
      persisted: 'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â·ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â²ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¨ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂªÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¨ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¿ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¹ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¨ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â½ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â®ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡',
      light: 'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂµÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¨ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â²',
      dark: 'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â·ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â±ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¨ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â²',
    };

    const inject = ['slots', 'theme', 'locale'];

    function apply(ctx) {
      ctx.effect(() => ctx.locale.register(NS, { en: EN, zh: ZH }), 'visual-themes: dictionaries');
      const t = ctx.locale.bind(NS);

      const originalPreference = builtinPreference(ctx.theme.getTheme().preference);
      const local = readLocalState();
      const injected = readInjectedState();
      let initial = EMPTY_STATE;
      if (local !== null && injected !== null) initial = local.at >= injected.at ? local : injected;
      else initial = local ?? injected ?? EMPTY_STATE;
      writeLocalState(initial);

      const store = createStore(initial);

      /* The stylesheet is a single owned <style> node. */
      ctx.effect(() => {
        const tag = document.createElement('style');
        tag.dataset.visualThemes = 'chrome';
        tag.textContent = CSS;
        document.head.append(tag);
        return () => tag.remove();
      }, 'visual-themes: component stylesheet');

      /* Register every theme definition with the host registry. */
      ctx.effect(() => {
        const disposers = [];
        for (const def of THEMES) {
          const modes = def.modes === undefined ? [def.scheme] : def.modes;
          for (const mode of modes) {
            try {
              disposers.push(ctx.theme.register({
                id: registryId(def, mode),
                colorScheme: mode === 'dark' ? 'dark' : 'light',
                tokens: tokensFor(def, mode),
              }));
            } catch (error) {
              // A live reload can race a still-registered previous generation;
              // the existing definition is already correct for this build.
            }
          }
        }
        return () => {
          for (const dispose of disposers) dispose();
        };
      }, 'visual-themes: theme registry');

      ctx.effect(() => () => {
        delete document.documentElement.dataset.vt;
        delete document.documentElement.dataset.vtKind;
        delete document.documentElement.dataset.vtMode;
      }, 'visual-themes: attribute cleanup');

      function paint(next) {
        const def = next.theme === null ? undefined : themeById(next.theme);
        if (def === undefined) {
          delete document.documentElement.dataset.vt;
          delete document.documentElement.dataset.vtKind;
          delete document.documentElement.dataset.vtMode;
          if (ctx.theme.getTheme().preference !== originalPreference) ctx.theme.setTheme(originalPreference);
          return;
        }
        const mode = def.modes === undefined ? def.scheme : (next.mode === 'dark' ? 'dark' : 'light');
        const id = registryId(def, mode);
        try {
          if (ctx.theme.getTheme().preference !== id) ctx.theme.setTheme(id);
        } catch (error) {
          // The registry is missing this id (unloaded generation); leave the
          // workspace on its current palette instead of crashing the panel.
        }
        document.documentElement.dataset.vt = def.key;
        document.documentElement.dataset.vtKind = def.kind;
        document.documentElement.dataset.vtMode = mode;
      }

      function select(key) {
        const def = themeById(key);
        if (def === undefined) return;
        const current = store.get();
        const next = { theme: key, mode: current.mode, at: Date.now() };
        store.set(next);
        paint(next);
        persistState(next);
      }

      /** Choosing Light or Dark on a theme with modes also activates that theme. */
      function selectMode(key, mode) {
        if (themeById(key) === undefined) return;
        const next = { theme: key, mode: mode === 'dark' ? 'dark' : 'light', at: Date.now() };
        store.set(next);
        paint(next);
        persistState(next);
      }

      function restore() {
        const current = store.get();
        const next = { theme: null, mode: current.mode, at: Date.now() };
        store.set(next);
        paint(next);
        persistState(next);
      }

      /* A selection made in Settings ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¾ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ Appearance ends this plugin's theme. */
      ctx.on('theme/change', (snapshot) => {
        if (store.get().theme === null) return;
        const active = THEMES.some((def) => {
          const modes = def.modes === undefined ? [def.scheme] : def.modes;
          return modes.some((mode) => registryId(def, mode) === snapshot.preference);
        });
        if (active) return;
        const current = store.get();
        const next = { theme: null, mode: current.mode, at: Date.now() };
        store.set(next);
        delete document.documentElement.dataset.vt;
        delete document.documentElement.dataset.vtKind;
        delete document.documentElement.dataset.vtMode;
        persistState(next);
      });

      paint(store.get());

      const face = {
        store,
        t,
        select,
        selectMode,
        restore,
      };

      ctx.slots.inject('main', () => ctx.slots.register({
        name: 'main',
        key: PANEL_ID,
        locale: NS,
        label: () => t('panel'),
        inject: () => ({ vt: face }),
      }, VisualThemesPage));

      ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
        name: 'sidebar.panellist',
        id: PANEL_ID,
        order: 20,
        label: () => t('panel'),
        locale: NS,
      }, PaletteGlyph));
    }

    return { inject, apply, NS, PANEL_ID };
  },
});












