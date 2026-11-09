import { PageTransition } from "@/components/layout/PageTransition";

/** Re-mounts on every navigation, giving each page its entrance. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
