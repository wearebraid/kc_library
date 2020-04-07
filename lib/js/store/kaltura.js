import axios from 'axios'
let initialQuery = {
  page: 1,
  tag: '',
  name: '',
  sort_by: '',
  page_size: ITEMS_PER_PAGE
}
export default {
  namespaced: true,
  state: {
    query: Object.assign({}, initialQuery),
    items: {}
  },
  getters: {
    query (state) {
      return state.query
    },
    items (state) {
      return state.items
    }
  },
  mutations: {
    setQuery (state, query) {
      state.query = query
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
        page: getters.query.page + 1
      }))
      dispatch('fetchItems', () => {
        commit('system/addItems', getters.items, { root: true })
      })
    },
    handleSearch ({ getters, commit, dispatch }, query) {
      commit('setQuery', Object.assign({}, initialQuery, query))
      dispatch('fetchItems', () => {
        commit('system/setItems', getters.items, { root: true })
      })
    },
    handleResults({ commit, getters, rootGetters }, results) {
      let maxPage = Math.ceil(results.totalCount / ITEMS_PER_PAGE)
      commit('system/setCanLoadMore', getters.query.page < maxPage, { root: true })
      commit('system/setNumResults', results.totalCount, { root: true })
      let items = results.objects.reduce((items, result) => {
        let id = result.id
        items[id] = {
          id,
          title: result.name,
          thumbnailUrl: result.thumbnailUrl,
          type: 'kaltura'
        }
        return items
      }, {})
      commit('setItems', items)
    },
    fetchItems ({ commit, dispatch, getters, rootGetters }, callback) {
      commit('system/setIsLoading', true, { root: true })
      axios.get('/kc_library/kaltura/search', {
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
    }
  }
}
