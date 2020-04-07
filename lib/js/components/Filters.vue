<template>
  <div class="kc-filters-container">
    <form
      @submit.prevent="handleSubmit"
      class="kc-filters-form"
    >
      <div class="kc-filters-search kc-filters-field form-item">
        <label for="name">Search</label>
        <input
          type="text"
          name="name"
          id="name"
        >
      </div>
      <div class="kc-filters-tag kc-filters-field form-item">
        <label for="tag">Tags</label>
        <input
          type="text"
          name="tag"
          id="tag"
        >
      </div>
      <div
        v-show="settings.media_type === 'all'"
        class="kc-filters-media-type kc-filters-field form-item"
      >
        <label for="media-type">Media type</label>
        <select
          name="media_type"
          v-model="mediaType"
          id="media-type"
        >
          <option value="kaltura">Kaltura Videos</option>
          <option value="cloudinary">Cloudinary Images</option>
        </select>
      </div>
      <div class="kc-filters-sort-by kc-filters-field form-item">
        <label for="sort-by">Sort by</label>
        <select
          name="sort_by"
          id="sort-by"
        >
          <option value="newest">Newest first</option>
          <option value="alphabet_up">Name (A-Z)</option>
          <option value="alphabet_down">Name (Z-A)</option>
        </select>
      </div>
      <div class="kc-filters-submit-button-container kc-filters-field form-item">
        <input
          class="button kc-filters-submit-button"
          name="submit"
          type="submit"
          value="Apply Filters"
        >
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      settings: 'system/settings'
    }),
    mediaType: {
      get () {
        return this.$store.getters['system/mediaType']
      },
      set (val) {
        this.setMediaType(val)
      }
    }
  },
  methods: {
    ...mapMutations({
      setMediaType: 'system/setMediaType',
    }),
    ...mapActions({
      handleSearch: 'system/handleSearch'
    }),
    handleSubmit (event) {
      let query = {}
      for (let item of event.target) {
        if (item.type !== 'select-multiple') {
          query[item.name] = item.value
          continue
        }
        let values = []
        for (let option of item.options) {
          if (!option.selected) {
            continue
          }
          values.push(option.value)
        }
        query[item.name] = values
      }
      this.handleSearch(query)
    }
  }
}
</script>

<style>

</style>
