// Central company data. Edit here to update site-wide details.

export const company = {
  name: "S.S. Engineers",
  legalName: "S.S. Engineers",
  tagline: "Join and Pledge Together to Clean India",
  established: 2018,
  founder: "Sunita Sarode",
  teamSize: "15–20",
  // Optional personal note from the founder shown on the About page.
  // Leave empty ("") to hide it.
  founderMessage: "",

  hero: {
    // Primary headline. Alternate option kept for reference:
    // "Cleaner Cities Start Here."
    title: "Engineering Sustainable Waste Management Solutions for India",
    subtitle:
      "Waste management, sanitation, and custom equipment — designed, built, and serviced in Pune for governments, municipalities, and townships across the country.",
  },

  intro:
    "S.S. Engineers is a Pune-based manufacturing and engineering company specializing in waste management infrastructure, sanitation equipment, and custom project solutions. Since 2018 we have served government departments, municipal corporations, gram panchayats, institutions, industrial facilities, and private organizations across India — designing, modifying, and supplying equipment built to the exact requirement of every tender and order.",

  contact: {
    phones: ["+91 95798 31007", "+91 96235 79202"],
    // Digits only, for tel:/wa.me links
    phonesRaw: ["919579831007", "919623579202"],
    whatsapp: "919579831007",
    email: "ssengineeringpune1@gmail.com",
    address: {
      lines: [
        "S.S. Engineers",
        "S. No. 38, Gatha Temple Bypass",
        "Near Fours English School",
        "Dehugaon, Pune, Maharashtra, India",
      ],
      // Update with a real Google Maps embed query or pin coordinates
      mapsQuery: "Dehugaon Pune Maharashtra",
    },
    serviceArea: "Pan India",
    hours: "Monday to Saturday",
  },

  certifications: [
    { name: "MSME Registered", note: "Udyam registration number to be added" },
    { name: "ISO Certified", note: "ISO standard & certificate number to be added" },
  ],

  // Full project lifecycle support
  services: [
    {
      title: "Requirement Analysis",
      body: "We study the tender specification or project need before anything is built.",
    },
    {
      title: "Design & Customization",
      body: "Standard machines or units engineered to a precise specification.",
    },
    {
      title: "Manufacturing & Fabrication",
      body: "In-house manufacturing at our PCMC, Pune facility.",
    },
    {
      title: "Supply & Logistics",
      body: "Pan-India delivery and deployment to site.",
    },
    {
      title: "Installation & Commissioning",
      body: "On-site setup and commissioning so the machine is ready to run.",
    },
    {
      title: "Operator Training",
      body: "Hands-on training so your team can operate equipment safely.",
    },
    {
      title: "Annual Maintenance Contracts",
      body: "Scheduled upkeep that keeps machines reliable year after year.",
    },
    {
      title: "Spare Parts Support",
      body: "Ready availability of spares to minimise downtime.",
    },
    {
      title: "After-Sales Service",
      body: "Responsive service support long after delivery.",
    },
  ],

  sectors: [
    "Government Departments",
    "Municipal Corporations",
    "Gram Panchayats",
    "Smart City Initiatives",
    "Educational Institutions",
    "Hospitals & Healthcare Facilities",
    "Residential Townships",
    "Industrial Facilities",
    "Commercial Developments",
  ],

  whyChoose: [
    "Established in 2018",
    "MSME Registered & ISO Certified",
    "Pan-India operations",
    "Government & private-sector project experience",
    "Custom manufacturing capability",
    "Installation & commissioning support",
    "Operator training",
    "Annual Maintenance Contracts (AMC)",
    "Spare-parts availability",
    "Dedicated after-sales service",
  ],
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Sectors", href: "/sectors" },
  { label: "Contact", href: "/contact" },
];

export const SITE_URL = "https://ssengineers.in"; // update to real domain
