const state = {
  noticeMessage: null,
  errorMessage: null,
  loadCompleted: false,
  isLoading: true,
  confirmDialog: {
    message: null,
    func: null
  },
  alert: {
    type: null,
    seconds: null,
    message: null
  }
}

const mutations = {
  SET_LOAD_COMPLETED(state, data) {
    state.loadCompleted = data
  },
  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading
  },
  SET_NOTICE_MESSAGE(state, message) {
    state.noticeMessage = message
  },
  SET_ERROR_MESSAGE(state, message) {
    state.errorMessage = message
  },
  SET_CONFIRM_DIALOG(state, confirm) {
    state.confirmDialog = confirm
  },
  SET_ALERT(state, alert) {
    state.alert = alert
  }
}

const actions = {}

export default {
  state,
  mutations,
  actions
}
