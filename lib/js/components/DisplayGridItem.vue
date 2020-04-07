<template>
  <article
    class="kc-display-grid-item-container"
    :class="[isSelected && 'selected', isDisabled && 'disabled']"
  >
    <div class="kc-display-grid-item-wrapper">
      <header class="kc-display-grid-item-header">
        <input
          v-model="isSelected"
          type="checkbox"
          class="kc-display-grid-item-checkbox"
          :disabled="isDisabled"
        >
        <img
          :src="item.thumbnailUrl"
          :alt="item.title"
          class="kc-display-grid-item-image"
        >
      </header>
      <footer class="kc-display-grid-item-title">
        {{ item.title }}
      </footer>
    </div>
  </article>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      selected: 'system/selected',
      limit: 'system/limit',
    }),
    isSelected: {
      get () {
        return this.selected.has(this.item.id)
      },
      set (val) {
        if (!val) {
          this.removeFromSelection(this.item.id)
        } else if (!this.isDisabled) {
          this.addToSelection(this.item.id)
        }
      }
    },
    isDisabled () {
      return !this.selected.has(this.item.id) && (this.selected.size >= this.limit)
    }
  },
  methods: {
    ...mapMutations({
      addToSelection: 'system/addToSelection',
      removeFromSelection: 'system/removeFromSelection',
    })
  }
}
</script>
