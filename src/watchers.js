import { string } from "yup";
import onChange from 'on-change';

export const urlSchema = string().required().url()

const inputRef = document.querySelector('#url-input')
const errorElement = document.querySelector('.feedback')
const textError = document.createTextNode('Ссылка должна быть валидным URL')

export const watchUrl = (object) => onChange(object, (path, value, previousValue) => {
    if (path === 'value') {
        console.log(value)
    }

    if (path === 'isError') {
        if (value === true) {
            inputRef.classList.add('is-invalid')
            errorElement.appendChild(textError);
        }
        if (value === false) {
            inputRef.classList.remove('is-invalid')
            errorElement.removeChild(textError);
        }
    }
});