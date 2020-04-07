<template>
  <div class="kc-display-grid-container">
    <ul
      v-if="hasItems"
      class="kc-display-grid-list"
    >
      <li
        v-for="(item, id) in items"
        :key="id"
        class="kc-display-grid-list-item"
      >
        <display-grid-item
          :item="item"
        />
      </li>
    </ul>
    <div
      v-else-if="isLoading"
      class="kc-display-grid-loading"
    >
      Loading...
    </div>
    <div
      v-else
      class="kc-display-grid-no-results"
    >
      No Results were found for that query.
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      items: 'system/items',
      isLoading: 'system/isLoading'
    }),
    hasItems () {
      return this.items && Object.keys(this.items).length
    }
  }
}
</script>
