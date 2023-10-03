import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";

import Footer from "../../components/ui/Footer";
import Navbar from "../../components/ui/Navbar";
import Wrapper from "../../components/ui/Wrapper";
import getDictionary from "../../utils/dictionary.util";

const inter = Inter({ subsets: ["latin"] });

interface IRootLayout {
  children: React.ReactNode;
  params: { lang: string };
}

export const generateMetadata = async ({
  params,
}: Omit<IRootLayout, "children">) => {
  const dictionary = await getDictionary(params.lang);
  return {
    title: {
      template: `%s | ${dictionary.meta.website}`,
      default: dictionary.meta.website,
    },
    description: dictionary.meta.description,
    openGraph: {
      title: dictionary.meta.website,
      description: dictionary.meta.description,
      url: process.env.NEXT_PUBLIC_SITE_URL,
      sitename: dictionary.meta.website,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/opengraph-image.png`,
          width: 1200,
          height: 628,
        },
      ],
      locale: params.lang,
      type: "website",
    },
    alternates: {
      canonical: process.env.NEXT_PUBLIC_SITE_URL,
      languages: {
        en: `${process.env.NEXT_PUBLIC_SITE_URL}/en`,
        fr: `${process.env.NEXT_PUBLIC_SITE_URL}/fr`,
      },
    },
  };
};

export default function RootLayout({ children, params }: IRootLayout) {
  return (
    <html lang={params.lang}>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-SPNLPSZY9R"
      ></Script>
      <Script id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-SPNLPSZY9R');`}
      </Script>

      <body className={inter.className}>
        <Navbar lang={params.lang} />

        <div className="py-10">
          <Wrapper>{children}</Wrapper>
        </div>

        <Footer lang={params.lang} />
      </body>
    </html>
  );
}
