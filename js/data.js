/* ============================================================================
   MerriMade — site content
   ----------------------------------------------------------------------------
   This is the only file you need to edit to change what the site says.
   Everything below is PLACEHOLDER content — swap it for the real thing.

   To add a photo: drop the image in /images and set `image` to its filename
   (e.g. image: "vanilla-pops.jpg"). Leave it as "" and the site draws a
   pastel placeholder tile instead, so nothing ever looks broken.
   ========================================================================== */

const SITE = {
  name: "MerriMade",
  tagline: "Cake pops and small sweet things, made to order",
  intro:
    "Every pop is rolled, dipped and decorated by hand — matched to your " +
    "colours, boxed with ribbon, and made for the weekend you need them.",
  phone: "(555) 014-2287",
  email: "hello@merrimade.example",
  instagram: "@merrimade",
  town: "Rosewood Lane, Millbrook",
  hours: [
    { day: "Tuesday", time: "Order cut-off for that weekend, 8:00 pm" },
    { day: "Thursday", time: "Dipping & decorating — no collections" },
    { day: "Saturday", time: "Collection, 10:00 am – 2:00 pm" },
    { day: "Sunday", time: "Local delivery within 10 miles" }
  ]
};

/* --------------------------------------------------------------------------
   CATEGORIES — the filter buttons on the Treats page, in display order.
   A product's `category` must match one of these `id` values.
   -------------------------------------------------------------------------- */
const CATEGORIES = [
  { id: "cakepops", label: "Cake pops" },
  { id: "cookies", label: "Cookies & bars" },
  { id: "chocolate", label: "Chocolate & fudge" },
  { id: "minis", label: "Cupcakes & minis" },
  { id: "party", label: "Parties & events" },
  { id: "seasonal", label: "Seasonal" }
];

/* --------------------------------------------------------------------------
   PRODUCTS
     price      — number, or null for "priced on request" (custom work)
     unit       — what the price buys ("dozen", "box of 9", …)
     tags       — short badges: dietary info, bestseller, lead time
     featured   — true to show it on the home page
     status     — "available" | "preorder" | "sold-out"
   -------------------------------------------------------------------------- */
