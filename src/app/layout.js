import "./globals.scss";

export const metadata = {
  title: "We Are Eight — Referral Program",
  description: "$2,500 per hire. Every hire. For life.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
