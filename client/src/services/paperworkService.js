import Api from '@/services/Api'

export default {
  newPaper (paperwork, token) {
    return Api().post('paperwork/' + token, paperwork)
  },
  newDrop (drop, token) {
    return Api().post('cashdrop/' + token, drop)
  }
}