const PRODUCTS = [
  {
    id: "vanilla-bean-pops",
    name: "Vanilla Bean Cake Pops",
    category: "cakepops",
    price: 30,
    unit: "dozen",
    blurb:
      "The one everyone orders twice. Real vanilla bean cake rolled with " +
      "cream cheese frosting, dipped in white chocolate, finished with a " +
      "single stripe of colour.",
    tags: ["Bestseller"],
    image: "",
    featured: true,
    status: "available"
  },
  {
    id: "chocolate-fudge-pops",
    name: "Chocolate Fudge Cake Pops",
    category: "cakepops",
    price: 30,
    unit: "dozen",
    blurb:
      "Dark, dense and not too sweet. Dipped in 55% couverture and dusted " +
      "with cocoa, or left glossy — your call.",
    tags: ["Bestseller"],
    image: "",
    featured: true,
    status: "available"
  },
  {
    id: "red-velvet-pops",
    name: "Red Velvet Cake Pops",
    category: "cakepops",
    price: 32,
    unit: "dozen",
    blurb:
      "Proper red velvet — cocoa and buttermilk, not just food colouring. " +
      "White chocolate shell with red velvet crumb scattered on top.",
    tags: [],
    image: "",
    featured: false,
    status: "available"
  },
  {
    id: "birthday-sprinkle-pops",
    name: "Birthday Sprinkle Pops",
    category: "cakepops",
    price: 32,
    unit: "dozen",
    blurb:
      "Funfetti cake, pastel shell, and as many sprinkles as will stick. " +
      "Sprinkle colours matched to the party if you tell us the theme.",
    tags: ["Kids' favourite"],
    image: "",
    featured: true,
    status: "available"
  },
  {
    id: "custom-themed-pops",
    name: "Custom Themed Cake Pops",
    category: "cakepops",
    price: null,
    unit: "from $45 · dozen",
    blurb:
      "Hand-painted, monogrammed, or shaped to match a theme — baby showers, " +
      "weddings, a very specific cartoon character. Send a photo of what " +
      "you're imagining and you'll get a mock-up back.",
    tags: ["Made to order", "3 weeks' notice"],
    image: "",
    featured: true,
    status: "preorder"
  },
  {
    id: "cake-pop-bouquet",
    name: "Cake Pop Bouquet",
    category: "cakepops",
    price: 48,
    unit: "12 pops, arranged",
    blurb:
      "A dozen pops arranged in a wrapped bouquet with tissue and ribbon. " +
      "Turns up better than flowers and doesn't need a vase.",
    tags: ["Gift-ready"],
    image: "",
    featured: true,
    status: "available"
  },
  {
    id: "chocolate-chunk-cookies",
    name: "Brown Butter Chocolate Chunk",
    category: "cookies",
    price: 14,
    unit: "box of 6",
    blurb:
      "Rested 36 hours, baked with 70% chocolate broken by hand into shards, " +
      "flaked salt on top. Crisp edge, molten middle.",
    tags: ["Bestseller"],
    image: "",
    featured: false,
    status: "available"
  },
  {
    id: "frosted-sugar-cookies",
    name: "Frosted Sugar Cookies",
    category: "cookies",
    price: 36,
    unit: "dozen, decorated",
    blurb:
      "Soft-centred sugar cookies under smooth royal icing, cut and piped to " +
      "whatever shape the occasion needs. Names and dates included.",
    tags: ["Made to order", "2 weeks' notice"],
    image: "",
    featured: false,
    status: "available"
  },
  {
    id: "tahini-blondies",
    name: "Salted Tahini Blondies",
    category: "cookies",
    price: 15,
    unit: "box of 6",
    blurb:
      "Fudgy, nutty and not too sweet — tahini swirled through the batter " +
      "and over the top before baking.",
    tags: [],
    image: "",
    featured: false,
    status: "available"
  },
  {
    id: "sea-salt-truffles",
    name: "Sea Salt Chocolate Truffles",
    category: "chocolate",
    price: 22,
    unit: "box of 9",
    blurb:
      "Dark chocolate ganache rolled by hand, dusted in cocoa, finished with " +
      "a flake of Maldon. Three days from making to eating, no longer.",
    tags: ["Gift-ready"],
    image: "",
    featured: true,
    status: "available"
  },
  {
    id: "brown-sugar-fudge",
    name: "Brown Sugar Fudge",
    category: "chocolate",
    price: 16,
    unit: "half pound",
    blurb:
      "Cooked in a copper pan to the old soft-ball method, cut into squares. " +
      "Tastes like the inside of a tablet tin, in the best way.",
    tags: [],
    image: "",
    featured: false,
    status: "available"
  },
  {
    id: "dipped-strawberries",
    name: "Chocolate-Dipped Strawberries",
    category: "chocolate",
    price: 18,
    unit: "box of 6",
    blurb:
      "Only when the berries are actually worth it. Dipped to order the " +
      "morning of collection — these don't keep, so they're same-day only.",
    tags: ["Same day only"],
    image: "",
    featured: false,
    status: "available"
  },
  {
    id: "mini-cupcakes",
    name: "Mini Cupcake Assortment",
    category: "minis",
    price: 28,
    unit: "box of 12",
    blurb:
      "Four flavours, three of each — vanilla, chocolate, lemon and whatever " +
      "the season is doing. Swiss meringue buttercream, piped small.",
    tags: [],
    image: "",
    featured: false,
    status: "available"
  },
  {
    id: "cheesecake-bites",
    name: "Cheesecake Bites",
    category: "minis",
    price: 24,
    unit: "box of 9",
    blurb:
      "Baked vanilla cheesecake on a biscuit base, cut into cubes and dipped " +
      "in white chocolate. Eaten cold, straight from the box.",
    tags: ["Keep chilled"],
    image: "",
    featured: false,
    status: "available"
  },
  {
    id: "dessert-table",
    name: "Dessert Table Package",
    category: "party",
    price: null,
    unit: "from $180 · serves 25+",
    blurb:
      "Cake pops, minis, cookies and a centrepiece, planned around your " +
      "colours and set up on the day. One conversation, one invoice, nothing " +
      "left for you to assemble.",
    tags: ["Made to order", "4 weeks' notice"],
    image: "",
    featured: false,
    status: "preorder"
  },
  {
    id: "favour-pops",
    name: "Favour Pops",
    category: "party",
    price: 36,
    unit: "12, wrapped & tagged",
    blurb:
      "Individually bagged, ribboned and tagged with a name or a date — for " +
      "place settings, party bags and thank-yous. Minimum two dozen.",
    tags: ["Gift-ready", "2 weeks' notice"],
    image: "",
    featured: false,
    status: "available"
  },
  {
    id: "peppermint-bark-pops",
    name: "Peppermint Bark Pops",
    category: "seasonal",
    price: 34,
    unit: "dozen",
    blurb:
      "Winter only. Dark chocolate cake, white chocolate shell, crushed candy " +
      "cane. Gone by mid-December every year.",
    tags: ["Winter only"],
    image: "",
    featured: false,
    status: "sold-out"
  },
  {
    id: "pastel-spring-pops",
    name: "Pastel Spring Pops",
    category: "seasonal",
    price: 32,
    unit: "dozen",
    blurb:
      "Spring only. Lemon and elderflower cake in mint, lilac and butter " +
      "yellow shells, speckled like little eggs.",
    tags: ["Spring only"],
    image: "",
    featured: false,
    status: "sold-out"
  }
];

