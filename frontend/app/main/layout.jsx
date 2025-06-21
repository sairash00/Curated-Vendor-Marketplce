import "../globals.css"
import Navbar from "@/components/navbar/navbar";

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body
        className={`antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
