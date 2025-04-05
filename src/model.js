import watchState from './view.js';

const state = {
  urls: [],
  feeds: [],
  inputError: null,
  inputSuccess: null
};

const watchedState = watchState(state);

export default watchedState;
