# Markdown Viewer

A single-file, zero-dependency browser tool for reading Markdown files. Drag and drop any `.md` file to render it instantly with beautiful formatting.

## Features

- **Drag & Drop** — drop `.md` files directly onto the page, or click to browse
- **GitHub-style Rendering** — headings, tables, code blocks, blockquotes, task lists, images, etc.
- **Syntax Highlighting** — fenced code blocks with language detection via highlight.js
- **Left-side TOC** — auto-generated table of contents with scroll-spy highlighting
- **Dark / Light Theme** — toggle in toolbar, remembers your preference
- **Image Support** — drop a folder with images alongside the `.md` file to resolve relative paths
- **Responsive** — works on desktop and mobile

## Usage

Open `index.html` in any browser — no server, no build step, no install.

```
open index.html
```

Then drag a Markdown file onto the page.

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
