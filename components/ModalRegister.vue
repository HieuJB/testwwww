<template>
  <div ref="modalRegister" class="modal fade" id="modal_register" tabindex="-1" aria-labelledby="modal_register_label" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header d-none">
          <div class="modal-title" id="modal_register_label">{{ $t('Register') }}</div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div id="login_body" class="regBox">
          <div class="title">
            <span @click="openModalLogin" class="peer icon iconfont icon-font-return back"></span>
            <div class="mh2">
              {{ $t('Register') }}
            </div>
            <span class="iconfont icon-close" @click="closeModalRegister"></span>
          </div>
          <RegisterForm v-if="isRender" @close-modal-register="closeModalRegister" @open-modal-login="openModalLogin"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['openModalLogin'])
const modalRegisterInstance = ref(null);
const isRender = ref(true)
const { useLocale, $t } = useShareCommon()
onMounted(() => {
  modalRegisterInstance.value = new bootstrap.Modal(document.getElementById('modal_register'), {});
  modalRegisterInstance.value.show(); 
});

const closeModalRegister = async() => {
  if (modalRegisterInstance.value) {
    modalRegisterInstance.value.hide(); 
  }
};

const openModalLogin = () => {
  closeModalRegister()
  setTimeout(()=> {
  emit('openModalLogin')
  },200)
}
</script>

<style lang="scss" scoped>

</style>