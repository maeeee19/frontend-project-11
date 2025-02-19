import './styles.scss';
import 'bootstrap/dist/js/bootstrap.bundle';

import { urlSchema } from './watchers'

const form = document.querySelector('form');

form.addEventListener("submit", (event) => {
    const data = new FormData(form)
    event.preventDefault()
    console.log(data)
    urlSchema.validate(event.target.value)
        .then((val) => {
            console.log(val)
        })
        .catch((e) => {
            console.log('net')
            console.log(e)
        })
})