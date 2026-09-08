import type { LucideIcon } from "lucide-react";
import {
  Mail,
  Instagram,
  Phone,
  Linkedin,
  Github,
  Gitlab,
  Twitter,
  Facebook,
  Youtube,
  Globe,
  MessageCircle,
  Send,
  AtSign,
  Download,
  FileDown,
  FileText,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  ArrowBigDownDash,
  ExternalLink,
  ChevronRight,
  Plus,
  Check,
  Eye,
} from "lucide-react";

/**
 * Maps the free-form `icon` string stored in the contacts table
 * to a lucide-react component. Unknown values fall back to Globe
 * so hero/footer tiles never render empty.
 */
const ICONS: Record<string, LucideIcon> = {
  mail: Mail,
  email: Mail,
  gmail: Mail,
  instagram: Instagram,
  ig: Instagram,
  phone: Phone,
  whatsapp: Phone,
  wa: Phone,
  tel: Phone,
  linkedin: Linkedin,
  github: Github,
  gitlab: Gitlab,
  twitter: Twitter,
  x: Twitter,
  facebook: Facebook,
  fb: Facebook,
  youtube: Youtube,
  yt: Youtube,
  telegram: Send,
  discord: MessageCircle,
  globe: Globe,
  website: Globe,
  web: Globe,
  link: Globe,
  atsign: AtSign,
  // General UI icons (for Button `icon` prop, etc.)
  download: Download,
  filedown: FileDown,
  filetext: FileText,
  file: FileText,
  bookopen: BookOpen,
  book: BookOpen,
  arrowright: ArrowRight,
  arrowleft: ArrowLeft,
  arrowupright: ArrowUpRight,
  arrowbigdowndash: ArrowBigDownDash,
  externallink: ExternalLink,
  external: ExternalLink,
  chevronright: ChevronRight,
  plus: Plus,
  check: Check,
  eye: Eye,
};

export function getContactIcon(iconName: string): LucideIcon {
  return getLucideIcon(iconName) ?? Globe;
}

/** Strict lookup: null when unknown (caller decides the fallback). */
export function getLucideIcon(iconName: string): LucideIcon | null {
  const key = iconName.toLowerCase().trim().replace(/[^a-z0-9]/g, "");
  return ICONS[key] ?? null;
}
