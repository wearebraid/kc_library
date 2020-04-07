<template>
  <div class="kc-selection-container">
    <ul class="kc-selection-items">
      <li
        v-for="id in selected"
        :key="id"
        class="kc-selection-item"
      >
        <selection-preview :id="id"/>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      selected: 'system/selected'
    })
  }
}
</script>
