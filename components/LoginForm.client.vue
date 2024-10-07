<template>
  <form id="lg_form" name="lg_form" method="post" @submit.prevent="onSubmit">
    <div class="txtBox">
      <span class="icon iconfont icon-font-username"></span>
      <input
        id="nickname"
        v-model="nickname"
        type="text"
        :placeholder="$t('Account')"
        :title="$t('Account')"
        autocomplete="name"
        autofocus
      >
    </div>
    <div class="txtBox">
      <span class="icon iconfont icon-font-password"></span>
      <input
        id="password"
        v-model="password"
        autocomplete="on" 
        type="password"
        :placeholder="$t('Password')"
        :title="$t('Password')"
        @keyup.enter="onSubmit"
        @keydown.enter="onSubmit"
      >
      <span id="pwdEye" class="icon iconfont icon-font-hide invisible"></span>
    </div>
    <div id="lg_msg"></div>
    <div class="row">
      <div class="col-12"><div class="button--max button--success col-12 inline" @click="onSubmit">{{ $t('Login') }} </div></div>
    </div>
    <!-- <div class="row">
      <div class="col-3 t_l"><a onclick="InfoUI.show(2);">Quên mật khẩu?</a></div>
    </div> -->
    <div class="row">
      <div class="col-12"><div class="button button--max col-12 inline" @click="openRegisterForm">{{ $t('Register') }}</div></div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { systemsStore } from '~/stores/systems'
import { actionsStore } from '~/stores/useActions'
import { useAuthStore } from '~/stores/auth';
const { useLocale, $t } = useShareCommon()
const snackbar = useSnackbar();
const storeSystems = systemsStore()
const authStore = useAuthStore()
const useAction = actionsStore()

const isOpen = ref(false)

const nickname = ref("");
const password = ref("");
const rememberMe = ref(false)
const errors = ref([])
const emit = defineEmits<{
  (e: 'closeModalLogin', close: boolean): void
  (e: 'openModalRegister', close: boolean): void
}>()

const login = async () => {
  try {
    const { data, pending, error, refresh } =  await useFetch(API_ROUTERS.AUTH.LOGIN, {
      method: 'POST',
      body: {
        nick_name: nickname.value,
        password: password.value,
      },
    })

    let errorsText = ''
    if (error?.value) {
      if (typeof error.value?.data?.data?.detail === 'string') {
        errors.value = [{msg: error.value?.data?.data?.detail}]
        errors.value?.forEach(e => errorsText += e?.msg)
      } else {
        errors.value = error.value?.data?.data?.detail
        errors.value?.forEach(e => errorsText += e?.msg)
      }
    }
    
    if (errorsText) {
      snackbar.add({
        type: 'error',
        text: errorsText
      })
    }

    if (data?.value?.status === "success") {
      useCookie('accessToken').value = data?.value?.access_token
      useCookie('refreshToken').value = data?.value?.refresh_token

      storeSystems.accessToken = data?.value?.access_token
      
      if (rememberMe.value) {
        useCookie('userNickname').value = nickname.value
        useCookie('userPassword').value = password.value
      }
      else {
        useCookie('userNickname').value = null
        useCookie('userPassword').value = null
      }

      authStore.authenticateUser()

      usersMe(data?.value?.access_token)

      snackbar.add({
        type: 'success',
        text: $t('Login successful')
      })

      // Call api client info
      nextTick(() => {
        if (!rememberMe.value) {
          resetForm()
        }

        emit('closeModalLogin', true)
      })
    }
  }
  catch (e: any) {
    if (e?.response?._data?.detail)
      errors.value = [{msg: $t(e?.response?._data?.detail)}]
    else
      errors.value = [{msg:  $t("An error occurred during login")}]

    let errorsText = ''
    if (errors?.value) {
      errors.value?.forEach(e => errorsText += e?.msg)
      snackbar.add({
        type: 'error',
        text: $t(errorsText)
      })
    }
  }
}

const usersMe = async (access_token: string) => {
  try {
    const { data, pending, error, refresh } =  await useFetch(API_ROUTERS.USER.ME, {
      headers: {
        Authorization: `${access_token}`,
      },
    })

    if (data?.value) {
      // Update store
      storeSystems.userData = data?.value

      // Update user info
      useCookie('userData').value = JSON.stringify(data?.value)
      //router.replace(route.query.to ? String(route.query.to) : '/welcome')
    }
  }
  catch (e: any) {
    if (e?.response?._data?.detail)
      errors.value = [{msg: e?.response?._data?.detail}]
    else
      errors.value = [{msg: "error."}]

    let errorsText = ''
    if (errors?.value) {
      errors.value?.forEach(e => errorsText += e?.msg)
      snackbar.add({
        type: 'error',
        text: errorsText
      })
    }
  }

  return;
}

const validateForm = (e) => {
  errors.value = [];
  let messError = ''

  if (!String(nickname.value)?.trim()) {
    messError =  $t("Account is required")
    errors.value.push({msg: messError});
    snackbar.add({
      type: 'error',
      text: messError
    })
    return false
  }
  if (!String(password.value)?.trim()) {
    messError = $t("Password is required")
    errors.value.push({msg: messError});
    snackbar.add({
      type: 'error',
      text: messError
    })
    return false
  }
  if (String(password.value)?.trim()?.length < 8) {
    messError = $t("Password at least 8 characters")
    errors.value.push({msg: messError});
    snackbar.add({
      type: 'error',
      text: messError
    })
    return false
  }

  if (!errors.value?.length) {
    return true;
  }
}

const onSubmit = (e) =>  {
  validateForm(e)
  if (!errors.value?.length) {
    login()
  }
}

const closeLoginForm = () => {
  useAction.isOpenLoginForm = false
  isOpen.value =  false

  statePopup.modal_search.hide();
  useAction.isOpenSearchForm = false
}

const openRegisterForm = () => {
  emit('openModalRegister', true)
}

const resetForm = () => {
  nickname.value = ''
  password.value = ''
}

watch(useAction,
() => {
  if (useAction?.isOpenLoginForm) 
    isOpen.value = useAction?.isOpenLoginForm
})

onMounted(() => {
  const savedNickname = useCookie('userNickname').value
  const savedPassword = useCookie('userPassword').value
  
  if (savedNickname && savedPassword) {
    nickname.value = savedNickname
    password.value = savedPassword
    rememberMe.value = true
  }
})
</script>
<style>
.loginForm {
  position: fixed;
  top: 18%;
  left: 50%;
  background: #173252c9;
  transform: translateX(-50%);
  z-index: 9997;
}

.btn-close {
  position: absolute;
  top: -10px;
  right: -10px;
  border-radius: 50%;
  padding: 5px;
  z-index: 1;
}
</style>