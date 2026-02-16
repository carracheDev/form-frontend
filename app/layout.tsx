import Navbar from "@/components/Navbar";
import "./globals.css";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="h-100 bg-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
