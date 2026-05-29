export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  order: number;
};

// To add a category: append an object below. Products reference it by `slug`.
export const categories: Category[] = [
  {
    slug: "sewer-drain-cleaning",
    name: "Sewer & Drain Cleaning",
    tagline: "Jetting, suction & de-silting",
    description:
      "Purpose-built machines for sewer maintenance, drain cleaning, sludge removal, and municipal sanitation — from compact units for narrow lanes to heavy truck-mounted systems.",
    order: 1,
  },
  {
    slug: "road-cleaning",
    name: "Road Cleaning",
    tagline: "Sweepers & scrubbers",
    description:
      "Advanced cleaning solutions for roads, public spaces, industrial premises, and commercial facilities.",
    order: 2,
  },
  {
    slug: "garbage-collection",
    name: "Garbage Collection & Transport",
    tagline: "Collection & transport fleet",
    description:
      "Reliable waste collection and transport systems for municipalities and large-scale operations.",
    order: 3,
  },
  {
    slug: "mobile-sanitation",
    name: "Mobile Sanitation",
    tagline: "Portable toilet solutions",
    description:
      "Portable sanitation systems for public events, construction sites, institutions, and community facilities.",
    order: 4,
  },
  {
    slug: "waste-collection-infrastructure",
    name: "Waste Collection Infrastructure",
    tagline: "Bins & segregation",
    description:
      "Durable collection systems designed for effective waste segregation and management at source.",
    order: 5,
  },
  {
    slug: "sanitary-waste-management",
    name: "Sanitary Waste Management",
    tagline: "Vending & incineration",
    description:
      "Environmentally responsible systems for the safe disposal of sanitary and clinical waste.",
    order: 6,
  },
  {
    slug: "waste-processing",
    name: "Waste Processing",
    tagline: "Recycling & volume reduction",
    description:
      "Solutions that support recycling and waste-volume reduction initiatives.",
    order: 7,
  },
  {
    slug: "special-vehicles",
    name: "Electric & Special Purpose Vehicles",
    tagline: "Utility & community vehicles",
    description:
      "Purpose-built vehicles for sanitation, utility, and community-support applications.",
    order: 8,
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export const sortedCategories = [...categories].sort((a, b) => a.order - b.order);
