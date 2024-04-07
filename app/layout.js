import { Actor } from "next/font/google";
import "./globals.css";
import Header from "../components/shared/Header";

const actor = Actor({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "Calorie Guard",
  description:
    "The dream that everyone seeks. A life without medicine. We provide the easiest way to stay healthy and fit without sacrificing daily enjoyment.",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <link
        href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
        rel="stylesheet"
      />
      <body className={actor.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
