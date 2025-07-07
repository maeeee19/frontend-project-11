import i18next from 'i18next';

const initI18n = () => {
  i18next.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru: {
        translation: {
          URL_ERROR: 'Ссылка должна быть валидным URL',
          URL_EXIST: 'RSS уже существует',
          NETWORK_ERROR: 'Ошибка сети',
        },
      },
    },
  });
};

export default initI18n;
