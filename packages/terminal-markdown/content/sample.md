# This is the YAML "front matter. It's used to set styles and options.

# The following front matter explicitly sets all styles and options to

# the default values, and also creates two example styles (strong, cool).

style:
normal: # normal sets base styles for content
font: normal # normal | <name> (https://patorjk.com/software/taag/)
text: normal # choice: normal | bold | underline | blink
fg: white
bg: black
image:
scale: 0 # scale factor, examples: 0 (none), or 200% or 2.0

h1: # h1 - h3 are supported; headers inherit normal style
font: ANSI Regular

color:
palette: 16 # 16 (standard palette) | 256 (common palette) | 0 (rgb)
grayscale: false # true only affects rgb color, maps to shades of gray

whitespace: # preserve or trim whitespace
all: true # base whitespace setting
top: true # preserve empty lines at top of content
bottom: true # preserve empty lines at bottom of content
leading: true # preserve blanks at beginning of lines
trailing: true # preserve blanks at end of lines

# The following are examples of custom styles.

# All custom styles inherit normal style settings by default, but a

# different style can be specified.

warm: # example: named style
inherit: normal # all custom styles inherit from normal by default
fg: yellow

cool: # example: named style
inherit: warm # cool inherits from warm style (instead of normal)
fg: blue # cool overrides fg from warm style

strong:
text: bold

# Front matter terminates with three dashes; everything past that is content.

---

# Greetings!

Set the <warm>style for this part</warm> and then undo it.

Set the <warm>style for this part but <cool>for this specifically</> and then
reset back to the default.

<cool>
This paragraph has the cool style.

So does this one.
</>

This paragraph is back to the normal style.

Styles can also be set <cool>inline</cool>.

Styles can be <cool, strong>combined and </cool> individually reset </> or
entirely restored back to normal.

The following displays an image. Image URLs must be on their own line.

https://image-url
