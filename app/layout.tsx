import type { Metadata } from "next";
import "./globals.css";

const title = "CalaPure | Pure Philippine Calamansi Goodness";
const description =
  "Premium Philippine calamansi for refreshing drinks, cooking, marinades, sauces, and everyday goodness. Shop CalaPure extract and honey calamansi ginger tea.";

export const metadata: Metadata = {
  metadataBase: new URL("https://calapureph.netlify.app"),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/og-v2.png", width: 1733, height: 907, alt: "CalaPure - Pure. Natural. CalaPure." }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-v2.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
