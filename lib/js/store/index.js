import Vue from 'vue'
import Vuex from 'vuex'
import system from './system.js'
import kaltura from './kaltura.js'
import cloudinary from './cloudinary.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    system,
    cloudinary,
    kaltura
  }
})
