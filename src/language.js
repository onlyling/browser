/**
 * 获取语言
 * @param {Navigator} nav Navigator
 */
export const getLanguage = (nav) => {
  const language = nav.browserLanguage || nav.language;
  const languages = language.split('-');
  if (languages[1]) {
    languages[1] = languages[1].toUpperCase();
  }
  return languages.join('_');
};
