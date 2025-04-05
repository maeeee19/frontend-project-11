import { watchState } from "./view"

const state = {
    urls: [],
    feeds: [],
    inputError: null
}

export const watchedState = watchState(state)