import Vue from 'vue'
import Vuex from 'vuex'
import '~/components'
import store from '~/store'
import '~/preview'

let mountPoint = document.createElement('div')
mountPoint.setAttribute('id', 'kc_app')
document.body.appendChild(mountPoint)

new Vue({
  el: '#kc_app',
  template: '<app></app>',
  store,
  mounted () {
    store.dispatch('system/init')
  }
})

