<template>
  <div>
    <b-modal
      id="modal_guarantee"
      ref="modal_guarantee"
      modal-class="modal_style model_alert"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      :hide-header="true"
      :hide-footer="true"
      dialog-class="modal-dialog-centered"
      content-class="border-0 rounded-0"
    >
      <div class="form-group">
        <div class="border_title clearfix">
          <div class="d-flex justify-content-between">
            <h4 class="mb-0">
              <b>{{ memberInfo.promotion_code }} {{ $t("Bao.set_the_rebate_guarantee_ratio") }}</b>
            </h4>
            <a class="btn_close d-flex" @click="$bvModal.hide('modal_guarantee')"><i class="icon-clearclose" /></a>
          </div>
        </div>
        <div v-if="guaranteeInfo !== null" class="modal_commission">
          <div class="row">
            <div v-for="(item, key) in guaranteeInfo" :key="key" class="col-md-6">
              <div class="form-group">
                <label><b>{{ item.game_type_info.name }}</b></label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text rounded-0">
                      {{ $t("Bao.year_return") }}
                    </div>
                  </div>
                  <input v-if="item.can_setting===1" v-model="item.value" v-validate="'numeric'" :data-vv-as="item.game_type_info.name" :name="'game_type_' + item.game_type_info.id" type="text" class="form-control rounded-0" :placeholder="$t('Bao.please_leave_blank_if_not_set')">
                  <input v-else type="text" class="form-control rounded-0" :placeholder="$t('Bao.can_not_setting')" disabled="">
                </div>
                <small v-if="errors.has('game_type_' + item.game_type_info.id)" class="form-text mt-5">{{ errors.first('game_type_' + item.game_type_info.id) }}</small>
                <small>{{ item.hint }}</small>
              </div>
            </div>
          </div>
        </div>
        <div class="tips_info d-flex justify-content-start">
          <span class="media">
            <!--eslint-disable-next-line-->
            <p class="media-body mb-0" v-html="$t('Bao.bonus_guarantee_info')" />
          </span>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <button type="button" class="flex-grow-1 flex-md-grow-0 btn btn_black rounded-0 btn_width mr-15" @click="$bvModal.hide('modal_guarantee')">
          {{ $t("Bao.cancel") }}
        </button>
        <button type="button" class="flex-grow-1 flex-md-grow-0 btn btn_primary rounded-0 btn_width" @click="set">
          {{ $t("Bao.submit") }}
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { setGuarantee } from '@/api/bonus'
import { showNotice, setErrorMessage } from '@/utils/tool'
import i18n from '@/i18n'

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
    },
    'guaranteeInfo': {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      amount: '',
      errorShow: false
    }
  },
  methods: {
    set() {
      const obj = {
        member_code: this.memberInfo.promotion_code
      }
      for (const i in this.guaranteeInfo) {
        if (this.guaranteeInfo[i].can_setting === 1) {
          const key = 'game_type_' + this.guaranteeInfo[i].game_type_info.id
          if (this.guaranteeInfo[i].value !== null) {
            obj[key] = this.guaranteeInfo[i].value
          }
        }
      }
      var self = this
      this.$validator.validateAll().then(valid => {
        if (valid) {
          setGuarantee(obj).then(function(res) {
            self.$bvModal.hide('modal_guarantee')
            showNotice(obj.member_code + ' ' + i18n.t('Bao.setting_finish'))
          }).catch(function(reason) {
            setErrorMessage(reason.response, self.errors)
          })
        }
      })
    }
  }
}
</script>
