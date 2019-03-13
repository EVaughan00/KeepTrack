import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'https://13.82.212.98:8081'
  })
}
