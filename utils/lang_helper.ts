// import en from '@/utils/i18n/locales/en.json';
// import vi from '@/utils/i18n/locales/vi.json';
// let messages = Object;
// messages['en'] = en;
// messages['vi'] = vi;
export const t = (label, useLocale = {defaultLocale: 'vi'}) => {
  return useLocale?.LocaleMessage?.[useLocale.defaultLocale]?.[label] ?? label
}