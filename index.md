# This is the **HOMEPAGE**.
Refer to [Markdown](http://daringfireball.net/projects/markdown/) for how to write markdown files.
## Quick Start Notes:
1. Add images to the *images* folder if the file is referencing an image.

```mermaid
flowchart LR

A[Hard] -->|Text| B(Round)
B --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2]
```

## Timer test:
<div id="my-timer"></div>

<script src="/scripts/index.md/my-timer.js"></script>

<script type="text/javascript">
  // Update the time immediately
  updateTime();

  // Update the time every second (1000 milliseconds)
  setInterval(updateTime, 1000);
</script>
