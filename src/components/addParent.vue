<template>
  <div>
    <b-modal
      id="modal_parent"
      ref="modal_parent"
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
            <b>{{ $t("Bao.enter_the_promotion_code_to_become_offline") }}</b>
          </h4>
          <a href="#" class="btn_close d-flex" @click="hideModal">
            <i class="icon-clearclose" />
          </a>
        </div>
      </div>
      <div class="form-group mb-40">
        <input
          v-model="postForm.code"
          v-validate="'required'"
          class="form-control rounded-0"
          :placeholder="$t('Bao.please_input')+$t('Bao.code')"
          type="text"
          name="promotion_code"
          :data-vv-as="$t('Bao.code')"
        >
        <small v-if="errors.has('code')" class="form-text mt-5">{{ errors.first('code') }}</small>
      </div>
      <div class="d-flex justify-content-center">
        <button
          type="button"
          class="btn btn_primary rounded-0 btn_width"
          @click="handleSubmit"
        >
          {{ $t('Bao.submit') }}
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { addParent } from '@/api/user'
import { setErrorMessage, showNotice } from '@/utils/tool'

export default {
  name: 'AddParent',
  data() {
    const postForm = {
      code: null
    }

    return {
      postForm
    }
  },
  created() {
    if (this.$store.getters.inviteCode !== null) {
      this.postForm.code = this.$store.getters.inviteCode
    }
  },
  methods: {
    showModal() {
      this.$bvModal.show('modal_parent')
    },
    hideModal() {
      this.$bvModal.hide('modal_parent')
    },
    handleSubmit() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          addParent(this.postForm.code).then(response => {
            this.$store.commit('SET_MEMBER_INFO', response.data.data)

            showNotice(this.$t('Bao.finish_set_prom'))

            this.$emit('refresh')
          }).catch((error) => {
            setErrorMessage(error.response, this.errors)
          })
        }
      })
    }
  }
}
</script>
