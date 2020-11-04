const getters = {
  loadCompleted: state => state.app.loadCompleted,
  noticeMessage: state => state.app.noticeMessage,
  errorMessage: state => state.app.errorMessage,
  name: state => state.user.memberInfo ? state.user.memberInfo.promotion_code : 'Guest',
  user: state => state.user.memberInfo,
  language: state => state.user.language,
  token: state => state.user.token,
  isLoading: state => state.app.isLoading,
  confirmDialog: state => state.app.confirmDialog,
  alert: state => state.app.alert
}
export default getters
