<template>
  <div class="kc-upload-panel-container">
    <form
      @submit.prevent="handleSubmit"
      class="kc-upload-panel-form"
    >
      <div class="kc-upload-panel-form-wrapper">
        <h4>Upload to Cloudinary</h4>
        <error-message
          v-if="errorMessage"
          :message="errorMessage"
        />
        <div class="kc-upload-panel-fields">
          <div class="kc-upload-panel-input-container kc-upload-panel-field">
            <label for="kc_library_upload_input">Add file</label>
            <input
              ref="upload_input"
              :disabled="isLoading"
              type="file"
              class="kc-library-upload-input form-file"
              size="22"
              id="kc_library_upload_input"
              name="upload_input"
              required
            >
            <div class="description">
              One file only.<br>
              20 MB limit.<br>
              Allowed types: png gif jpg 
            </div>
          </div>
          <div class="kc-upload-panel-title-container kc-upload-panel-field">
            <label for="">Add title</label>
            <input
              ref="title_input"
              :disabled="isLoading"
              class="kc-upload-panel-title"
              type="text"
              id="kc_library_title_input"
              name="title_input"
              required
            >
            <div class="description">
              Add a title for the image (caption).
            </div>
          </div>
          <div class="kc-upload-panel-description-container kc-upload-panel-field">
            <label for="">Add description</label>
            <input
              ref="description_input"
              :disabled="isLoading"
              class="kc-upload-panel-description"
              type="text"
              id="kc_library_description_input"
              name="description_input"
              required
            >
            <div class="description">
              Add a short description for the image (alt).
            </div>
          </div>
          <div class="kc-upload-panel-tags-container kc-upload-panel-field">
            <label for="">Add tags</label>
            <input
              ref="tags_input"
              :disabled="isLoading"
              class="kc-upload-panel-tags"
              type="text"
              id="kc_library_tags_input"
              name="tags_input"
            >
            <div class="description">
              (optional) Add tags as a comma seperated list (eg "nature, hiking, wildlife").
            </div>
          </div>
        </div>
        <button
          :disabled="isLoading"
          class="kc-upload-panel-submit-button button button--primary"
        >
          Upload
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { fileToBase64 } from '~/utils'
export default {
  data () {
    return {
      isLoading: false,
      errorMessage: ''
    }
  },
  methods: {
    ...mapActions({
      handleUpload: 'cloudinary/handleUpload',
      handleUpdate: 'system/handleUpdate',
    }),
    handleSubmit (e) {
      this.isLoading = true
      const file = e.target[0].files[0]
      const data = { file_name: file.name }
      data.title = e.target[1].value
      data.description = e.target[2].value
      data.tags = e.target[3].value
      fileToBase64(file)
        .then(base64 => {
          data.content = base64
          return this.handleUpload(data)
        })
        .then(res => {
          this.showError = false
          this.reset()
          // Need to give the DAM a little time to update before resyncing
          setTimeout(() => this.handleUpdate(), 1000)
        })
        .catch(error => {
          this.showError = 'That file could not be uploaded.'
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    reset() {
      this.$refs.upload_input.value = ''
      this.$refs.title_input.value = ''
      this.$refs.description_input.value = ''
      this.$refs.tags_input.value = ''
    }
  }
}
</script>
