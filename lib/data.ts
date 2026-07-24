import {
  Palette,
  ShoppingBag,
  GraduationCap,
  Workflow,
  BrainCircuit,
  LineChart,
  Zap,
  ShieldCheck,
  Wand2,
  Layers,
  BadgeCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export const navLinks = [
  { label: "Products", href: "#products" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export type Product = {
  icon: LucideIcon;
  title: string;
  description: string;
  tag: string;
  gradient: string;
};

export const products: Product[] = [
  {
    icon: BrainCircuit,
    title: "AI Insight",
    description:
      "Turn raw operational data into plain-language decisions with a model that explains its reasoning, not just its output.",
    tag: "Analytics",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    icon: Palette,
    title: "Colour Analysis AI",
    description:
      "Personal colour season detection from a single photo, built for stylists and shoppers who want fit-first recommendations.",
    tag: "Consumer",
    gradient: "from-cyan-500 to-emerald-500",
  },
  {
    icon: ShoppingBag,
    title: "Zenith Fashion",
    description:
      "A styling copilot that pairs inventory data with trend forecasting to plan collections before the season starts.",
    tag: "Retail",
    gradient: "from-fuchsia-500 to-indigo-500",
  },
  {
    icon: Workflow,
    title: "J.E.R.K.",
    description:
      "Just Enough Reasoning Kernel — a lightweight agent runtime for teams shipping narrow, high-reliability automations.",
    tag: "Developer Tools",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: GraduationCap,
    title: "AI for Education",
    description:
      "Adaptive lesson pacing and instant feedback loops that meet every student where they actually are, not where the syllabus assumes.",
    tag: "Education",
    gradient: "from-emerald-500 to-cyan-500",
  },
  {
    icon: LineChart,
    title: "Business Automation",
    description:
      "Connect the tools you already run and let workflows execute themselves — approvals, reporting, and handoffs included.",
    tag: "Operations",
    gradient: "from-indigo-500 to-fuchsia-500",
  },
];

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const features: Feature[] = [
  {
    icon: Sparkles,
    title: "Purpose-Built AI",
    description: "Each product is trained for one job, so it actually gets good at that job.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Sub-200ms response times across the platform, even under heavy concurrent load.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy First",
    description: "Your data trains only your models — never shared, pooled, or resold.",
  },
  {
    icon: Wand2,
    title: "Beautiful UX",
    description: "Interfaces designed to feel like a capable teammate, not another dashboard to babysit.",
  },
  {
    icon: Layers,
    title: "Modular Platform",
    description: "Adopt one product or ten — they share auth, billing, and data without extra glue code.",
  },
  {
    icon: BadgeCheck,
    title: "Enterprise Ready",
    description: "SOC 2-aligned infrastructure, audit logs, and role-based access from day one.",
  },
];

export const steps = [
  {
    number: "01",
    title: "Choose Product",
    description: "Pick the AI product that matches your workflow — from a growing catalog of purpose-built tools.",
  },
  {
    number: "02",
    title: "AI Processes Data",
    description: "Your data is analyzed in real time by models fine-tuned for that exact task, securely and privately.",
  },
  {
    number: "03",
    title: "Receive Intelligent Results",
    description: "Get clear, actionable output — ready to plug into your existing tools or export in one click.",
  },
];

// Honest, defensible numbers rather than inflated vanity metrics.
export const stats = [
  { value: 6, suffix: "+", label: "AI Products" },
  { value: 5, suffix: "", label: "Industries Served" },
  { value: 100, suffix: "%", label: "Purpose-Built Models" },
  { value: 24, suffix: "/7", label: "Platform Uptime" },
];

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  review: string;
  rating: number;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Ananya Rao",
    role: "Founder",
    company: "Loomwear — Fashion Retail",
    review:
      "Zenith Fashion's forecasting caught a demand shift two months before our old process would have. That lead time changed how we plan every collection now.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop",
  },
  {
    name: "Priya Nair",
    role: "Platform Manager",
    company: "Schoolyard — Education",
    review:
      "AI for Education let us personalize pacing for thousands of students without hiring a single extra tutor. Engagement is up, and so is completion rate.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&h=200&auto=format&fit=crop",
  },
  {
    name: "Marcus Feld",
    role: "Operations Lead",
    company: "Fintra — Financial Services",
    review:
      "We replaced four disconnected tools with AI Insight in under a month. The dashboards alone paid for the switch — our finance team finally trusts the numbers.",
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200&h=200&auto=format&fit=crop",
  },
];

export const faqs = [
  {
    question: "What does Zenith build?",
    answer:
      "We build purpose-specific AI products — from analytics and automation to consumer tools like styling and education assistants — rather than one general-purpose model stretched across every use case.",
  },
  {
    question: "How secure is the platform?",
    answer:
      "Every product runs on SOC 2-aligned infrastructure with end-to-end encryption in transit and at rest. Data is never used to train models for other customers.",
  },
  {
    question: "Can businesses integrate it?",
    answer:
      "Yes. Every product ships with a documented REST API, webhooks, and native connectors for the tools most teams already use — no rebuild required.",
  },
  {
    question: "Is customer support available?",
    answer:
      "Our team is available 24/7 through chat and priority email, with a dedicated Slack channel for teams on our business and enterprise plans.",
  },
  {
    question: "Which industries does Zenith support?",
    answer:
      "Fashion, education, financial operations, and general business automation today, with new purpose-built products shipping regularly as we expand into new domains.",
  },
  {
    question: "Do I need machine learning experience to use it?",
    answer:
      "No. Every product is designed for domain experts, not ML engineers — you bring the workflow, and the model handles the reasoning behind the scenes.",
  },
];

export const trustedBy = [
  { label: "AI" },
  { label: "Education" },
  { label: "Fashion" },
  { label: "Startups" },
  { label: "Enterprises" },
];

export const footerLinks = {
  Company: ["About", "Careers", "Blog", "Press"],
  Products: ["AI Insight", "Zenith Fashion", "J.E.R.K.", "AI for Education"],
  Resources: ["Documentation", "API Reference", "Support Center", "Community"],
  Legal: ["Privacy Policy", "Terms of Service"],
};

export const socialLinks = [
  { label: "Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
];

export const contactEmail = "hello@zenith-ai.example.com";
