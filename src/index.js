import './styles.scss';
import 'bootstrap/dist/js/bootstrap.bundle';

import { urlSchema, watchUrl } from './watchers'

const form = document.querySelector('form');

const valueObject = {
    value: null,
    isError: false
}

const watchedValueObject = watchUrl(valueObject)

form.addEventListener("submit", (event) => {
    const data = new FormData(event.target)

    event.preventDefault()

    urlSchema.validate(data.get('url'))
        .then((val) => {
            watchedValueObject.isError = false
            watchedValueObject.value = val
        })
        .catch((e) => {
            watchedValueObject.isError = true
        })
})