import axios from 'axios'

const request = axios.create({})

request.interceptors.response.use(
  res => {
    return res
  },
  error => {
    return Promise.reject(error)
  }
)

export default request
