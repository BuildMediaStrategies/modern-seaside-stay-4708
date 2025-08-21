import React, { createContext, useContext } from "react";

type LanguageContextValue = {
  lang: "en";
  setLang: (l: "en") => void; // no-op
  t: (key: string) => string; // identity passthrough
};

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value: LanguageContextValue = { lang: "en", setLang: () => {}, t: (k) => k };
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
export default LanguageContext;