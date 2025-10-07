import './globals.css';

export const metadata = {
  title: 'Password Vault',
  description: 'Secure password manager',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}