import * as yup from 'yup'

const schema = yup.string().url().required()

const validateUrl = (url) => {
  try {
    schema.validateSync(url)
    return { isValid: true, error: null }
  } catch (error) {
    return { isValid: false, error: error.message }
  }
}

export default validateUrl
