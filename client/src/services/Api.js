import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://10.0.0.26:8081'
  })
}
