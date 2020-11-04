<template>
  <div>
    <b-modal
      id="modal_confirm"
      ref="modal_confirm"
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
          <a href="#" class="btn_close d-flex" @click="hideModal">
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
        <button type="button" class="btn btn_black rounded-0 btn_width mr-10" @click="hideModal">
          {{ $t('Bao.cancel') }}
        </button>
        <button type="submit" class="btn btn_primary rounded-0 btn_width" @click="confirm">
          {{ submitLabel }}
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'Confirm',
  computed: {
    message() {
      if (!this.$store.getters.confirmDialog) {
        return ''
      }
      return this.$te(this.$store.getters.confirmDialog.message) ? this.$t(this.$store.getters.confirmDialog.message) : this.$store.getters.confirmDialog.message
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
        this.$bvModal.show('modal_confirm')
      }
    },
    hideModal() {
      this.$bvModal.hide('modal_confirm')
      this.$store.commit('SET_CONFIRM_DIALOG', null)
    },
    confirm() {
      this.$bvModal.hide('modal_confirm')
      const dialog = this.$store.getters.confirmDialog
      try {
        if (dialog.func && typeof dialog.func === 'function') {
          dialog.func()
        }
      } catch (e) {
        console.log('call function error')
      } finally {
        this.$store.commit('SET_CONFIRM_DIALOG', null)
      }
    }
  }
}
</script>
