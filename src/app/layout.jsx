import "./globals.css";

export const metadata = {
  title: "2048 GAME",
  description: "2048 is a single-player sliding tile puzzle video game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
