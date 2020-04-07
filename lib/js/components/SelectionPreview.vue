<template>
  <div
    v-if="item"
    class="kc-selection-preview-container"
    :title="item.title"
  >
    <a
      @click="removeFromSelection(id)"
      role="button"
      :title="`Remove ${item.title} from selection`"
      class="kc-selection-preview-remove-button"
    >
      <i class="fas fa-times-circle"></i>
    </a>
    <div class="kc-selection-preview-image"
      :style="`backgroundImage: url(${item.thumbnailUrl})`"
    />
    <h5
      class="kc-selection-preview-title"
    >
      {{ title }}
    </h5>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    ...mapGetters({
      selectedItems: 'system/selectedItems'
    }),
    item () {
      return this.selectedItems[this.id]
    },
    title () {
      let max = 12
      if (this.item.title.length <= max) {
        return this.item.title
      }

      return this.item.title.slice(0, max) + '...'
    }
  },
  methods: {
    ...mapMutations({
      removeFromSelection: 'system/removeFromSelection'
    })
  }
}
</script>
