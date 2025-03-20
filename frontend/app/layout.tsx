import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;

}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
          {/* ofa if y and u is given then first get y with u and then get u with x  then dy/dx is that first and second one y and u one  */}
      </body>
    </html>
  );
}
