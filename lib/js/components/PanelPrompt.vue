<template>
  <div class="kc-panel-prompt-container">
    <div class="kc-panel-prompt-options">
      <div
        v-for="(option, key) in options"
        :key="key"
        :class="key"
        class="kc-panel-prompt-option"
      >
        <div class="kc-panel-prompt-icon-container">
          <i
            class="fas kc-panel-prompt-icon"
            :class="`fa-${option.icon}`"
          ></i>
        </div>
        <button
          @click="handleClick(key)"
          class="kc-panel-prompt-button button button--primary"
        >
          {{ option.button }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      options: {
        kaltura: {
          button: 'Select a Kultura Video',
          icon: 'video'
        },
        cloudinary: {
          button: 'Select a Cloudinary Image',
          icon: 'image'
        }
      }
    }
  },
  methods: {
    ...mapMutations({
      setMediaType: 'system/setMediaType',
      setPromptIsActive: 'system/setPromptIsActive'
    }),
    handleClick (mediaType) {
      this.setMediaType(mediaType)
      this.$store.dispatch('system/resetItems')
      this.$store.dispatch(`${mediaType}/handleSearch`)
      this.setPromptIsActive(false)
    }
  }
}
</script>
