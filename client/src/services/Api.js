import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'https://keeptrack.eastus.cloudapp.azure.com:8081'
  })
}
