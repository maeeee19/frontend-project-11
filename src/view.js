import { Modal } from 'bootstrap'

const elements = {
  form: document.querySelector('.rss-form'),
  input: document.querySelector('#url-input'),
  feedback: document.querySelector('.feedback'),
  feedsContainer: document.querySelector('.feeds'),
  postsContainer: document.querySelector('.posts'),
  modal: new Modal(document.getElementById('modal')),
  modalTitle: document.querySelector('.modal-title'),
  modalBody: document.querySelector('.modal-body'),
  fullArticleLink: document.querySelector('.full-article'),
}

const createElement = (tag, className, textContent, attributes = {}) => {
  const element = document.createElement(tag)
  if (className) element.className = className
  if (textContent) element.textContent = textContent

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })

  return element
}

export const showFeeds = feeds => {
  const feedsList = elements.feedsContainer.querySelector('ul')

  if (feeds.length > 0) {
    elements.feedsContainer.style.display = 'block'

    feedsList.innerHTML = ''

    feeds.forEach(feed => {
      const li = createElement('li', 'list-group-item border-0 border-end-0')
      const h3 = createElement('h3', 'h6 m-0', feed.title)
      const p = createElement('p', 'm-0 small text-black-50', feed.description)

      li.appendChild(h3)
      li.appendChild(p)
      feedsList.appendChild(li)
    })
  } else {
    elements.feedsContainer.style.display = 'none'
    feedsList.innerHTML = ''
  }
}

export const showPosts = posts => {
  const postsList = elements.postsContainer.querySelector('ul')
  if (posts.length > 0) {
    elements.postsContainer.style.display = 'block'

    postsList.innerHTML = ''

    posts.forEach(post => {
      const li = createElement('li', 'list-group-item d-flex justify-content-between align-items-start border-0 border-end-0')

      const a = createElement('a', post.isRead ? 'fw-normal link-secondary' : 'fw-bold', post.title, {
        'href': post.link,
        'data-id': post.id,
        'target': '_blank',
        'rel': 'noopener noreferrer',
      })

      const button = createElement('button', 'btn btn-outline-primary btn-sm', 'Просмотр', {
        'type': 'button',
        'data-id': post.id,
        'data-bs-toggle': 'modal',
        'data-bs-target': '#modal',
      })

      li.appendChild(a)
      li.appendChild(button)
      postsList.appendChild(li)
    })
  } else {
    elements.postsContainer.style.display = 'none'
    postsList.innerHTML = ''
  }
}

export const showModal = post => {
  elements.modalTitle.textContent = post.title
  elements.modalBody.textContent = post.description
  elements.fullArticleLink.href = post.link

  elements.modal.show()
}

export const showError = message => {
  elements.feedback.textContent = message
  elements.feedback.classList.add('text-danger')
  elements.feedback.classList.remove('text-success')
  elements.input.classList.add('is-invalid')
}

export const showSuccess = message => {
  elements.feedback.textContent = message
  elements.feedback.classList.add('text-success')
  elements.feedback.classList.remove('text-danger')
  elements.input.classList.remove('is-invalid')
}

export const clearForm = () => {
  elements.form.reset()
  elements.input.focus()
}

export const clearFeedback = () => {
  elements.feedback.textContent = ''
}

export const getElements = () => elements
