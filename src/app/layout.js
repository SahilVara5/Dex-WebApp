// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Navbar from "../components/Navbar/Navbar";
// import { WalletConnectionProvider } from "@/blockchain/solana/wallet";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "Foxel | Trade and Swap Cryto and NFTs safely on the Top DeFi platform",
//   description: "Swap or provide liquidity on the Foxel Protocol",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable}`}>
//         <WalletConnectionProvider>
//           <Navbar />
//           <main>
//             {children}
//           </main>
//         </WalletConnectionProvider>
//       </body>
//     </html>
//   );
// }


import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar/Navbar";
import { WalletConnectionProvider } from "@/blockchain/solana/wallet";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Foxel | Trade and Swap Cryto and NFTs safely on the Top DeFi platform",
  description: "Swap or provide liquidity on the Foxel Protocol",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <WalletConnectionProvider>
          <Navbar />
          <main>
            {children}
          </main>
        </WalletConnectionProvider>
      </body>
    </html>
  );
}