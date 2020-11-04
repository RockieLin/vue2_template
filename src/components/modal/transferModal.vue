<template>
  <div>
    <b-modal
      id="modal_transfer"
      ref="modal_transfer"
      modal-class="modal_style model_alert modal_transfer"
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
            <b>{{ $t("Bao.main_wallet_transfer") }}</b>
          </h4>
          <a class="btn_close d-flex" @click="$bvModal.hide('modal_transfer')"><i class="icon-clearclose" /></a>
        </div>
      </div>
      <div class="form-group">
        <!-- 转帐 start -->
        <div class="form-group">
          <div class="row d-flex align-items-center">
            <div class="col-5">
              <b>{{ $t("Bao.main_wallet_balance") }}</b>
            </div>
            <div class="col-7">
              <!-- eslint-disable-next-line -->
              <b v-html="$store.getters.gold"/>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row d-flex align-items-center">
            <div class="col-5">
              <b>{{ $t("Bao.set_transfer_amount") }}</b>
            </div>
            <div class="col-7">
              <input v-model="amount" class="form-control rounded-0" type="text" :placeholder="$t('Bao.please_input')+$t('Bao.transfer_amount')">
              <small v-if="errors.has('amount')" class="form-text mt-5">{{ errors.first('amount') }}</small>
            </div>
          </div>
        </div>
        <div class="form-group mb-40">
          <div class="row d-flex align-items-center">
            <div class="col-5">
              <b>{{ $t("Bao.transfer_to") }}</b>
            </div>
            <div class="col-7">
              <b>{{ memberInfo.nickname }}<br>{{ memberInfo.promotion_code }}</b>
            </div>
          </div>
        </div>
        <!-- 转帐 end -->
      </div>
      <div class="d-flex justify-content-center">
        <button type="button" class="flex-grow-1 flex-md-grow-0 btn btn_primary rounded-0 btn_width" data-dismiss="modal" @click="send">
          {{ $t("Bao.submit") }}
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { transfer } from '@/api/payment'
import { showNotice, setErrorMessage } from '@/utils/tool'

export default {
  props: {
    'memberInfo': {
      type: Object,
      default: () => {
        return {
          nickname: '',
          promotion_code: ''
        }
      }
    }
  },
  data() {
    return {
      amount: '',
      errorShow: false
    }
  },
  methods: {
    async send() {
      var self = this
      transfer({
        promotion_code: this.memberInfo.promotion_code,
        amount: this.amount
      }).then(function(res) {
        self.$store.commit('SET_GOLD', res.data.data)
        self.$bvModal.hide('modal_transfer')
        showNotice(self.$t('Bao.transfer_finish'))
      }).catch(function(reason) {
        setErrorMessage(reason.response, self.errors)
      })
    }
  }
}
</script>
