import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://13.82.212.98:8081'
  })
}
