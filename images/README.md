# Photos

Drop product photos in this folder, then point at them from `js/data.js`:

```js
{ id: "vanilla-bean-pops", name: "Vanilla Bean Cake Pops", image: "vanilla-bean-pops.jpg", … }
```

The `image` value is just the filename — the site adds the `images/` prefix.

Leave `image: ""` and the page draws a candy-coloured gradient tile with the product's
initial instead, so a missing photo never looks broken. You can add photos one
at a time; the rest keep their placeholders.

**Suggestions, not rules**

- Landscape, roughly 4:3 — cards crop to that shape.
- 1200px on the long edge is plenty; anything larger just slows the page down.
- Save as JPG (or WebP) at ~80% quality.
- Name files after the product `id` so they're easy to match up later.
