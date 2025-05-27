import "./globals.css";
import {Toaster} from "react-hot-toast";

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
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: '20px',
              background: '#6366F1', 
              color: '#F9FAFB',       
              fontWeight: '600',
            },
            success: {
              style: {
                background: '#6366F1', 
                color: '#F9FAFB',
              },
            },
            error: {
              style: {
                background: '#EF4444', 
                color: '#F9FAFB',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
