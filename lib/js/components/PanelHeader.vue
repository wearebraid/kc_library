<template>
  <header class="kc-panel-header-container">
    <span class="kc-panel-header-dialog-title ">
      Select media
    </span>
    <a
      @click="handleClose"
      role="button"
      class="kc-panel-header-close-button"
    >
      <img src="/modules/custom/kc_library/lib/icons/ex.svg" alt="Close Panel">
    </a>
  </header>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions({
      handleClose: 'system/handleClose'
    })
  }
}
</script>
