<template>
  <div ref="modalLogin" class="modal fade" id="modal_login" tabindex="-1" aria-labelledby="modal_login_label" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header d-none">
          <div class="modal-title" id="modal_login_label">{{ $t('Login') }}</div>
          <button type="button" class="btn-close" @click="closeLoginForm" aria-label="Close"></button>
        </div>
        <div id="login_body" class="regBox">
          <div class="title">
            <span class=""></span>
            <div class="mh2">
              {{ $t('Login') }}
            </div>
            <span class="iconfont icon-close" @click="closeLoginForm"></span>
          </div>
          <LoginForm v-if="isRender" @close-modal-login="closeLoginForm" @open-modal-register="closeModal"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['openModalRegister'])
const modalLoginInstance = ref(null);
const isRender = ref(true)
const { useLocale, $t } = useShareCommon()

onMounted(() => {
  modalLoginInstance.value = new bootstrap.Modal(document.getElementById('modal_login'), {});
  modalLoginInstance.value.show(); 
});

const closeLoginForm = async() => {
  if (modalLoginInstance.value) {
    modalLoginInstance.value.hide(); 
  }
};

const closeModal = () => {
  closeLoginForm()
  setTimeout(()=> {
    emit('openModalRegister')
  },200)
}
</script>

<style lang="scss" scoped>

</style>
