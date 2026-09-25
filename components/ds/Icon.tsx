import {
  Check,
  ChevronDown,
  ImagePlus,
  Leaf,
  Mail,
  Map,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Trees,
  Upload,
  type LucideIcon,
} from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  check: Check,
  'chevron-down': ChevronDown,
  image: ImagePlus,
  leaf: Leaf,
  mail: Mail,
  map: Map,
  'map-pin': MapPin,
  'message-circle': MessageCircle,
  phone: Phone,
  'shield-check': ShieldCheck,
  trees: Trees,
  upload: Upload,
};

export type IconName = keyof typeof ICONS;

export function Icon({
  name,
  size = 20,
  color = 'currentColor',
  className,
  style,
}: {
  name: string;
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const C = ICONS[name] ?? Leaf;
  return <C aria-hidden size={size} color={color} strokeWidth={2} className={className} style={{ flex: 'none', ...style }} />;
}
