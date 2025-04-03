export const metadata = {
  title: "Ingress Academy",
  description: "Ingress Academy",
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.cdnfonts.com/css/sf-pro-display"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
