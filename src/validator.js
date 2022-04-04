/** Use only with Antd Form */
/** Currently validator will no longer working if using regex from outside 'validator' object */
import utils from './utils'
import moment from 'moment'

const validator = {

  validateCurrencyFormat: (rule, value, callback) => {
    const regex = /^[a-zA-Z]{3}/g
    if (value === '') {
      callback(`Should entered a value`)
    } else if (!regex.test(value)) {
      callback(`Incorrect currency format. E.g: 'USD', 'EUR'`)
    }
  },

  validateInputString: (rule, value, callback) => {
    const regex = /[!@#$%^*?"{}|<>]/g
    if (value && value.trim() === '') {
      callback(`Please do not leave this field blank.`)
    } else if (regex.test(value)) {
      callback(`Please do not enter special characters: ! @ # $ % ^ * ? " { } | < >`)
    } else {
      callback()
    }
  },

  validateWebsite: (rule, value, callback) => {
    const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm
    if (value && !regex.test(value)) {
      callback('Incorrect website format!')
    } else {
      callback()
    }
  },

  validateEmail: (rule, value, callback) => {
    const regex = /^[A-Za-z][A-Za-z0-9-_\.]{1,32}(\+?[0-9]){0,5}@[A-Za-z0-9_-]{2,}(\.[A-Za-z0-9]{2,4}){1,2}$/gm
    if (value && !regex.test(value)) {
      callback('Incorrect email format!')
    } else {
      callback()
    }
  },

  validateIntegerNumber: (rule, value, callback) => {
    if (value && !Number.isInteger(value)) {
      callback('Not an integer number')
    } else if (value && value < 0) {
      callback('Negative number not allowed')
    } else {
      callback()
    }
  },

  validateNumberFormat: (rule, value, callback) => {
    const regex = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/g
    if (value && value.trim() === '') {
      callback('Do not leave this field blank')
    } else if (isNaN(value) && value !== '' && value !== undefined) {
      callback(`Not a number`)
    } else if (value !== '' && value !== undefined && regex.test(value) === false) {
      callback(`Incorrect number format. Remove 0 from start, space or special characters`)
    } else if (value < 0) {
      callback(`Should be greater than 0`)
    } else {
      callback()
    }
  },

  validateUsernameFormat: (rule, value, callback) => {
    const regex = /^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/g
    if (value && !regex.test(value)) {
      callback('Incorrect username format!')
    } else {
      callback()
    }
  },

  validateVietnameseIdNumber: (rule, value, callback) => {
    const regex = /[0-9]{9,}/g
    if (value && !regex.test(value)) {
      callback('Số CMND không hợp lệ')
    } else {
      callback()
    }
  },

  validatePhoneNumber: (rule, value, callback) => {
    // const regex = /((01|09|03|07|08|05|\+84|84)+([0-9]{8}))/g
    const regex = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/
    if (value && !regex.test(value)) {
      callback('Incorrect phone number format!')
    } else {
      callback()
    }
  },

  validateSameOrBeforeDate: (rule, value, callback) => {
    if (utils.isNullish(value)) {
      callback()
      return
    }
    const currentDate = moment().format('YYYY-MM-DD')
    const compareDate = moment(value).format('YYYY-MM-DD')
    const check = moment(compareDate).isSameOrBefore(currentDate)
    if (!check) {
      callback('Should select the moment equal or before current moment!')
    } else {
      callback()
    }
  },

  validateSameOrAfterDate: (rule, value, callback) => {
    if (utils.isNullish(value)) {
      callback()
      return
    }
    const currentDate = moment().format('YYYY-MM-DD')
    const compareDate = moment(value).format('YYYY-MM-DD')
    const check = moment(compareDate).isSameOrAfter(currentDate)
    if (!check) {
      callback('Should select the moment equal or after current moment!')
    } else {
      callback()
    }
  },

}

export default validator
