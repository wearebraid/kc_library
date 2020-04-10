<template>
  <div
    role="contentinfo"
    aria-label="Error message"
    class="messages messages--error"
  >
    <div role="alert">
      <h2 class="visually-hidden">Error message</h2>
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      required: true,
      type: String
    }
  }
}
</script>
