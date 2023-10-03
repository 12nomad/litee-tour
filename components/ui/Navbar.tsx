import Link from "next/link";
import { Lobster } from "next/font/google";

import Wrapper from "../ui/Wrapper";
import getDictionary from "../../utils/dictionary.util";
import LangSwitcher from "./LangSwitcher";

const lobster = Lobster({ subsets: ["latin"], weight: ["400"] });

interface INavbar {
  lang: string;
}

const Navbar = async ({ lang }: INavbar) => {
  const dictionary = await getDictionary(lang);

  return (
    <div className="sticky top-0 z-50 left-0 right-0 bg-white bg-opacity-50 border-b backdrop-blur-md">
      <Wrapper>
        <div className="flex items-center justify-between py-5">
          <Link
            href={`/${lang}`}
            className={`text-xl font-bold ${lobster.className}`}
          >
            Litee Tour 🗺
          </Link>
          <nav>
            <ul className="flex items-center gap-4 text-neutral-600">
              <li>
                <LangSwitcher lang={lang} />
              </li>
              <li>
                <Link
                  href={`/${lang}/${dictionary.navigation.links.tourSlug}`}
                  className="hover:underline"
                >
                  {dictionary.navigation.links.tour}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/${dictionary.navigation.links.exprerienceSlug}`}
                  className="hover:underline"
                >
                  {dictionary.navigation.links.experience}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Wrapper>
    </div>
  );
};

export default Navbar;
