<template>
  <footer class="kc-panel-footer-container">
    <button
      @click="handleClose"
      class="kc-panel-footer-button button button--primary"
    >
      Insert Selected
    </button>
    <selection/>
    <span class="kc-panel-footer-selected-count">{{ selected.size }} of {{ limit }} selected</span>
  </footer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      selected: 'system/selected',
      limit: 'system/limit'
    })
  },
  methods: {
    ...mapActions({
      handleClose: 'system/handleClose'
    })
  }
}
</script>
