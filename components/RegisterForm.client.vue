<template>
  <form id="lg_form" name="lg_form" method="post" @submit.prevent="onSubmit">
    <div class="txtBox">
      <!-- <Telcomponent
        v-model="phone"
        :input-options="phoneOptions"
        :dropdown-options="dropdownOptions"
        @keypress="isNumber($event)"
        @on-input="onInputPhone" 
        placeholder="Số điện thoại"
        title="Số điện thoại"
        autofocus 
      /> -->
      <span class="icon iconfont icon-font-username"></span>
      <input
        id="mobile"
        v-model="phone"
        type="text"
        :placeholder="$t('Tel')"
        :title="$t('Tel')"
      >
    </div>
    <div class="txtBox">
      <span class="icon iconfont icon-font-mail"></span>
      <input
        id="email"
        v-model="email"
        type="text"
        :placeholder="$t('Email')"
        :title="$t('Email')"
      >
    </div>
    <div class="txtBox">
      <span class="icon iconfont icon-font-username"></span>
      <input
        id="nickname"
        v-model="nickname"
        type="text"
        :placeholder="$t('Account')"
        :title="$t('Account')"
      >
      <!-- <span id="pwdEye" class="icon iconfont icon-font-hide invisible"></span> -->
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
      >
    </div>
    <div class="txtBox">
      <span class="icon iconfont icon-font-password"></span>
      <input
        id="repassword"
        v-model="repassword"
        type="password"
        :title="$t('Re-enter password')"
        :placeholder="$t('Re-enter password')"
      >
    </div>
    <div id="lg_msg"></div>
    <div class="row">
      <div class="col-12"><div class="button--max button--success col-12 inline" @click="onSubmit">{{ $t('Register') }} </div></div>
    </div>
    <!-- <div class="row">
      <div class="col-3 t_l"><a onclick="InfoUI.show(2);">Quên mật khẩu?</a></div>
    </div> -->
    <div class="row">
      <div class="col-12"><div class="button button--max col-12 inline" @click="openLoginForm">{{ $t('Login') }}</div></div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { actionsStore } from '@/stores/useActions'

const snackbar = useSnackbar();
const useAction = actionsStore()
const { useLocale, $t } = useShareCommon()
const emit = defineEmits<{
  (e: 'closeModalRegister', close: boolean): void
  (e: 'openModalLogin', close: boolean): void
}>()

const isOpen = ref(false)
const nickname = ref("");
const phone = ref("");
const email = ref("");
const password = ref("");
const repassword = ref("");
const phoneNumber = ref('')

const phoneOptions = {
  name: 'phone',
  placeholder: 'Nhập số điện thoại',
  title: 'Nhập số điện thoại',
  autocomplete: true
}

const dropdownOptions = {
  showDialCodeInSelection: true,
  showFlags: true,
  showDialCodeInList: true
}

const rememberMe = ref(false)
const errors = ref([])

const resgiter = async () => {
  try {
    const { data, pending, error, refresh } =  await useFetch(API_ROUTERS.AUTH.REGISTER, {
      method: 'POST',
      body: {
        user_name: nickname.value,
        nick_name: nickname.value,
        email: email.value ? email.value : null,
        phone: phoneNumber.value,
        password: password.value,
        passwordConfirm: repassword.value
      },
    })

    if (error.value) {
      if (typeof error.value?.data?.data?.detail === 'string') {
        errors.value = [{msg: $t(error.value?.data?.data?.detail)}]
      } else {
        errors.value = $t(error.value?.data?.data?.detail)
      }

      let errorsText = ''
      errors.value?.forEach(e => errorsText += e?.msg)
      if (errorsText) {
        snackbar.add({
          type: 'error',
          text: errorsText
        })
      }
    } else {
      snackbar.add({
        type: 'success',
        text: data?.value?.message ? $t(data?.value?.message) : $t('Registration successful')
      })

      nextTick(() => {
        resetForm()

        emit('closeModalRegister', true)
      })
    }
  }
  catch (e: any) {
    if (e?.response?._data?.detail)
      errors.value = [{msg: $t(e?.response?._data?.detail)}]
    else
      errors.value = [{msg: $t("An error occurred during registration")}]

    let errorsText = ''
    if (errors?.value) {
      errors.value?.forEach(e => errorsText += e?.msg)
      if (errorsText) {
        snackbar.add({
          type: 'error',
          text: errorsText
        })
      }
    }
    
  }
}

const validateForm = (e) => {
  errors.value = [];
  let messError = ''
  if (!String(nickname.value)?.trim()) {
    messError = $t("Nickname is required")
    errors.value.push({msg: messError});
    snackbar.add({
      type: 'error',
      text:messError
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
  if (!String(repassword.value)?.trim()) {
    messError = $t("Re-entering password is required")
    errors.value.push({msg: messError});
    snackbar.add({
      type: 'error',
      text: messError
    })
    return false
  }
  if (password.value && repassword.value & password.value !== repassword.value) {
    messError = $t("Re-enter password must match password")
    errors.value.push({msg: messError});
    snackbar.add({
      type: 'error',
      text: messError
    })
    return false
  }
  if (email.value && !validEmail(email.value)) {
    messError = $t("Email is not in correct format")
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
  
const validEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const isNumber = (evt) => {
  evt = (evt) ? evt : window.event;
  const charCode = (evt.which) ? evt.which : evt.keyCode;
  if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
    evt.preventDefault();
  } else {
    return true;
  }
}

const onInputPhone = (number, phoneObject) => {
  phoneNumber.value = phoneObject?.number
}

const onSubmit = (e) =>  {
  validateForm(e)
  if (!errors.value?.length) {
    resgiter()
  }
}

const resetForm = () => {
  nickname.value = ''
  phone.value = ''
  email.value = ''
  password.value = ''
  repassword.value = ''
  errors.value = []
  phoneNumber.value = ''
}

const closeRegisterForm = () => {
  useAction.isOpenLoginForm = false
  isOpen.value =  false
}

const openLoginForm = () => {
  emit('openModalLogin', true)
}

watch(useAction,
() => {
  if (useAction?.isOpenRegisterForm) 
    isOpen.value = useAction?.isOpenRegisterForm
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
<link rel="stylesheet" href="https://unpkg.com/vue-tel-input@9.1.4/dist/vue-tel-input.css" as="style" onload="this.onload=null;this.rel=stylesheet"/>
<style scoped>

.registerForm {
  position: fixed;
  top: 15%;
  left: 50%;
  background: #173252c9;
  transform: translateX(-50%);
  z-index: 9997;
  border-radius: 20px;
}
</style>