import axios from 'axios'
let initialQuery = {
  next_cursor: '',
  tag: '',
  name: '',
  sort_by: '',
  page_size: ITEMS_PER_PAGE
}
export default {
  namespaced: true,
  state: {
    query: Object.assign({}, initialQuery),
    nextCursor: '',
    items: {}
  },
  getters: {
    query (state) {
      return state.query
    },
    nextCursor (state) {
      return state.nextCursor
    },
    items (state) {
      return state.items
    }
  },
  mutations: {
    setQuery (state, query) {
      state.query = query
    },
    setNextCursor(state, nextCursor) {
      state.nextCursor = nextCursor
    },
    setItems (state, items) {
      state.items = items
    }
  },
  actions: {
    resetQuery ({ commit }) {
      commit('setQuery', Object.assign({}, initialQuery))
    },
    handleLoadMore ({ getters, commit, dispatch }) {
      commit('setQuery', Object.assign({}, getters.query, {
        next_cursor: getters.nextCursor
      }))
      dispatch('fetchItems', () => {
        commit('system/addItems', getters.items, { root: true })
      })
    },
    handleSearch ({ commit, getters, dispatch }, query) {
      commit('setQuery', Object.assign({}, initialQuery, query))
      dispatch('fetchItems', () => {
        commit('system/setItems', getters.items, { root: true })
      })
    },
    handleResults({ commit, getters, rootGetters }, results) {
      commit('system/setCanLoadMore', !!results.next_cursor, { root: true })
      commit('system/setNumResults', results.total_count, { root: true })
      commit('setNextCursor', results.next_cursor)
      let items = results.resources.reduce((items, result) => {
        let id = result.public_id
        let format = result.format
        let version = result.version
        let cloudName = result.secure_url
          .replace('https://', '')
          .split('/')[1]

        let thumbnailUrl = `https://res.cloudinary.com/${cloudName}/image/upload/c_scale,w_200/v${version}/${id}.${format}`
        items[id] = {
          id,
          title: result.filename,
          thumbnailUrl,
          format,
          version,
          cloudName,
          type: 'cloudinary',
          metadata: result.image_metadata
        }
        return items
      }, {})
      commit('setItems', items)
    },
    fetchItems ({ commit, dispatch, getters, rootGetters }, callback) {
      commit('system/setIsLoading', true, { root: true })
      return axios.get('/kc_library/cloudinary/search', {
        params: getters.query
      })
        .then(res => {
          dispatch('handleResults', res.data)
          if (callback) {
            callback()
          }
        })
        .catch(e => {
          console.error(e)
          commit('system/setItems', {}, { root: true })
        })
        .finally(() => {
          commit('system/setIsLoading', false, { root: true })
        })
    },
    handleUpload(context, data) {
      return axios.post('/kc_library/cloudinary/upload', data)
    }
  }
}
