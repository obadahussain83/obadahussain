import { notFound } from "next/navigation";

// Unknown paths land here (the middleware prefixes every path with a
// language), so they render [lang]/not-found inside the localized layout.
export default function CatchAll() {
  notFound();
}
