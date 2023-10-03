"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ILangSwitcher {
  lang: string;
}

const LangSwitcher = ({ lang }: ILangSwitcher) => {
  const path = usePathname();
  const targetLang = lang === "en" ? "fr" : "en";

  const setNewPathname = () => {
    if (!lang) return "/";

    const subPath = path.split("/");

    subPath[1] = targetLang;
    if (subPath[2] && subPath[2] !== "post" && lang === "fr")
      subPath[2] === "visite"
        ? (subPath[2] = "tour")
        : (subPath[2] = "experience");
    else if (subPath[2] && subPath[2] !== "post" && lang === "en")
      subPath[2] === "tour"
        ? (subPath[2] = "visite")
        : (subPath[2] = "expérience");

    return subPath.join("/");
  };

  return (
    <Link
      href={setNewPathname()}
      locale={targetLang}
      className="font-bold text-pink-crayola"
    >
      {lang.toUpperCase()}
    </Link>
  );
};

export default LangSwitcher;
