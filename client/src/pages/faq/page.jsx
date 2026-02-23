import { redirect } from "next/navigation";
import { defaultFaqSlug } from "./data";

export default function FaqIndexPage() {
  redirect(`/faq/${defaultFaqSlug}`);
}
