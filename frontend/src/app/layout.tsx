import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "GoldenHour AI",
  description: "AI Emergency Response System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        {/* Navbar will appear on ALL pages */}
        <Navbar />

        {/* Page content */}
        {children}

      </body>
    </html>
  );
}