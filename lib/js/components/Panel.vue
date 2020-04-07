<template>
  <div class="kc-panel-container">
    <panel-header/>
    <div class="kc-panel-inner">
      <panel-main/>
      <panel-footer/>
      <panel-prompt
        v-if="promptIsActive"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      promptIsActive: 'system/promptIsActive'
    })
  }
}
</script>
