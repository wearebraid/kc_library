import cloneDeep from 'clone-deep'
import axios from 'axios'
let $ = window.jQuery

let initialState = {
  isLoading: false,
  active: false,
  $els: {},
  selected: new Set([]),
  settings: {},
  promptIsActive: false,
  mediaType: 'cloudinary',
  items: {},
  cachedItems: {},
  canLoadMore: false,
  numResults: 0
}

export default {
  namespaced: true,
  state: cloneDeep(initialState),
  getters: {
    active (state) {
      return state.active
    },
    $els (state) {
      return state.$els
    },
    selected (state) {
      return state.selected
    },
    selectedItems (state, getters) {
      return [...getters.selected].reduce((map, id) => {
        let source = getters.cachedItems[id] ? getters.cachedItems : getters.items
        map[id] = cloneDeep(source[id])
        return map
      }, {})
    },
    limit (state) {
      return state.settings.selection_limit || 1
    },
    settings (state) {
      return state.settings
    },
    promptIsActive (state) {
      return state.promptIsActive
    },
    mediaType (state) {
      return state.mediaType
    },
    items (state) {
      return state.items
    },
    itemsPerPage (state) {
      return state.itemsPerPage
    },
    cachedItems (state) {
      return state.cachedItems
    },
    isLoading (state) {
      return state.isLoading
    },
    canLoadMore (state) {
      return state.canLoadMore
    },
    numResults (state) {
      return state.numResults
    }
  },
  mutations: {
    setActive (state, isActive) {
      state.active = isActive
    },
    setEl (state, { key, $el }) {
      state.$els = Object.assign({}, state.$els, {
        [key]: $el
      })
    },
    setSelection (state, selected) {
      state.selected = selected
    },
    addToSelection (state, id) {
      state.selected.add(id)
      state.selected = new Set(state.selected)
    },
    removeFromSelection (state, id) {
      state.selected.delete(id)
      state.selected = new Set(state.selected)
    },
    setSettings (state, settings) {
      state.settings = settings
    },
    setPromptIsActive (state, promptIsActive) {
      state.promptIsActive = promptIsActive
    },
    setMediaType (state, mediaType) {
      state.mediaType = mediaType
    },
    setItems (state, items) {
      state.items = items
    },
    addItems (state, items) {
      state.items = Object.assign({}, state.items, items)
    },
    setCanLoadMore (state, canLoadMore) {
      state.canLoadMore = canLoadMore
    },
    setCachedItems (state, items) {
      state.cachedItems = items
    },
    setIsLoading (state, isLoading) {
      state.isLoading = isLoading
    },
    setNumResults (state, numResults) {
      state.numResults = numResults
    },
    resetState (state) {
      for (let key in initialState) {
        state[key] = cloneDeep(initialState[key])
      }
    }
  },
  actions: {
    init ({ dispatch }) {
      dispatch('handleButtonClick')
    },
    sync ({ commit, getters }) {
      commit('setCachedItems', getters.selectedItems)
      let data = JSON.stringify(getters.selectedItems)
      getters.$els.container.find('.js-kc-lib-data').val(data)
      window.initKcLibPreview(getters.$els.container)
    },
    handleButtonClick ({ getters, commit, dispatch }) {
      $(document).on('click', '.js-kc-lib-container', function (e) {
        if (!$(e.target).hasClass('js-kc-lib-button')) {
          return
        }
        e.preventDefault()
        commit('setEl', { key: 'container', $el: $(this) })
        dispatch('handleInitialSelection')
        dispatch('handleSettings')
        if (getters.settings.media_type === 'all') {
          commit('setPromptIsActive', true)
        } else {
          dispatch(`${getters.mediaType}/handleSearch`, null, { root: true })
        }
        commit('setActive', true)
      })
    },
    handleSettings ({ getters, commit }) {
      let settings = getters.$els.container.find('.js-kc-lib-data').data('settings')
      if (['kaltura', 'cloudinary'].indexOf(settings.media_type) !== -1) {
        commit('setMediaType', settings.media_type)
      }
      commit('setSettings', settings)
    },
    handleInitialSelection ({ getters, commit }) {
      let data = getters.$els.container.find('.js-kc-lib-data').val()
      if (!data) {
        return
      }
      data = JSON.parse(data)
      let selected = Object.keys(data)
      commit('setCachedItems', data)
      commit('setSelection', new Set(selected))
    },
    handleClose ({ commit, dispatch }) {
      commit('resetState')
    },
    handleSearch ({ commit, dispatch, getters }, query) {
      for (let platform of ['kaltura', 'cloudinary']) {
        dispatch(`${platform}/resetQuery`, null, { root: true })
      }
      dispatch('resetItems')
      commit('setMediaType', query.media_type)
      dispatch(`${getters.mediaType}/handleSearch`, query, { root: true })
    },
    handleUpdate ({ dispatch, getters }) {
      dispatch('resetItems')
      dispatch(`${getters.mediaType}/handleSearch`, {}, { root: true })
    },
    resetItems ({ commit }) {
      commit('setItems', new Set([]))
      commit('setCanLoadMore', false)
    }
  }
}
