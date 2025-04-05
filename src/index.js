import './styles.scss';
import 'bootstrap/dist/js/bootstrap.bundle.js';

import { string } from 'yup';
import i18next from 'i18next';
import axios from 'axios';

import watchedState from './model.js';

const ORIGINS_URL = 'https://allorigins.hexlet.app/get';

const parser = new DOMParser();

const form = document.querySelector('form');

i18next.init({
  lng: 'ru',
  debug: true,
  resources: {
    ru: {
      translation: {
        URL_ERROR: 'Ссылка должна быть валидным URL',
        URL_EXIST: 'RSS уже существует',
      },
    },
  },
});

const requestOrigins = (soursePath) => axios.get(`${ORIGINS_URL}?url=${soursePath}`)
  .then(({ data }) => {
    const doc = parser.parseFromString(data.contents, 'application/xml');

    const posts = Array.from(doc.querySelectorAll('item')).map((item) => ({
      title: item.querySelector('title').textContent,
      link: item.querySelector('link').textContent,
      id: item.querySelector('guid').textContent,
    }));

    const foundIndexFeed = watchedState.feeds.findIndex((item) => item.link === soursePath);

    if (foundIndexFeed !== -1) {
      watchedState.feeds[foundIndexFeed].posts = posts;
    } else {
      watchedState.feeds.push({
        title: doc.querySelector('title').textContent,
        description: doc.querySelector('description').textContent,
        link: doc.querySelector('link').textContent,
        posts,
      });
    }

    setTimeout(() => requestOrigins(soursePath), 5000);
  })
  .catch((e) => console.log(e));

const urlSchema = string().required().url(i18next.t('URL_ERROR')).test(
  'include',
  i18next.t('URL_EXIST'),
  (value) => !watchedState.urls.includes(value),
);

form.addEventListener('submit', (event) => {
  const data = new FormData(event.target);

  event.preventDefault();

  urlSchema.validate(data.get('url'))
    .then((newUrl) => {
      watchedState.urls.push(newUrl);
      requestOrigins(newUrl);
    })
    .catch((e) => {
      watchedState.inputError = e.message;
    });
});

const modal = document.getElementById('modal');

modal.addEventListener('show.bs.modal', (event) => {
  const button = event.relatedTarget;
  const title = button.getAttribute('data-bs-title');
  const link = button.getAttribute('data-bs-link');
  const id = button.getAttribute('data-bs-id');

  const modalTitle = modal.querySelector('.modal-title');
  const modalLink = modal.querySelector('.full-article');

  const linkElement = button.parentElement.querySelector(`a[data-id="${id}"]`);

  linkElement.classList.remove('fw-bold');
  linkElement.classList.add('fw-normal');

  modalTitle.textContent = title;
  modalLink.href = link;
});
