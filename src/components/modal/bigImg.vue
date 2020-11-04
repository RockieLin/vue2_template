<template>
  <div>
    <b-modal
      id="modal_bigimg"
      ref="modal_bigimg"
      modal-class="modal_style model_alert"
      :no-close-on-backdrop="true"
      :no-close-on-esc="false"
      :hide-header="false"
      :hide-footer="true"
      dialog-class="modal-dialog modal-lg"
      content-class="border-0 rounded-0"
    >
      <div class="">
        <img v-if="imgUrl !== ''" :src="imgUrl" width="100%">
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    'imgUrl': {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.modal-content {
 min-height: 100%;
 height: auto;
 border-radius: 0;
 background: transparent;
}
</style>
