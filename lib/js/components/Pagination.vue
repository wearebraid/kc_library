<template>
  <div
    v-if="showPagination"
    class="kc-pagination-container"
  >
    <button
      @click="handlePageChange(currentPage - 1)"
      :class="backIsActive && 'active'"
      :disabled="!backIsActive"
      class="kc-pagination-button kc-pagination-back"
    >
      <i class="fas fa-angle-double-left"></i>
    </button>
    <button
      @click="handlePageChange(i)"
      v-for="i in pageNumbers"
      :key="i"
      :class="i === currentPage && 'active'"
      :disabled="i === currentPage"
      class="kc-pagination-button kc-pagination-number"
    >
      {{ i }}
    </button>
    <button
      @click="handlePageChange(currentPage + 1)"
      :class="nextIsActive && 'active'"
      :disabled="!nextIsActive"
      class="kc-pagination-button kc-pagination-next"
    >
      <i class="fas fa-angle-double-right"></i>
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      currentPage: 'system/currentPage',
      numPages: 'system/numPages',
      mediaType: 'system/mediaType',
    }),
    pageNumbers () {
      let range = [...Array(this.numPages).keys()].map(i => i + 1)
      let offset = this.currentPage - 3
      let diff = this.numPages - offset
      if (diff < 5) {
        offset -= (5 - diff)
      }
      if (offset < 0) {
        offset = 0
      }
      let numbers = range.slice(offset, offset + 5)
      if (numbers.indexOf(1) === -1) {
        numbers = [1].concat(numbers)
      }
      if (numbers.indexOf(this.numPages) === -1) {
        numbers = numbers.concat(this.numPages)
      }
      return numbers
    },
    backIsActive () {
      return this.currentPage - 1 > 0
    },
    nextIsActive () {
      return this.currentPage + 1 <= this.numPages
    },
    showPagination () {
      let numbers = this.pageNumbers
      return numbers.length > 1 && numbers[numbers.length - 1] > 1
    }
  },
  methods: {
    handlePageChange (i) {
      this.$store.dispatch(`${this.mediaType}/handlePageChange`, i)
    }
  }
}
</script>

<style>

</style>
