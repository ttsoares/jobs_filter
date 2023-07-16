import "./globals.css";
import { League_Spartan } from "next/font/google";

const lSpartan = League_Spartan({ subsets: ["latin"] });

export const metadata = {
  title: "static-job-listings-master",
  description:
    "https://www.frontendmentor.io/challenges/job-listings-with-filtering-ivstIPCt",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lSpartan.className}>{children}</body>
    </html>
  );
}
