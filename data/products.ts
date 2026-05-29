export type Spec = { label: string; value: string };

export type Product = {
  slug: string;
  name: string;
  categorySlug: string;
  shortDescription: string;
  longDescription: string;
  images: string[]; // e.g. "/images/products/sewer-jetting-machine.jpg" — empty shows a placeholder
  specs: Spec[]; // fill from your spec sheet
  features: string[];
  applications: string[];
  status: "available" | "coming-soon";
  featured?: boolean;
};

/**
 * HOW TO ADD A PRODUCT
 * 1. Append a new object to the array below.
 * 2. `categorySlug` must match a slug in data/categories.ts.
 * 3. Drop an image in /public/images/products/ and add its path to `images`.
 * 4. Fill `specs` from your spec sheet; add `features` and `applications`.
 * 5. Set `featured: true` to surface it on the homepage; `status: "coming-soon"` for in-development items.
 */
export const products: Product[] = [
  // ── Sewer & Drain Cleaning ──────────────────────────────
  {
    slug: "de-silting-machine",
    name: "De-Silting Machine",
    categorySlug: "sewer-drain-cleaning",
    shortDescription:
      "Removes accumulated silt and sludge from drains and sewer lines to restore flow.",
    longDescription:
      "The De-Silting Machine is built to clear accumulated silt, sludge, and debris from drains and sewer lines, restoring proper flow in municipal and institutional networks.",
    images: [],
    specs: [],
    features: [],
    applications: ["Municipal Corporations", "Gram Panchayats", "Industrial Facilities"],
    status: "available",
  },
  {
    slug: "mini-jetting-machine",
    name: "Mini Jetting Machine",
    categorySlug: "sewer-drain-cleaning",
    shortDescription:
      "Compact high-pressure water-jetting unit for narrow lanes and smaller drains.",
    longDescription:
      "A compact, maneuverable high-pressure jetting unit designed for narrow lanes and smaller drains where larger machines cannot reach.",
    images: [],
    specs: [],
    features: [],
    applications: ["Municipal Corporations", "Residential Townships", "Gram Panchayats"],
    status: "available",
  },
  {
    slug: "sewer-jetting-machine",
    name: "Sewer Jetting Machine",
    categorySlug: "sewer-drain-cleaning",
    shortDescription:
      "High-pressure jetting system to clear blockages and scour sewer lines.",
    longDescription:
      "A high-pressure water-jetting system that clears blockages and scours sewer lines, built for reliable, repeatable cleaning across municipal and township networks.",
    images: [],
    specs: [],
    features: [],
    applications: ["Municipal Corporations", "Industrial Facilities", "Residential Townships"],
    status: "available",
    featured: true,
  },
  {
    slug: "suction-cum-jetting-machine",
    name: "Suction Cum Jetting Machine",
    categorySlug: "sewer-drain-cleaning",
    shortDescription:
      "Combines high-pressure jetting and vacuum suction to clean and empty sewer lines in one operation.",
    longDescription:
      "A combination machine that pairs high-pressure jetting with vacuum suction, allowing operators to clean and empty sewer lines in a single, efficient operation.",
    images: [],
    specs: [],
    features: [],
    applications: ["Municipal Corporations", "Smart City Initiatives", "Industrial Facilities"],
    status: "available",
    featured: true,
  },
  {
    slug: "tractor-mounted-suction-machine",
    name: "Tractor Mounted Suction Machine",
    categorySlug: "sewer-drain-cleaning",
    shortDescription:
      "Tractor-mounted vacuum system for desludging septic tanks and drains in semi-urban and rural areas.",
    longDescription:
      "A tractor-mounted vacuum system ideal for desludging septic tanks and drains across semi-urban and rural areas where dedicated trucks are not practical.",
    images: [],
    specs: [],
    features: [],
    applications: ["Gram Panchayats", "Municipal Corporations", "Rural Sanitation"],
    status: "available",
  },
  {
    slug: "truck-mounted-sewer-suction-machine",
    name: "Truck Mounted Sewer Suction Machine",
    categorySlug: "sewer-drain-cleaning",
    shortDescription:
      "Heavy-duty truck-mounted vacuum for large municipal sewer and septic operations.",
    longDescription:
      "A heavy-duty, truck-mounted vacuum system engineered for large municipal sewer and septic operations that demand high capacity and sustained performance.",
    images: [],
    specs: [],
    features: [],
    applications: ["Municipal Corporations", "Smart City Initiatives", "Industrial Facilities"],
    status: "available",
  },

  // ── Road Cleaning ───────────────────────────────────────
  {
    slug: "truck-mounted-road-sweeper",
    name: "Truck Mounted Road Sweeper",
    categorySlug: "road-cleaning",
    shortDescription:
      "Vehicle-mounted mechanical/vacuum sweeper for roads, highways, and large premises.",
    longDescription:
      "A vehicle-mounted mechanical and vacuum sweeper that keeps roads, highways, and large premises clean efficiently and at scale.",
    images: [],
    specs: [],
    features: [],
    applications: ["Municipal Corporations", "Smart City Initiatives", "Commercial Developments"],
    status: "available",
    featured: true,
  },
  {
    slug: "tractor-attached-road-sweeping-machine",
    name: "Tractor Attached Road Sweeping Machine",
    categorySlug: "road-cleaning",
    shortDescription:
      "Tractor attachment for sweeping roads, yards, and open spaces cost-effectively.",
    longDescription:
      "A tractor-mounted sweeping attachment that delivers cost-effective cleaning for roads, yards, and large open premises.",
    images: [],
    specs: [],
    features: [],
    applications: ["Gram Panchayats", "Industrial Facilities", "Municipal Corporations"],
    status: "available",
  },
  {
    slug: "floor-scrubber",
    name: "Floor Scrubber",
    categorySlug: "road-cleaning",
    shortDescription:
      "Scrubbing and cleaning machine for indoor floors in institutions, malls, and factories.",
    longDescription:
      "A floor-scrubbing machine for cleaning indoor surfaces in institutions, malls, factories, and commercial premises.",
    images: [],
    specs: [],
    features: [],
    applications: ["Educational Institutions", "Commercial Developments", "Industrial Facilities"],
    status: "available",
  },

  // ── Garbage Collection & Transport ──────────────────────
  {
    slug: "electric-garbage-collector",
    name: "Electric Garbage Collector",
    categorySlug: "garbage-collection",
    shortDescription:
      "Battery-powered vehicle for door-to-door collection in colonies, townships, and narrow lanes.",
    longDescription:
      "A battery-powered collection vehicle ideal for door-to-door waste collection in colonies, townships, and narrow lanes — clean, quiet, and economical to run.",
    images: [],
    specs: [],
    features: [],
    applications: ["Residential Townships", "Municipal Corporations", "Gram Panchayats"],
    status: "available",
    featured: true,
  },
  {
    slug: "garbage-compactor-truck",
    name: "Garbage Compactor Truck",
    categorySlug: "garbage-collection",
    shortDescription:
      "Compresses collected waste to maximise load capacity for efficient transport.",
    longDescription:
      "A compactor truck that compresses collected waste to maximise load capacity, reducing trips and improving the efficiency of municipal transport.",
    images: [],
    specs: [],
    features: [],
    applications: ["Municipal Corporations", "Smart City Initiatives"],
    status: "available",
    featured: true,
  },
  {
    slug: "garbage-tipper",
    name: "Garbage Tipper",
    categorySlug: "garbage-collection",
    shortDescription:
      "Tipper vehicle for transporting collected waste to processing or disposal sites.",
    longDescription:
      "A tipper vehicle for transporting collected waste from collection points to processing or disposal sites.",
    images: [],
    specs: [],
    features: [],
    applications: ["Municipal Corporations", "Gram Panchayats", "Industrial Facilities"],
    status: "available",
  },
  {
    slug: "skip-loader",
    name: "Skip Loader",
    categorySlug: "garbage-collection",
    shortDescription:
      "Lifts and transports skip bins for bulk and commercial waste handling.",
    longDescription:
      "A skip loader that lifts and transports skip bins, ideal for bulk and commercial waste handling operations.",
    images: [],
    specs: [],
    features: [],
    applications: ["Commercial Developments", "Industrial Facilities", "Municipal Corporations"],
    status: "available",
  },

  // ── Mobile Sanitation ───────────────────────────────────
  {
    slug: "10-seater-mobile-toilet",
    name: "10-Seater Mobile Toilet",
    categorySlug: "mobile-sanitation",
    shortDescription:
      "Portable multi-unit toilet block for events, sites, and public gatherings.",
    longDescription:
      "A portable ten-seater toilet block designed for events, construction sites, and public gatherings where temporary sanitation is needed at scale.",
    images: [],
    specs: [],
    features: [],
    applications: ["Public Events", "Construction Sites", "Municipal Corporations"],
    status: "available",
    featured: true,
  },
  {
    slug: "frp-urinal",
    name: "FRP Urinal",
    categorySlug: "mobile-sanitation",
    shortDescription:
      "Fibre-reinforced plastic urinal unit — durable, lightweight, and low-maintenance.",
    longDescription:
      "A fibre-reinforced plastic (FRP) urinal unit that is durable, lightweight, and easy to maintain — well suited to public and high-traffic locations.",
    images: [],
    specs: [],
    features: [],
    applications: ["Public Spaces", "Municipal Corporations", "Educational Institutions"],
    status: "available",
  },
  {
    slug: "ms-portable-toilet",
    name: "MS Portable Toilet",
    categorySlug: "mobile-sanitation",
    shortDescription:
      "Mild-steel portable toilet cabin for construction sites and public use.",
    longDescription:
      "A robust mild-steel (MS) portable toilet cabin built to withstand demanding construction-site and public-use environments.",
    images: [],
    specs: [],
    features: [],
    applications: ["Construction Sites", "Public Events", "Industrial Facilities"],
    status: "available",
  },
  {
    slug: "customizable-mobile-toilet",
    name: "Customizable Mobile Toilet Solutions",
    categorySlug: "mobile-sanitation",
    shortDescription:
      "Toilet units built to specific seater counts and configurations.",
    longDescription:
      "Mobile toilet units engineered to your exact seater count, material, and configuration requirements for any project specification.",
    images: [],
    specs: [],
    features: [],
    applications: ["Custom Projects", "Municipal Corporations", "Public Events"],
    status: "available",
  },

  // ── Waste Collection Infrastructure ─────────────────────
  {
    slug: "dustbins",
    name: "Dustbins",
    categorySlug: "waste-collection-infrastructure",
    shortDescription:
      "Durable bins in multiple sizes for public, institutional, and municipal use.",
    longDescription:
      "Durable dustbins available in a range of sizes and materials for public, institutional, and municipal waste collection.",
    images: [],
    specs: [],
    features: [],
    applications: ["Municipal Corporations", "Educational Institutions", "Commercial Developments"],
    status: "available",
  },
  {
    slug: "segregation-units",
    name: "Segregation Units",
    categorySlug: "waste-collection-infrastructure",
    shortDescription:
      "Bins and stations designed for wet/dry waste segregation at source.",
    longDescription:
      "Segregation bins and stations that enable wet/dry waste separation at source, supporting cleaner downstream processing and recycling.",
    images: [],
    specs: [],
    features: [],
    applications: ["Smart City Initiatives", "Residential Townships", "Municipal Corporations"],
    status: "available",
  },
  {
    slug: "customized-collection-solutions",
    name: "Customized Collection Solutions",
    categorySlug: "waste-collection-infrastructure",
    shortDescription:
      "Bespoke bins and collection stations built to project specification.",
    longDescription:
      "Bespoke collection bins and stations designed and built to your project's specific requirements.",
    images: [],
    specs: [],
    features: [],
    applications: ["Custom Projects", "Smart City Initiatives", "Commercial Developments"],
    status: "available",
  },

  // ── Sanitary Waste Management ───────────────────────────
  {
    slug: "sanitary-pad-vending-machine",
    name: "Sanitary Pad Vending Machine",
    categorySlug: "sanitary-waste-management",
    shortDescription:
      "Dispenses sanitary napkins in schools, institutions, and workplaces.",
    longDescription:
      "An automatic sanitary napkin vending machine for schools, institutions, and workplaces, supporting menstrual hygiene access.",
    images: [],
    specs: [],
    features: [],
    applications: ["Educational Institutions", "Hospitals & Healthcare Facilities", "Industrial Facilities"],
    status: "available",
  },
  {
    slug: "sanitary-pad-incinerator",
    name: "Sanitary Pad Incinerator",
    categorySlug: "sanitary-waste-management",
    shortDescription:
      "Safely incinerates used sanitary napkins for hygienic disposal.",
    longDescription:
      "A sanitary pad incinerator that safely and hygienically disposes of used napkins, ideal for institutions and workplaces.",
    images: [],
    specs: [],
    features: [],
    applications: ["Educational Institutions", "Hospitals & Healthcare Facilities", "Commercial Developments"],
    status: "available",
  },
  {
    slug: "biomedical-incinerator",
    name: "Biomedical Incinerator",
    categorySlug: "sanitary-waste-management",
    shortDescription:
      "Incinerates biomedical and clinical waste for safe disposal in hospitals and clinics.",
    longDescription:
      "A biomedical incinerator engineered for the safe disposal of clinical and biomedical waste in hospitals, clinics, and healthcare facilities.",
    images: [],
    specs: [],
    features: [],
    applications: ["Hospitals & Healthcare Facilities", "Government Departments"],
    status: "available",
  },

  // ── Waste Processing ────────────────────────────────────
  {
    slug: "plastic-baling-machine",
    name: "Plastic Baling Machine",
    categorySlug: "waste-processing",
    shortDescription:
      "Compresses and bales plastic and recyclable waste for efficient storage and recycling.",
    longDescription:
      "A baling machine that compresses plastic and recyclable waste into dense bales for efficient storage, transport, and recycling.",
    images: [],
    specs: [],
    features: [],
    applications: ["Industrial Facilities", "Municipal Corporations", "Commercial Developments"],
    status: "available",
  },

  // ── Electric & Special Purpose Vehicles ─────────────────
  {
    slug: "skylift-electric-vehicle",
    name: "Skylift Electric Vehicle",
    categorySlug: "special-vehicles",
    shortDescription:
      "Electric aerial work platform for maintenance, utility, and at-height tasks.",
    longDescription:
      "An electric aerial work platform (skylift) for maintenance, lighting, and utility tasks that require safe access at height.",
    images: [],
    specs: [],
    features: [],
    applications: ["Municipal Corporations", "Smart City Initiatives", "Industrial Facilities"],
    status: "available",
  },
  {
    slug: "vaikunth-rath",
    name: "Vaikunth Rath",
    categorySlug: "special-vehicles",
    shortDescription:
      "A dedicated vehicle for the dignified transport of the deceased in last-rites services.",
    longDescription:
      "The Vaikunth Rath is a dedicated, respectfully designed vehicle for the dignified transport of the deceased as part of community last-rites services.",
    images: [],
    specs: [],
    features: [],
    applications: ["Municipal Corporations", "Gram Panchayats", "Community Services"],
    status: "available",
  },
];

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getProduct(categorySlug: string, slug: string): Product | undefined {
  return products.find((p) => p.categorySlug === categorySlug && p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
