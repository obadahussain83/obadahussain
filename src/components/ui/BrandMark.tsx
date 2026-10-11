import Image from "next/image";

type BrandMarkProps = {
  className?: string;
  priority?: boolean;
};

const imgClass =
  "h-full w-full scale-[1.15] object-contain transition-[transform,filter] duration-300 ease-out group-hover:scale-[1.22] group-hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.6)] group-hover/mark:scale-[1.22] group-hover/mark:drop-shadow-[0_0_10px_rgba(56,189,248,0.6)]";

// O·H crystal monogram: a glowing cut for dark and a clear-glass cut for light.
// Both are rendered and CSS shows the one matching [data-theme], so the right
// logo is there from first paint with no theme flash.
export default function BrandMark({ className = "h-11 w-11", priority = false }: BrandMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={`group/mark relative inline-flex shrink-0 items-center justify-center ${className}`}
    >
      <Image
        src="/logo-oh-dark.png"
        alt=""
        width={256}
        height={256}
        priority={priority}
        sizes="48px"
        className={`brand-mark-dark ${imgClass}`}
      />
      <Image
        src="/logo-oh-light.png"
        alt=""
        width={256}
        height={256}
        priority={priority}
        sizes="48px"
        className={`brand-mark-light absolute inset-0 ${imgClass}`}
      />
    </span>
  );
}