/* --------------------------------------------------------------------------
   REVIEWS
     rating   — 1 to 5
     date     — YYYY-MM-DD (used for sorting and the "…ago" label)
     product  — optional; a product `id` from above, shown as a small link
   -------------------------------------------------------------------------- */
const REVIEWS = [
  {
    name: "Dana Whitfield",
    location: "Millbrook",
    rating: 5,
    date: "2026-08-09",
    product: "custom-themed-pops",
    text:
      "I sent one blurry photo of my daughter's favourite book cover and got " +
      "back a mock-up the same evening. The pops looked better than the book. " +
      "Twelve seven-year-olds went completely silent, which never happens."
  },
  {
    name: "Marcus Oyelaran",
    location: "Ashgrove",
    rating: 5,
    date: "2026-07-28",
    product: "dessert-table",
    text:
      "Booked the dessert table for my mother's seventieth. They asked what " +
      "she actually likes rather than showing me a catalogue, turned up early, " +
      "set the whole thing up, and left it looking like a magazine. Three " +
      "people asked for the number before the cake was cut."
  },
  {
    name: "Priya Raman",
    location: "Millbrook",
    rating: 5,
    date: "2026-07-14",
    product: "vanilla-bean-pops",
    text:
      "These are not the dry supermarket kind. Actual moist cake, actual " +
      "chocolate — you can tell the difference immediately. I ordered a dozen " +
      "to try and came back for four dozen the following week."
  },
  {
    name: "Tom Beckett",
    location: "Rosewood",
    rating: 4,
    date: "2026-06-30",
    product: "sea-salt-truffles",
    text:
      "Best truffles I've had outside a city chocolatier, and about half the " +
      "price. Only complaint is that a box of nine does not survive the drive " +
      "home, so order two."
  },
  {
    name: "Elena Vasquez",
    location: "Millbrook",
    rating: 5,
    date: "2026-06-12",
    product: "birthday-sprinkle-pops",
    text:
      "Matched the sprinkles to the invitations without me even asking — I'd " +
      "mentioned the colours once in an email. That's the sort of thing you " +
      "don't get from a shop."
  },
  {
    name: "Jonah Feldman",
    location: "Ashgrove",
    rating: 5,
    date: "2026-05-24",
    product: "cake-pop-bouquet",
    text:
      "Sent the bouquet instead of flowers for an anniversary. It arrived " +
      "intact, looked genuinely lovely, and got eaten the same night. Flowers " +
      "have never once managed that."
  },
  {
    name: "Aisha Karim",
    location: "Millbrook",
    rating: 4,
    date: "2026-05-03",
    product: "favour-pops",
    text:
      "Ordered four dozen favour pops for a wedding, each tagged with a " +
      "guest's name. The handwriting on the tags was better than mine and " +
      "not one was misspelled. Held up fine sitting out all afternoon."
  },
  {
    name: "Greg Sandoval",
    location: "Rosewood",
    rating: 5,
    date: "2026-04-19",
    product: "frosted-sugar-cookies",
    text:
      "The iced cookies were almost too pretty to hand out. Crisp edge, soft " +
      "middle, and the icing was smooth as glass rather than that gritty " +
      "supermarket stuff."
  }
];
