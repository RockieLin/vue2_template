<template>
  <div>
    <b-modal
      id="modal_alert"
      ref="modal_alert"
      modal-class="modal_style model_alert"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      :hide-header="true"
      :hide-footer="true"
      dialog-class="modal-dialog-centered"
      content-class="border-0 rounded-0"
    >
      <div class="border_title clearfix">
        <div class="d-flex justify-content-between">
          <h4 class="mb-0">
            <b>{{ titleLabel }}</b>
          </h4>
          <a href="#" class="btn_close d-flex" @click="submit">
            <i class="icon-clearclose" />
          </a>
        </div>
      </div>
      <div class="form-group mb-40">
        <div class="tips_info d-flex justify-content-center">
          <span class="media">
            <i class="icon-error_outline" />
            <p id="modal_alert_msg" class="media-body mb-0">
              {{ message }}
            </p>
          </span>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <button
          type="button"
          class="btn btn_primary rounded-0 btn_width"
          @click="submit"
        >
          {{ submitLabel }}
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'Notice',
  computed: {
    message() {
      if (!this.$store.getters.noticeMessage) {
        return null
      }

      return this.$te(this.$store.getters.noticeMessage.message) ? this.$t(this.$store.getters.noticeMessage.message) : this.$store.getters.noticeMessage.message
    },
    submitLabel() {
      return this.$te('Bao.submit') ? this.$t('Bao.submit') : 'OK'
    },
    titleLabel() {
      return this.$te('Bao.notice') ? this.$t('Bao.notice') : 'Notice'
    }
  },
  watch: {
    message(newVal, oldVal) {
      console.log(newVal)
      if (newVal != null) {
        this.showModal()
      }
    }
  },
  mounted() {
    this.showModal()
  },
  methods: {
    showModal() {
      if (this.message) {
        this.$bvModal.show('modal_alert')
      }
    },
    hideModal() {
      this.$bvModal.hide('modal_alert')
      this.$store.commit('SET_NOTICE_MESSAGE', null)
    },
    submit() {
      const func = this.$store.getters.noticeMessage.func
      this.hideModal()
      if (func !== undefined && typeof func === 'function') {
        func()
      }
    }
  }
}
</script>
