<template>
  <div class="kc-panel-main-container">
    <upload-panel
      v-if="uploadsAreSupported"
    />
    <controls/>
    <display-grid/>
    <load-more/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      mediaType: 'system/mediaType'
    }),
    uploadSupportedMediaTypes () {
      return [
        'cloudinary'
      ]
    },
    uploadsAreSupported () {
      return this.uploadSupportedMediaTypes.indexOf(this.mediaType) !== -1
    }
  }
}
</script>
