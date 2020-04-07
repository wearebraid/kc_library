<template>
  <div
    v-if="active"
    class="kc-app-container"
  >
    <panel/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      active: 'system/active',
      selected: 'system/selected',
      $els: 'system/$els'
    })
  },
  watch: {
    selected (val) {
      if (this.$els.container) {
        this.sync()
      }
    }
  },
  methods: {
    ...mapActions({
      sync: 'system/sync'
    })
  }
}
</script>
