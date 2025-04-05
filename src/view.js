import onChange from 'on-change';

const inputRef = document.getElementById("url-input")
const errorElement = document.querySelector('.feedback')
const form = document.querySelector('form');

export const watchState = (object) => onChange(object, (path, value, previousValue, applyData) => {
    if (path === 'inputError') {
        if (value === null) {
            inputRef.classList.remove('is-invalid')
            errorElement.innerHTML = ""
            form.reset()
        } else {
            inputRef.classList.add('is-invalid')
            errorElement.innerHTML = value;
        }
    }

    if (path === 'urls') {
        if (previousValue.length === 0) {
            feedsSection.innerHTML = feedsContainer
            postsSection.innerHTML = postsContainer
        }
    }

    if (path === 'feeds') {
        const foundIndexFeed = previousValue.findIndex((item) => item.link === applyData.args[0].link)

        if (foundIndexFeed === -1) {
            pushFeedDOM({
                title: applyData.args[0].title,
                description: applyData.args[0].description
            })

            applyData.args[0].posts.forEach((item) => pushPostDOM(item))
        } else {
            const newPosts = applyData.args[0].posts;
            const newPostsIds = newPosts.map((item) => item.id)
            const oldPostsIds = previousValue[foundIndexFeed].posts.map((item) => item.id)

            const filteredPostsIds = newPostsIds.filter((item) => !oldPostsIds.includes(item))
            const filteredPosts = filteredPostsIds.map((item) => newPosts.find((newPost) => newPost.id === item))

            filteredPosts.forEach((item) => {
                pushPostDOM(item)
            })
        }
    }
});

const pushFeedDOM = (feed) => {
    const feedsLists = document.querySelector('.feeds .list-group.border-0.rounded-0')
    const feedItem = document.createElement('li')
    feedItem.className = 'list-group-item border-0 border-end-0'

    feedItem.innerHTML = `
        <h3 class="h6 m-0">${feed.title}</h3>
        <p class="m-0 small text-black-50">${feed.description}</p>
    `

    feedsLists.appendChild(feedItem)
}

const pushPostDOM = (post) => {
    const postsLists = document.querySelector('.posts .list-group.border-0.rounded-0')
    const postItem = document.createElement('li')
    postItem.className = 'list-group-item d-flex justify-content-between align-items-start border-0 border-end-0'

    postItem.innerHTML = `
        <a class="fw-bold" href="${post.link}" data-id=${post.id} target="_blank" rel="noopener noreferrer">
            ${post.title}
        </a>
        <button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#modal" data-bs-id="${post.id}" data-bs-title="${post.title}" data-bs-link="${post.link}">Просмотр</button>
    `

    postsLists.appendChild(postItem)
}

const feedsSection = document.querySelector('.col-md-10.col-lg-4.mx-auto.order-0.order-lg-1.feeds')
const feedsContainer = `
    <div class="card border-0">
        <div class="card-body">
            <h2 class="card-title h4">Фиды</h2>
        </div>
        <ul class="list-group border-0 rounded-0"></ul>
    </div>`

const postsSection = document.querySelector('.col-md-10.col-lg-8.order-1.mx-auto.posts')
const postsContainer = `
    <div class="card border-0">
        <div class="card-body">
            <h2 class="card-title h4">Посты</h2>
        </div>
        <ul class="list-group border-0 rounded-0"></ul>
    </div>`
