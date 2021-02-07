/**
 * 获取语言
 * @param nav Navigator
 */
export const getLanguage = (nav: Navigator) => {
  // @ts-ignore
  const language = nav.browserLanguage || nav.language || '';
  const languages: string[] = language.split('-');

  if (languages[1]) {
    languages[1] = languages[1].toUpperCase();
  }

  return languages.join('_');
};
