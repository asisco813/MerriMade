# MerriMade

A small marketing site for a home cake-pop and sweet-treat maker — products,
reviews, and how to order.

Plain HTML, CSS and JavaScript. No build step, no dependencies, no server.

## Looking at it

Open `index.html` in a browser. That's it.

If you'd rather serve it locally (needed only if you later add anything that
uses `fetch`):

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Changing the content

**Almost everything lives in `js/data.js`.** Open it and edit — it's commented
throughout. Four blocks:

| Block        | Controls                                                       |
|--------------|----------------------------------------------------------------|
| `SITE`       | Business name, tagline, email, phone, address, weekly hours    |
| `CATEGORIES` | The filter buttons on the Products page                        |
| `PRODUCTS`   | Every treat — name, price, description, badges, status          |
| `REVIEWS`    | Customer reviews, ratings and dates                            |

Contact details, opening hours and the copyright year are pulled from `SITE`
into every page automatically, so you change them in one place.

### Adding a product

Copy an existing entry in `PRODUCTS` and edit it. `status` accepts
`"available"`, `"preorder"` or `"sold-out"` (sold-out items appear greyed out
and labelled "Out of season"). Set `featured: true` to also show it on the home
page. Use `price: null` for made-to-order items — the card shows "On request"
and falls back to whatever you put in `unit`.

### Adding a review

Add an entry to `REVIEWS` with a `rating` of 1–5 and a `date` as
`YYYY-MM-DD`. The average, the review count and the "3 weeks ago" labels are
all worked out from the data — nothing to update by hand.

### Adding photos

See `images/README.md`. Products without a photo get a generated gradient tile,
so the site looks finished from day one.

## Pages

| File            | What it is                                            |
|-----------------|-------------------------------------------------------|
| `index.html`    | Home — hero, featured treats, how it works, reviews   |
| `products.html` | Full list, with category filters and search           |
| `reviews.html`  | All reviews, plus a form to leave one                 |
| `about.html`    | The story, ordering instructions, contact details     |
| `css/styles.css`| All styling. Colours are the tokens in `:root` at top |
| `js/data.js`    | **The content — edit this**                           |
| `js/site.js`    | Rendering and interaction                            |

## Notes

- **The review form has no backend.** It opens the visitor's own email app with
  the review filled in. Reviews get added to `js/data.js` by hand. Wiring it to
  a real form service (Formspree, Netlify Forms) is a small change if you want.
- **Dark mode** follows the visitor's system setting.
- **Colours** are CSS custom properties at the top of `css/styles.css`. Change
  `--brand` and the accent updates everywhere.
- The `MerriMade.iml` / `.idea` files are just IntelliJ project config; the site
  doesn't need them.

## Publishing

It's a static site, so anywhere works. GitHub Pages: push to GitHub, then
Settings → Pages → deploy from `main`, root folder.
