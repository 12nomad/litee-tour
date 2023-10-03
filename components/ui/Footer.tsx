import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { Lobster } from "next/font/google";

import Wrapper from "../ui/Wrapper";
import getDictionary from "../../utils/dictionary.util";

const lobster = Lobster({ subsets: ["latin"], weight: ["400"] });

interface IFooter {
  lang: string;
}

const Footer = async ({ lang }: IFooter) => {
  const dictionary = await getDictionary(lang);

  return (
    <footer className="bg-white">
      <Wrapper>
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <span className="flex items-center">
              <span
                className={`${lobster.className} self-center text-xl font-semibold whitespace-nowrap`}
              >
                Litee Tour 🗺
              </span>
            </span>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-neutral-900 uppercase">
                {dictionary.footer.link1}.
              </h2>
              <ul className="text-neutral-500 font-medium">
                <li className="mb-4">
                  <span className="hover:underline">NextJS 13</span>
                </li>
                <li>
                  <span className="hover:underline">Tailwind CSS</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-neutral-900 uppercase ">
                {dictionary.footer.link2}.
              </h2>
              <ul className="text-neutral-500 font-medium">
                <li className="mb-4">
                  <span className="hover:underline ">Instagram</span>
                </li>
                <li>
                  <span className="hover:underline">Twitter</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-neutral-900 uppercase">
                {dictionary.footer.link3}.
              </h2>
              <ul className="text-neutral-500 font-medium">
                <li className="mb-4">
                  <span className="hover:underline">
                    {dictionary.footer.link3Text1}.
                  </span>
                </li>
                <li>
                  <span className="hover:underline">
                    {dictionary.footer.link3Text2}.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="mb-6 flex flex-col md:flex-row items-center justify-center md:justify-between">
          <span className="text-sm text-neutral-500 sm:text-center">
            © {new Date().getFullYear()}{" "}
            <span className="hover:underline">Litee Tour™</span>.{" "}
            {dictionary.footer.copyright}.
          </span>
          <div className="flex mt-4 text-neutral-500 space-x-5 sm:justify-center sm:mt-0">
            <BsInstagram />
            <BsTwitter />
            <BsFacebook />
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
