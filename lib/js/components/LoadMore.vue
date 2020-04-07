<template>
  <div
    class="kc-load-more-container"
  >
    <button
      v-if="canLoadMore"
      @click="handleLoadMore"
      class="kc-load-more-button button button--primary"
    >
      Load More
    </button>
    <span
      v-if="results"
      class="kc-load-more-results"
    >
      {{ results }}
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      canLoadMore: 'system/canLoadMore',
      mediaType: 'system/mediaType',
      numResults: 'system/numResults',
      items: 'system/items'
    }),
    results () {
      let numItems = Object.keys(this.items).length
      return numItems && this.numResults && `${numItems}/${this.numResults} Results`
    }
  },
  methods: {
    handleLoadMore () {
      this.$store.dispatch(`${this.mediaType}/handleLoadMore`)
    }
  }
}
</script>

<style>

</style>
