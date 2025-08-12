import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GatherWatch - Watch Together, Plan Seamlessly",
  description:
    "A social movie night scheduler with real-time watch party experience. Create rooms, vote on movies, and watch together in sync.",
  keywords: ["movie night", "watch party", "streaming", "social", "movies", "sync"],
  authors: [{ name: "GatherWatch Team" }],
  openGraph: {
    title: "GatherWatch - Watch Together, Plan Seamlessly",
    description:
      "Create movie rooms, vote on what to watch, and enjoy synchronized viewing with friends.",
    type: "website",
    siteName: "GatherWatch",
  },
  twitter: {
    card: "summary_large_image",
    title: "GatherWatch",
    description: "Watch movies together, plan seamlessly",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
