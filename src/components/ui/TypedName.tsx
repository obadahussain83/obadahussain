interface TypedNameProps {
  first: string;
  last: string;
}

export default function TypedName({ first, last }: TypedNameProps) {
  return (
    <>
      <span className="text-accent">{first}</span>
      <br />
      {last}
    </>
  );
}
