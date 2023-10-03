interface I18Config {
  readonly defaultLocale: string;
  readonly locales: string[];
}

export const i18n: I18Config = {
  defaultLocale: "fr",
  locales: ["en", "fr"],
};
