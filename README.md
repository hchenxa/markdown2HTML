# Markdown Viewer

A browser tool for reading Markdown files with beautiful formatting. Available as a standalone HTML page (drag & drop) and a Chrome extension (auto-render).

## Features

- **Drag & Drop** — drop `.md` files directly onto the page, or click to browse
- **GitHub-style Rendering** — headings, tables, code blocks, blockquotes, task lists, images, etc.
- **Syntax Highlighting** — fenced code blocks with language detection via highlight.js
- **Left-side TOC** — auto-generated table of contents with scroll-spy highlighting
- **Dark / Light Theme** — toggle in toolbar, remembers your preference
- **Image Support** — drop a folder with images alongside the `.md` file to resolve relative paths
- **Responsive** — works on desktop and mobile

## Usage

### Standalone HTML

Open `index.html` in any browser — no server, no build step, no install.

```
open index.html
```

Then drag a Markdown file onto the page.

### Chrome Extension

Install the extension to auto-render any `.md` file opened in Chrome.

1. Clone this repo or download the `extension/` folder
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode** (toggle in the top-right corner)
4. Click **Load unpacked** and select the `extension/` folder
5. *(Optional)* To support local `file://` URLs:
   - Click **Details** on the installed extension
   - Enable **Allow access to file URLs**
6. Open any `.md` file in Chrome — it will render automatically

**Extension features:**
- Auto-detects and renders `.md` / `.markdown` files (both local and remote)
- Left-side Table of Contents with scroll-spy
- Dark / Light / Auto theme (configurable in popup)
- **Raw** button to toggle back to the original plain text
- Enable / disable via the extension popup

## Screenshot

Drop zone:

```
┌──────────────────────────────────┐
│  MD Viewer              [TOC] [◐]│
├──────────────────────────────────┤
│                                  │
│         ┌────────────┐           │
│         │  📄         │           │
│         │  Drop Here  │           │
│         │  [Browse]   │           │
│         └────────────┘           │
│                                  │
└──────────────────────────────────┘
```

Reading view with TOC:

```
┌──────────────────────────────────┐
│  MD Viewer  file.md     [TOC] [◐]│
├─────────┬────────────────────────┤
│ Contents│  # Heading 1           │
│  H1     │                        │
│  H2  ◀──│  Content rendered      │
│  H3     │  with GitHub styling   │
│  H2     │                        │
│         │  ## Heading 2          │
│         │  ...                   │
└─────────┴────────────────────────┘
```

## License

MIT
