import onChange from 'on-change'
import {
  showFeeds,
  showPosts,
  showModal,
  showError,
  showSuccess,
  clearForm,
  clearFeedback,
  getElements,
} from './view.js'
import {
  addFeed, getPostById, getState,
} from './model.js'

const init = () => {
  const elements = getElements()
  const state = getState()

  const watchedState = onChange(state, (path, value) => {
    if (path === 'feeds') {
      showFeeds(watchedState.feeds)
    }

    if (path === 'posts') {
      showPosts(watchedState.posts)
    }

    if (path === 'error') {
      if (value) {
        showError(value)
      } else {
        clearFeedback()
      }
    }

    if (path === 'success') {
      if (value) {
        showSuccess(value)
        clearForm()
      }
    }
  })

  elements.form.addEventListener('submit', e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const url = formData.get('url')
    addFeed(url, watchedState)
  })

  elements.postsContainer.addEventListener('click', e => {
    const button = e.target.closest('button')
    const link = e.target.closest('a')

    if (link) {
      link.classList.remove('fw-bold')
      link.classList.add('fw-normal', 'link-secondary')

      const postId = link.dataset.id
      const post = getPostById(postId, watchedState)

      post.isRead = true
    }

    if (button) {
      const postId = button.dataset.id
      const post = getPostById(postId, watchedState)

      const postLink = button.previousElementSibling
      postLink.classList.remove('fw-bold')
      postLink.classList.add('fw-normal', 'link-secondary')
      post.isRead = true

      showModal(post)
    }
  })
}

export default init
