import axios from 'axios'

const fetchFeed = (url) => {
  const proxyUrl = new URL('https://allorigins.hexlet.app/get')
  proxyUrl.searchParams.set('url', url)
  proxyUrl.searchParams.set('disableCache', 'true')

  return axios.get(proxyUrl.toString())
}

export default fetchFeed
