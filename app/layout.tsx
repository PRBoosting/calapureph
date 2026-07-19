import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "CalaPure | Pure Philippine Calamansi Goodness";
const description =
  "Premium Philippine calamansi for refreshing drinks, cooking, marinades, sauces, and everyday goodness. Shop CalaPure extract and honey calamansi ginger tea.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const imageUrl = host ? `${protocol}://${host}/og-v2.png` : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: imageUrl ? [{ url: imageUrl, width: 1733, height: 907, alt: "CalaPure - Pure. Natural. CalaPure." }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
