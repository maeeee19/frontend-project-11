import onChange from 'on-change';
import {
  showFeeds,
  showPosts,
  showModal,
  showError,
  showSuccess,
  clearForm,
  clearFeedback,
  getElements,
} from './view.js';
import {
  addFeed, getPostById, getState,
} from './model.js';

const init = () => {
  const elements = getElements();
  const state = getState();

  const watchedState = onChange(state, (path, value) => {
    console.log('State changed:', path, value);

    if (path === 'feeds') {
      showFeeds(watchedState.feeds);
    }

    if (path === 'posts') {
      showPosts(watchedState.posts);
    }

    if (path === 'error') {
      if (value) {
        showError(value);
      } else {
        clearFeedback();
      }
    }

    if (path === 'success') {
      if (value) {
        showSuccess(value);
        clearForm();
      }
    }
  });

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    console.log('Adding feed:', url);
    addFeed(url, watchedState);
  });

  elements.postsContainer.addEventListener('click', (e) => {
    const button = e.target.closest('button');

    if (button) {
      const postId = button.dataset.id;
      const post = getPostById(postId, watchedState);

      showModal(post);
    }
  });
};

export default init;
