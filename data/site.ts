// ─────────────────────────────────────────────────────────────
// ALL the shop's content lives in this one file.
// Change text, prices, outlets or links here — no need to touch
// the components. Brand name, Instagram handle and follower count
// are real; menu, prices and outlets are still SAMPLE data.
// ─────────────────────────────────────────────────────────────

// While this is true, a small "sample content" strip shows at the
// top of the site. Set it to false once the real menu and outlets are in.
export const isSampleData = true;

export const brand = {
  name: "Tronic Rolls",
  tagline: "Hot off the tawa. Rolled to order.",
  description:
    "Flaky parathas, smoky fillings and our house chutneys — rolled fresh across 5 outlets in Bengaluru.",
  instagramHandle: "tronicrolls", // without the @
  instagramFollowers: "27.8K+",
  phone: "", // TODO: real number (leave empty to hide)
  email: "", // TODO: real email (leave empty to hide)
};

export const instagramUrl = `https://instagram.com/${brand.instagramHandle}`;

export type MenuItem = {
  name: string;
  description: string;
  price: number; // in rupees
  veg: boolean;
  bestseller?: boolean;
};

export type MenuCategory = {
  name: string;
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    name: "Classic Rolls",
    items: [
      { name: "Egg Roll", description: "Single egg, onions, green chilli, lime, house sauce.", price: 90, veg: false },
      { name: "Double Egg Roll", description: "Two eggs fried right into the paratha.", price: 110, veg: false, bestseller: true },
      { name: "Aloo Masala Roll", description: "Spiced potato, pickled onions, mint chutney.", price: 80, veg: true },
    ],
  },
  {
    name: "Chicken",
    items: [
      { name: "Chicken Kathi Roll", description: "Charred chicken tikka, onions, mint mayo.", price: 150, veg: false, bestseller: true },
      { name: "Egg Chicken Roll", description: "Egg-coated paratha loaded with chicken tikka.", price: 170, veg: false },
      { name: "Peri Peri Chicken Roll", description: "Fiery peri peri chicken, cheese, crunchy slaw.", price: 180, veg: false },
    ],
  },
  {
    name: "Paneer & Veg",
    items: [
      { name: "Paneer Tikka Roll", description: "Tandoori paneer, capsicum, onions, green chutney.", price: 140, veg: true, bestseller: true },
      { name: "Mushroom Masala Roll", description: "Pepper-tossed mushrooms with caramelised onions.", price: 130, veg: true },
      { name: "Cheese Corn Roll", description: "Sweet corn, melted cheese, chilli flakes.", price: 120, veg: true },
    ],
  },
  {
    name: "Mutton",
    items: [
      { name: "Mutton Seekh Roll", description: "Juicy seekh kebab, onions, lime, chilli.", price: 200, veg: false },
      { name: "Egg Mutton Roll", description: "Double the richness: egg paratha + mutton.", price: 220, veg: false },
    ],
  },
  {
    name: "Sides & Drinks",
    items: [
      { name: "Masala Fries", description: "Crispy fries with our roll masala.", price: 90, veg: true },
      { name: "Nimbu Soda", description: "Sweet, salted or mixed.", price: 50, veg: true },
      { name: "Masala Chaas", description: "Cool spiced buttermilk.", price: 50, veg: true },
    ],
  },
];

export type Outlet = {
  area: string;
  address: string;
  hours: string;
  phone?: string;
  mapsQuery?: string; // what to search on Google Maps; defaults to the address
};

export const outlets: Outlet[] = [
  { area: "Koramangala", address: "Sample address, 5th Block, Koramangala, Bengaluru 560095", hours: "12 PM – 12 AM" },
  { area: "Indiranagar", address: "Sample address, 100 Feet Road, Indiranagar, Bengaluru 560038", hours: "12 PM – 12 AM" },
  { area: "HSR Layout", address: "Sample address, Sector 1, HSR Layout, Bengaluru 560102", hours: "12 PM – 11 PM" },
  { area: "Jayanagar", address: "Sample address, 4th Block, Jayanagar, Bengaluru 560011", hours: "12 PM – 11 PM" },
  { area: "Whitefield", address: "Sample address, ITPL Main Road, Whitefield, Bengaluru 560066", hours: "12 PM – 11 PM" },
];

// Photos and videos for the "From the feed" wall. Put the files in
// public/gallery/ and list them here, e.g.
//   { src: "/gallery/egg-roll.jpg", alt: "Double egg roll on the tawa", type: "image" },
//   { src: "/gallery/reel-1.mp4", alt: "Rolling a kathi roll", type: "video", poster: "/gallery/reel-1.jpg" },
// While this is empty, the wall shows styled placeholder tiles.
export type GalleryItem = {
  src: string;
  alt: string;
  type: "image" | "video";
  poster?: string; // still frame shown before a video plays
};

export const gallery: GalleryItem[] = [];

export const orderLinks = {
  swiggy: "", // TODO: paste Swiggy link (leave empty to hide the button)
  zomato: "", // TODO: paste Zomato link (leave empty to hide the button)
};
