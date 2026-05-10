# Markdown Viewer Test

This is a test document to verify the Markdown viewer.

## Text Formatting

This is **bold**, this is *italic*, and this is `inline code`. You can also do ~~strikethrough~~.

Here is a [link to GitHub](https://github.com).

## Code Block

```python
def hello(name):
    """Greet someone."""
    print(f"Hello, {name}!")

hello("World")
```

```javascript
const greet = (name) => {
  console.log(`Hello, ${name}!`);
};

greet("World");
```

## Table

| Feature | Status | Notes |
|---------|--------|-------|
| Drag & Drop | Done | Full page drop zone |
| Markdown Parsing | Done | GFM support |
| Code Highlighting | Done | highlight.js |
| Dark Theme | Done | Toggle in toolbar |
| TOC | Done | Auto-generated |

## Blockquote

> This is a blockquote.
> It can span multiple lines.
>
> > And even be nested.

## List

### Unordered

- Item one
- Item two
  - Sub-item A
  - Sub-item B
- Item three

### Ordered

1. First step
2. Second step
3. Third step

### Task List

- [x] Create HTML file
- [x] Add drag and drop
- [x] Add markdown rendering
- [ ] Ship it

## Horizontal Rule

---

## Image

Here is a placeholder image reference:

![Sample Image](https://via.placeholder.com/600x200/0969da/ffffff?text=Markdown+Viewer)

## Details

<details>
<summary>Click to expand</summary>

This content is hidden by default. It contains additional details that can be revealed by clicking the summary.

</details>

## Math-like content

The formula `E = mc^2` is well known.

## End

That's all! The viewer supports all standard GitHub Flavored Markdown features.
