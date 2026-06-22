export type Priority = "High" | "Medium" | "Low";
export type CallStatus =
  | "Not Called"
  | "Called"
  | "No Response"
  | "Interested"
  | "Follow-up Required"
  | "Meeting Scheduled"
  | "Converted";

export interface Lead {
  id: string;
  rank: number;
  business: string;
  industry: string;
  city: string;
  phone: string;
  website: string;
  rating: number;
  reviews: number;
  score: number;
  priority: Priority;
  status: CallStatus;
  digitalMaturity: number;
  onlinePresence: number;
  marketingNeed: number;
  aiExplanation: string;
  followUpDate?: string;
  notes?: string;
}

const industries = ["Restaurant", "Healthcare", "Retail", "Fitness", "Auto", "Legal", "Real Estate", "Beauty"];
const cities = ["Mumbai", "Bangalore", "Delhi", "Pune", "Hyderabad", "Chennai"];
const businesses = [
  "ABC Restaurant", "Smile Clinic", "FitZone Gym", "Urban Threads", "QuickFix Auto",
  "Justice Partners LLP", "Skyline Realty", "Glow Beauty Spa", "Curry Leaf Diner",
  "DentalCare Pro", "Iron Forge Fitness", "Trendy Wears", "MotorMax Garage",
  "Apex Law Group", "Metro Homes", "Bliss Salon", "Spice Route Café", "EyeCare Plus",
  "PowerHouse Gym", "StyleHub Boutique",
];
const statuses: CallStatus[] = [
  "Not Called", "Called", "No Response", "Interested",
  "Follow-up Required", "Meeting Scheduled", "Converted",
];

function seeded(i: number) {
  return Math.abs(Math.sin(i * 9301 + 49297) * 233280) % 1;
}

export const leads: Lead[] = businesses.map((name, i) => {
  const score = Math.round(60 + seeded(i) * 39);
  const priority: Priority = score >= 85 ? "High" : score >= 70 ? "Medium" : "Low";
  const digital = Math.round(20 + seeded(i + 1) * 60);
  const presence = Math.round(20 + seeded(i + 2) * 70);
  const need = Math.round(100 - digital + seeded(i + 3) * 10);
  return {
    id: `L-${1000 + i}`,
    rank: i + 1,
    business: name,
    industry: industries[i % industries.length],
    city: cities[i % cities.length],
    phone: `+91 ${90000 + i * 137}`.slice(0, 14),
    website: `www.${name.toLowerCase().replace(/[^a-z]/g, "")}.com`,
    rating: Math.round((3 + seeded(i + 4) * 2) * 10) / 10,
    reviews: Math.round(20 + seeded(i + 5) * 800),
    score,
    priority,
    status: statuses[i % statuses.length],
    digitalMaturity: digital,
    onlinePresence: presence,
    marketingNeed: Math.min(100, Math.round(need)),
    aiExplanation:
      "Low social media activity and outdated website indicate strong potential for digital marketing services.",
    followUpDate: i % 3 === 0 ? new Date(Date.now() + (i - 5) * 86400000).toISOString() : undefined,
  };
}).sort((a, b) => b.score - a.score).map((l, i) => ({ ...l, rank: i + 1 }));

export const kpis = {
  totalLeads: leads.length * 47,
  newToday: 38,
  highPriority: leads.filter((l) => l.priority === "High").length * 12,
  callsCompleted: 184,
  conversionRate: 18.4,
};

export const leadsByIndustry = industries.map((name, i) => ({
  name,
  value: 20 + Math.round(seeded(i + 10) * 80),
}));

export const leadsByLocation = cities.map((name, i) => ({
  name,
  value: 15 + Math.round(seeded(i + 20) * 90),
}));

export const priorityDistribution = [
  { name: "High", value: leads.filter((l) => l.priority === "High").length },
  { name: "Medium", value: leads.filter((l) => l.priority === "Medium").length },
  { name: "Low", value: leads.filter((l) => l.priority === "Low").length },
];

export const callsTrend = Array.from({ length: 7 }).map((_, i) => ({
  day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
  calls: 20 + Math.round(seeded(i + 30) * 40),
  conversions: 3 + Math.round(seeded(i + 40) * 8),
}));

export const INDUSTRIES = industries;
export const CITIES = cities;