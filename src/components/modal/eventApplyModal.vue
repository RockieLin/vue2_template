<template>
  <div>
    <b-modal
      id="modal_event_apply"
      ref="modal_event_apply"
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
            <b>{{ $t("Bao.event_apply") }}</b>
          </h4>
          <a class="btn_close d-flex" @click="$bvModal.hide('modal_event_apply')"><i class="icon-clearclose" /></a>
        </div>
      </div>
      <div class="form-group">
        <div class="form-group">
          <div class="tips_info d-flex">
            <span class="media">
              <p v-if="requestMsg" class="media-body mb-0">
                {{ requestMsg }}
              </p>
              <p v-else class="media-body mb-0">
                {{ $t("Bao.apply_for_this_discount_review_you_will_be_frozen_in_advance") }}
                <b class="notice">{{ needPerformance }}</b>
                {{ $t("Bao.the_flowing_water") }}
                <br>
                {{ $t("Bao.if_the_audit_fails_it_will_be_returned_in_full") }}
              </p>
            </span>
          </div>
        </div>
      </div>
      <br>
      <div class="d-flex justify-content-center">
        <button type="button" class="btn btn_black rounded-0 btn_width mr-10" @click="$bvModal.hide('modal_event_apply')">
          {{ $t('Bao.cancel') }}
        </button>
        <button type="submit" class="btn btn_primary rounded-0 btn_width" @click="confirm">
          {{ $t("Bao.submit") }}
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { eventRequest } from '@/api/event'
import { showNotice, setErrorMessage, heartbeatLive } from '@/utils/tool'

export default {
  props: {
    'prizeId': {
      type: Number,
      default: 0
    },
    'needPerformance': {
      type: Number,
      default: 0
    },
    'requestMsg': {
      type: String,
      default: null
    }
  },
  methods: {
    confirm() {
      var self = this
      eventRequest(this.prizeId
      ).then(function(res) {
        heartbeatLive()

        showNotice(res.data.msg)
        self.$emit('apply_success')
      }).catch(function(reason) {
        setErrorMessage(reason.response, self.errors)
      }).finally(function() {
        self.$bvModal.hide('modal_event_apply')
      })
    }
  }
}
</script>

<style>
  .modal .tips_info p, .modal .tips_info i  {
    line-height: 30px;
  }
</style>
