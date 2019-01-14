import Api from '@/services/Api'

export default {
  newPaper (paperwork) {
    return Api().post('paperwork', paperwork)
  }
}
