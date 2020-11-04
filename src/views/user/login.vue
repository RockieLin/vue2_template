<template>
  <div class="login_area clearfix">
    <div class="row d-flex justify-content-lg-end justify-content-md-center">
      <div class="col-xl-6 col-lg-7 col-md-9">
        <form class="login_inner">
          <div class="border_title clearfix">
            <div class="d-flex justify-content-between">
              <h4 class="mb-0">
                <b>{{ $t("Remote.login") }}</b>
              </h4>
            </div>
          </div>
          <hr class="mb-20">
          <div class="form-group clearfix">
            <div class="row justify-content-start align-items-center">
              <div class="col-lg-11">
                <dl class="row mb-0">
                  <dt class="col-4 d-flex justify-content-start justify-content-md-end align-items-center h-38 ui-label-mobile">
                    <i class="icon-asterisk" /><span>{{ $t("Remote.phone") }}</span>
                  </dt>
                  <dd class="col-8 mb-0 pl-0">
                    <vue-tel-input
                      v-model="postForm.username"
                      v-validate="'required'"
                      class="form-control rounded-0"
                      :placeholder="$t('Remote.please_input')+$t('Remote.phone')"
                      name="username"
                      :data-vv-as="$t('Remote.phone')"
                      :only-countries="['CN','TW']"
                      default-country="CN"
                      mode="international"
                      :required="true"
                    />
                    <small v-if="errors.has('username')" class="form-text mt-5">{{ errors.first('username') }}</small>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="form-group clearfix">
            <div class="row justify-content-start align-items-center">
              <div class="col-lg-11">
                <dl class="row mb-0">
                  <dt class="col-4 d-flex justify-content-start justify-content-md-end align-items-center h-38 ui-label-password">
                    <i class="icon-asterisk" /><span>{{ $t("Remote.password") }}</span>
                  </dt>
                  <dd class="col-8 mb-0 pl-0">
                    <input
                      v-model="postForm.password"
                      v-validate="'required'"
                      class="form-control rounded-0"
                      :placeholder="$t('Remote.please_input')+$t('Remote.password')"
                      type="password"
                      name="password"
                      :data-vv-as="$t('Remote.password')"
                    >
                    <small v-if="errors.has('password')" class="form-text mt-5">{{ errors.first('password') }}</small>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="form-group mb-0 clearfix">
            <div class="d-flex justify-content-center">
              <button
                type="button"
                class="flex-grow-1 flex-md-grow-0 btn btn_login btn_black rounded-0 btn_width"
                @click="handleUpdate"
              >
                {{ $t("Remote.login") }}
              </button>
            </div>
          </div>
          <div class="btn_goback d-flex justify-content-center align-items-end">
            <router-link class="txt_primary" to="/index">
              {{ $t("Remote.return") }}
            </router-link>
          </div>
        </form>
      </div>
    </div>
    <terms-modal />
  </div>
</template>

<script>
import { VueTelInput } from 'vue-tel-input'
import { login } from '@/api/user'
import { setErrorMessage } from '@/utils/tool'

export default {
  name: 'Login',
  components: {
    VueTelInput
  },
  data() {
    const postForm = {
      username: null,
      password: null
    }

    return {
      postForm
    }
  },
  created() {
    if (this.$store.getters.token) {
      this.$router.push({ path: '/index', replace: true }).catch(() => {
      })
    }
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    handleReset() {
      this.postForm = Object.assign({}, this.defaultForm)
    },
    handleUpdate() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          login(this.postForm).then(response => {
            alert('success')
          }).catch((error) => {
            setErrorMessage(error.response, this.errors)
          })
        }
      })
    }
  }
}
</script>
