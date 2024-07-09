import 'reflect-metadata'
import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import SocialsColumn from './socials_column';

const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <head>
        <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet" />
      </head> */}
      <body className={`${lora.className} bg-[#394D74]`}>

        {children}


        <div className='absolute m-auto right-[20px] top-[50%] translate-y-[-50%]'>
          <SocialsColumn />
        </div>
      </body>

    </html>
  );
}
