import i18next from 'i18next'
import parseRSS from './parser.js'
import validateUrl from './validation.js'
import fetchFeed from './api.js'

const state = {
  feeds: [],
  posts: [],
  error: null,
  success: null,
  urls: [],
}

const updateFeedPeriodically = async (feed, watchedState) => {
  try {
    const response = await fetchFeed(feed.url)
    const data = parseRSS(response.data.contents)

    const existingPosts = watchedState.posts.filter(post => post.feedId === feed.id)
    const existingLinks = new Set(existingPosts.map(post => post.link))

    const newPosts = data.items
      .filter(item => !existingLinks.has(item.link))
      .map((item, index) => ({
        id: `${feed.id}-${existingPosts.length + index}`,
        feedId: feed.id,
        title: item.title,
        description: item.description,
        link: item.link,
        isRead: false,
      }))

    if (newPosts.length > 0) {
      Object.assign(watchedState, {
        posts: [...newPosts, ...watchedState.posts],
      })
    }
  } finally {
    setTimeout(() => updateFeedPeriodically(feed, watchedState), 5000)
  }
}

const addFeed = async (url, watchedState) => {
  const { isValid } = validateUrl(url)

  if (!isValid) {
    Object.assign(watchedState, {
      error: i18next.t('URL_ERROR'),
    })

    return
  }

  if (watchedState.urls.includes(url)) {
    Object.assign(watchedState, {
      error: i18next.t('URL_EXIST'),
    })

    return
  }

  try {
    const response = await fetchFeed(url)
    const data = parseRSS(response.data.contents)

    const feed = {
      id: watchedState.feeds.length + 1,
      title: data.title,
      description: data.description,
      url: new URL(url).toString(),
    }

    const posts = data.items.map((item, index) => ({
      id: `${feed.id}-${index}`,
      feedId: feed.id,
      title: item.title,
      description: item.description,
      link: new URL(item.link).toString(),
      isRead: false,
    }))

    Object.assign(watchedState, {
      feeds: [...watchedState.feeds, feed],
      posts: [...watchedState.posts, ...posts],
      success: 'RSS успешно загружен',
      error: null,
      urls: [...watchedState.urls, url],
    })

    setTimeout(() => updateFeedPeriodically(feed, watchedState), 5000)
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      Object.assign(watchedState, {
        error: i18next.t('NETWORK_ERROR'),
        success: null,
      })
    } else {
      Object.assign(watchedState, {
        error: error.message,
        success: null,
      })
    }
  }
}

const getPostById = (id, watchedState) => watchedState.posts.find(post => post.id === id)

const getState = () => state

export {
  addFeed,
  getPostById,
  getState,
  updateFeedPeriodically,
}
