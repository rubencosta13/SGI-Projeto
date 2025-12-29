import type { Metadata } from "next";
import "./globals.css";
import Banner from "@/src/components/banner";
import NovidadesModaMulher from "@/src/components/banner/novidades-moda-mulher";
import OfertaCasaBannerContent from "@/src/components/banner/oferta-casa";
import ObterApp from "@/src/components/banner/download-app";
import Header from "@/src/components/header/header";
import Footer from "@/src/components/footer";

export const metadata: Metadata = {
  title: "La Redoute | Grandes descontos em Moda & Casa",
  description: "La Redoute | Grandes descontos em Moda & Casa ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className="min-h-screen">
        <div className="flex flex-col min-h-screen">
          <div className="flex lg:flex-row flex-col lg:justify-end gap-4 shadow-sm border-gray-200 border-b w-full">
            <div className="flex-1">
              <Banner>
                <NovidadesModaMulher />
              </Banner>
            </div>
            <div className="hidden lg:flex px-8 shrink-0">
              <ObterApp />
            </div>
          </div>

          <Header />

          <Banner>
            <OfertaCasaBannerContent />
          </Banner>

          <main className="flex-1">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
