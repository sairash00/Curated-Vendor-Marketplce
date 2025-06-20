import "./globals.css";
import {Toaster} from "react-hot-toast";
import ReactQueryProvider from "./providers/reactQueryProvider";

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin = "" />
        <link href="https://fonts.googleapis.com/css2?family=Ancizar+Sans:ital,wght@0,100..1000;1,100..1000&display=swap" rel="stylesheet"/>
      </head>
      <body
        className={`antialiased`}
      >
        <ReactQueryProvider>
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
        </ReactQueryProvider>
      </body>
    </html>
  );
}
