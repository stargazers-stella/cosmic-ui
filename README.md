# cosmic-ui

Lightweight React primitives (button, card, badge, dialog, select, etc.) styled with CSS variables so you can drop them into any Tailwind-ish project.

## Install

```sh
npm install @stargazers-stella/cosmic-ui
```

## Theme tokens

The components expect the CSS variables below. Import the provided sheet or copy the tokens into your own global styles:

```ts
import "@stargazers-stella/cosmic-ui/theme.css";
```

The sheet defines light defaults on `:root` and dark overrides on `.dark`. Toggle the `dark` class on `<html>` or `<body>` for dark mode.

Utility helpers are also included:

- `.surface`, `.surface-strong`, `.surface-muted`, `.surface-inset` map to layered backgrounds for cards, chips, and inset panels.
- `--radius` drives border radii for cards/controls.

If you already manage tokens elsewhere, feel free to override these values instead of importing the CSS.

## Usage

```tsx
import { Button, Card, CardContent, Badge } from "@stargazers-stella/cosmic-ui";

export function Example() {
  return (
    <Card className="max-w-sm">
      <CardContent className="space-y-3">
        <Badge variant="glow">Signal</Badge>
        <p className="text-sm text-muted-foreground">Cosmic UI stays themeable via CSS variables.</p>
        <Button>Action</Button>
      </CardContent>
    </Card>
  );
}
```

The library re-exports the `cn` helper for class merging:

```ts
import { cn } from "@stargazers-stella/cosmic-ui";
```
