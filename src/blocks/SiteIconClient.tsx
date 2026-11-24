

import { DynamicIcon } from "lucide-react/dynamic.mjs";

export function SiteIconClient({
  iconKey,
  className,
  size,
}: {
  iconKey: string;
  className: string;
  size: number;
}) {
  return <DynamicIcon name={iconKey as never} aria-hidden="true" className={className} size={size} strokeWidth={2} />;
}
