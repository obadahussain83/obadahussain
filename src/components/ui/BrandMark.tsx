import Image from "next/image";

type BrandMarkProps = {
  className?: string;
  priority?: boolean;
};

// O·H crystal monogram (transparent PNG cut from the master artwork).
export default function BrandMark({ className = "h-11 w-11", priority = false }: BrandMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={`group/mark relative inline-flex shrink-0 items-center justify-center ${className}`}
    >
      <Image
        src="/logo-oh.png"
        alt=""
        width={256}
        height={256}
        priority={priority}
        sizes="48px"
        className="h-full w-full scale-[1.15] object-contain transition-[transform,filter] duration-300 ease-out group-hover:scale-[1.22] group-hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.6)] group-hover/mark:scale-[1.22] group-hover/mark:drop-shadow-[0_0_10px_rgba(56,189,248,0.6)]"
      />
    </span>
  );
}
