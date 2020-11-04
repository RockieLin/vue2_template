<template>
  <div>
    <b-modal
      id="modal_terms"
      ref="modal_terms"
      modal-class="modal_style model_alert"
      size="lg"
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
            <b>{{ $t("Bao.membership_terms") }}</b>
          </h4>
          <a class="btn_close d-flex" @click="$bvModal.hide('modal_terms')"><i class="icon-clearclose" /></a>
        </div>
      </div>
      <div class="form-group mb-40">
        <div class="tips_info d-flex">
          <span class="media">
            <p id="modal_alert_msg" class="nl2br media-body mb-0">{{ $store.getters.brand.permission.terms_message }}</p>
          </span>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <button
          type="button"
          class="btn btn_primary rounded-0 btn_width"
          @click="submit"
        >
          {{ $t('Bao.submit') }}
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  methods: {
    submit() {
      this.$store.getters.brand.readTerms = true
      this.$bvModal.hide('modal_terms')
    }
  }
}
</script>
