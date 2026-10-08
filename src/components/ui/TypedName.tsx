interface TypedNameProps {
  first: string;
  last: string;
}

/**
 * Hero name: each word rises out of a mask on first paint (pure CSS, so it
 * doesn't wait for hydration). The first name carries a slow light sweep.
 */
export default function TypedName({ first, last }: TypedNameProps) {
  return (
    <>
      <span className="hero-word">
        <span className="hero-word-inner hero-name-shine" style={{ animationDelay: "0.1s" }}>
          {first}
        </span>
      </span>
      <br />
      <span className="hero-word">
        <span className="hero-word-inner" style={{ animationDelay: "0.22s" }}>
          {last}
        </span>
      </span>
    </>
  );
}
