# terminal-markdown

The `terminal-markdown` package (and included `md2ascii` command line tool)
parses a subset of markdown (shown below) for rendering to the terminal.

This package only supports [esm](https://nodejs.org/api/esm.html) imports.

To use as a package:

```javascript
const ast = await parseFile(filename);
const result = render(ast);
if (result.ok) {
  console.log(result.content);
} else {
  console.error(result.reason);
  process.exit(1);
}
```

To use `md2ascii`:

```shell
md2ascii <filename>
```

The output is printed to the terminal. To save to a file, use shell
redirection (`>`); for example:

```shell
md2ascii <filename> > <outfile>
```

## Spec

```markdown
---
# This is the "front matter" section for defining content options and styles.
# It begins and ends with three dashes. Everything between must be valid YAML.

styles:

  body:
    color: default      # use the terminal default color
    background: default # use the terminal default background color
    text: normal        # normal | bold | underline | blink
    font: default       # use the terminal default font or choose font from:
                        # https://patorjk.com/software/taag/

  heading:
    text: bold

  h1:                    # inherit from heading
  h2:                    # inherit from h2
  h3:                    # inherit from h3
  h4:                    # inherit from h4
  h5:                    # inherit from h5
  h6:                    # inherit from h6

  paragraph:

  text:

  emphasis:             # italic, use * or _

  strong:               # bold use ** or __

  blockquote:           # use > at start of the paragraph

  code:                 # three backticks (\`\`\`) before and after paragraph

  inlineCode:           # span of text fenced with backticks (\`)

  list:                 # use - or * at start of the paragraph

  link:

  image:

  thematicBreak:        # horizontal rule

tags:                   # create custom tags

  hot:                  # custom style
    inherit: normal     # unless overridden, inherits normal by default
    color: red          # try to choose colors that look good on dark or light

  cold:                 # custom style
    inherit: hot        # cool inherits from hot style
    color: blue         # cool overrides fg from warm style


# Front matter terminates with three dashes, followed by markdown content.
---
# Header 1

## Header 2

### Header 3

#### Header 4

##### Header 5

###### Header 6

Paragraph 1.

This is *italic*

This is **bold**

This is ***italic and bold***

This is **bold and *nested italic***

This is *italic and **nested bold***

This is \`inline code\`

\`\`\`
  This is a code block
\`\`\`

This is an ordered list:

1. Ordered list item 1
1. Ordered list item 2

This is an unordered list:

- Unordered list item 1
- Unordered list item 1

This is a link: [Google](https://google.com).

This is an image: ![Google](https://google.com/favicon.ico).

This is a horizontal rule:

---
This <cold>paragraph</cold> has <hot>custom</hot> tags.
```

## License

Apache 2.0; see [LICENSE](LICENSE) for details.
